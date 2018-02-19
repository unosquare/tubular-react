import Axios from 'axios';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as Rx from 'rx';
import { ColumnModel } from '.';
import {
  AggregateFunctions,
  ColumnDataType,
  ColumnSortDirection,
  CompareOperators,
} from './Column';
import GridRequest from './GridRequest';
import GridResponse from './GridResponse';
import GridDataResponse from './utils/GridDataResponse';
import Utils from './utils/Utils';

export default class LocalDataSource implements IDataSource {

  public static defaultColumnValues = {
    Aggregate: AggregateFunctions.NONE,
    DataType: ColumnDataType.STRING,
    IsKey: false,
    Searchable: false,
    Sortable: false,
    Visible: true
  };

  public columns: ColumnModel[];
  public dataStream: any;
  public localData: any[];
  public counter: number;
  public utilsObj: Utils = new Utils();

  constructor(localData: any[], columns: ColumnModel[]) {
    this.localData = localData;
    this.dataStream = new Rx.BehaviorSubject({ Payload: [] });
    this.columns = this.utilsObj.normalizeColumns(columns);
    this.counter = 0;
  }

  public connect(rowsPerPage: number, page: number, searchText: string) {
    this._updateDataStream(rowsPerPage, page, searchText);
    return this.dataStream;
  }

  public refresh(rowsPerPage: number, page: number, searchText: string) {
    this._updateDataStream(rowsPerPage, page, searchText);
  }

  public getAllRecords = (rowsPerPage: number, page: number, searchText: string): Promise<object> =>
    new Promise((resolve, reject) => {
      let data = this.localData;

      const request = new GridRequest({
        Columns: this.columns,
        Count: this.counter++,
        Search: {
          Operator: 'Auto',
          Text: searchText ? searchText : ''
        },
        Skip: page * rowsPerPage,
        Take: rowsPerPage,
        TimezoneOffset: 360
      });

      const response = new GridDataResponse({
        Counter: request.Count,
        CurrentPage: 1,
        TotalRecordCount: data.length
      });

      data = this.applyFreeTextSearch(request, data);
      data = this.applyFiltering(request, data);
      data = this.applySorting(request, data);

      response.FilteredRecordCount = data.length;

      const offset = request.Skip;
      const limit = request.Take;

      if (request.Take > -1) {
        response.TotalPages = Math.ceil(response.FilteredRecordCount / request.Take);

        if (response.TotalPages > 0) {
          response.CurrentPage = request.Skip / request.Take + 1;
        }
      }

      response.AggregationPayload = this.getAggregatePayload(request, data);

      data = _.slice(data, offset, offset + limit);

      const rows = data.map((row: any) => {
        const obj: any = {};

        this.columns.forEach((column: any, key: any) => {
          obj[column.Name] = row[key] || row[column.Name];
        });

        return obj;
      });

      response.Payload = rows;

      try {
        resolve(new GridResponse({
          Aggregate: response.AggregationPayload,
          FilteredRecordCount: response.FilteredRecordCount,
          Payload: response.Payload,
          RowsPerPage: rowsPerPage,
          SearchText: searchText,
          TotalRecordCount: response.TotalRecordCount
        }));
      } catch (error) {
        reject(error);
      }
    })

  public handleError(error: any) {
    throw new Error(`Something wrong happened: ${error}`);
  }

  public _updateDataStream(rowsPerPage: number, page: number, searchText: string) {
    this.getAllRecords(rowsPerPage, page, searchText)
      .then((data) => {
        this.dataStream.onNext(data);
      }).catch((error) => {
        this.handleError(error);
      });
  }

  public applyFreeTextSearch(request: any, subset: any[]) {
    if (request.Search && request.Search.Operator.toLowerCase() === CompareOperators.AUTO.toLowerCase()) {
      const searchableColumns = _.filter(request.Columns, 'Searchable');

      if (searchableColumns.length > 0) {
        const filter = request.Search.Text.toLowerCase();

        return _.filter(subset, (item) =>
          _.some(searchableColumns, (x) =>
            item[x.Name].toLowerCase().indexOf(filter) > -1));
      }
    }

    return subset;
  }

  public applyFiltering(request: any, subset: any[]) {
    const filteredColumns  = request.Columns.filter((column: any) =>
      column.Filter && (column.Filter.Text || column.Filter.Argument) &&
      column.Filter && column.Filter.Operator.toLowerCase() !== CompareOperators.NONE.toLowerCase());

    filteredColumns.forEach((filterableColumn: any) => {
      request.Columns.find((column: any) => column.Name === filterableColumn.Name).HasFilter = true;

      switch (filterableColumn.Filter.Operator.toLowerCase()) {
        case CompareOperators.EQUALS.toLowerCase():
          if (filterableColumn.DataType === 'datetime' ||
            filterableColumn.DataType === 'date' ||
            filterableColumn.DataType === 'datetimeutc') {
              subset = subset.filter((row) =>
                moment(row[filterableColumn.Name]).isSame(moment(filterableColumn.Filter.Text)));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] === filterableColumn.Filter.Text);
            }
          break;
        case CompareOperators.NOT_EQUALS.toLowerCase():
          subset = subset.filter((row) => row[filterableColumn.Name] !== filterableColumn.Filter.Text);
          break;
        case CompareOperators.CONTAINS.toLowerCase():
          subset = subset.filter((row) => row[filterableColumn.Name].indexOf(filterableColumn.Filter.Text) >= 0);
          break;
        case CompareOperators.NOT_CONTAINS.toLowerCase():
          subset = subset.filter((row) => row[filterableColumn.Name].indexOf(filterableColumn.Filter.Text) < 0);
          break;
        case CompareOperators.STARTS_WITH.toLowerCase():
          subset = subset.filter((row) =>
            row[filterableColumn.Name].toLowerCase().startsWith(filterableColumn.Filter.Text.toLowerCase()));
          break;
        case CompareOperators.NOT_STARTS_WITH.toLowerCase():
          subset = subset.filter((row) =>
            !row[filterableColumn.Name].toLowerCase().startsWith(filterableColumn.Filter.Text.toLowerCase()));
          break;
        case CompareOperators.ENDS_WITH.toLowerCase():
          subset = subset.filter((row) =>
            row[filterableColumn.Name].toLowerCase().endsWith(filterableColumn.Filter.Text.toLowerCase()));
          break;
        case CompareOperators.NOT_ENDS_WITH.toLowerCase():
          subset = subset.filter((row) =>
            !row[filterableColumn.Name].toLowerCase().endsWith(filterableColumn.Filter.Text.toLowerCase()));
          break;
        case CompareOperators.GT.toLowerCase():
          if (filterableColumn.DataType === 'datetime' ||
              filterableColumn.DataType === 'date' ||
              filterableColumn.DataType === 'datetimeutc') {
                subset = subset.filter((row) =>
                  moment(row[filterableColumn.Name]).isAfter(moment(filterableColumn.Filter.Text)));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] > filterableColumn.Filter.Text);
            }
          break;
        case CompareOperators.GTE.toLowerCase():
          if (filterableColumn.DataType === 'datetime' ||
              filterableColumn.DataType === 'date' ||
              filterableColumn.DataType === 'datetimeutc') {
                subset = subset.filter((row) =>
                  moment(row[filterableColumn.Name]).isSameOrAfter(moment(filterableColumn.Filter.Text)));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] >= filterableColumn.Filter.Text);
            }
          break;
        case CompareOperators.LT.toLowerCase():
          if (filterableColumn.DataType === 'datetime' ||
              filterableColumn.DataType === 'date' ||
              filterableColumn.DataType === 'datetimeutc') {
                subset = subset.filter((row) =>
                  moment(row[filterableColumn.Name]).isBefore(moment(filterableColumn.Filter.Text)));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] < filterableColumn.Filter.Text);
            }
          break;
        case CompareOperators.LTE.toLowerCase():
          if (filterableColumn.DataType === 'datetime' ||
              filterableColumn.DataType === 'date' ||
              filterableColumn.DataType === 'datetimeutc') {
                subset = subset.filter((row) =>
                  moment(row[filterableColumn.Name]).isSameOrBefore(moment(filterableColumn.Filter.Text)));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] <= filterableColumn.Filter.Text);
            }
          break;
        case CompareOperators.BETWEEN.toLowerCase():
          if (filterableColumn.DataType === 'datetime' ||
              filterableColumn.DataType === 'date' ||
              filterableColumn.DataType === 'datetimeutc') {
                subset = subset.filter((row) =>
                  moment(row[filterableColumn.Name]).isSameOrAfter(moment(filterableColumn.Filter.Text)) &&
                  moment(row[filterableColumn.Name]).isSameOrBefore(moment(filterableColumn.Filter.Argument[0])));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] >= filterableColumn.Filter.Text &&
                  row[filterableColumn.Name] <= filterableColumn.Filter.Argument[0]);
            }
          break;
        default:
          throw new Error('Unsupported Compare Operator');
      }
    });

    return subset;
  }

  public applySorting(request: any, subset: any[]) {
    let sortedColumns = _.filter(request.Columns, (column) =>
      column.SortOrder > 0);

    if (sortedColumns.length > 0) {
      sortedColumns = _.sortBy(sortedColumns, ['SortOrder']);

      const columns: any[] = [];
      const orders: any[] = [];

      _.forEachRight(sortedColumns, (column) => {
        columns.push(column.Name);

        orders.push((column.SortDirection === ColumnSortDirection.ASCENDING ? 'asc' : 'desc'));
      });

      subset = _.orderBy(subset, columns, orders);
    } else {
      subset = _.orderBy(subset, request.Columns[0].Name, 'asc');
    }

    return subset;
  }

  public getAggregatePayload(request: any, subset: any[]) {
    const aggregateColumns = _.filter(request.Columns, (column) =>
      column.Aggregate && column.Aggregate.toLowerCase() !== AggregateFunctions.NONE.toLowerCase());

    const results = _.map(aggregateColumns, (column) => {
      let value;

      switch (column.Aggregate.toLowerCase()) {
        case AggregateFunctions.SUM.toLowerCase():
          value = _.sumBy(subset, column.Name);
          break;
        case AggregateFunctions.AVERAGE.toLowerCase():
          value = _.meanBy(subset, column.Name);
          break;
        case AggregateFunctions.MAX.toLowerCase():
          value = _.maxBy(subset, column.Name)[column.Name];
          break;
        case AggregateFunctions.MIN.toLowerCase():
          value = _.minBy(subset, column.Name)[column.Name];
          break;
        case AggregateFunctions.COUNT.toLowerCase():
          value = subset.length;
          break;
        case AggregateFunctions.DISTINCT_COUNT.toLowerCase():
          value = _.uniqWith(subset, (a, b) => {
            return a[column.Name] === b[column.Name];
          }).length;
          break;
        default:
          throw new Error('Unsupported aggregate function');
      }

      return { [column.Name]: value };
    });

    return _.reduce(results, _.merge, {});
  }
}
