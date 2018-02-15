import Axios from 'axios';
import * as _ from 'lodash';
import * as Rx from 'rx';
import AggregateFunctions from './utils/AggregateFunctions';
import CompareOperators from './utils/CompareOperators';
import GridDataResponse from './utils/GridDataResponse';
import SortDirection from './utils/SortDirection';

export default class LocalDataSource implements IDataSource {

  public static defaultColumnValues = {
    Aggregate: 'None',
    DataType: 'string',
    IsKey: false,
    Searchable: false,
    Sortable: false,
    Visible: true
  };

  public columns: any[];
  public dataStream: any;
  public localData: any[];
  public counter: number;

  constructor(localData: any[], columns: any[]) {
    this.localData = localData;
    this.dataStream = new Rx.BehaviorSubject({ payload: [] });
    this.columns = this.normalizeColumns(columns);
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
      const request = {
        Columns: this.columns,
        Count: this.counter ++,
        Search: {
          Operator: 'Auto',
          Text: searchText ? searchText : ''
        },
        Skip: page * rowsPerPage,
        Take: rowsPerPage,
        TimezoneOffset: 360
      };

      const response = new GridDataResponse({
        Counter: request.Count,   // Counter or Count?
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

      resolve({
        aggregate: response.AggregationPayload,
        filteredRecordCount: response.FilteredRecordCount,
        payload: response.Payload,
        rowsPerPage,
        searchText,
        totalRecordCount: response.TotalRecordCount
      });
    })

  public handleError(error: any) {
    throw new Error(`Something wrong happened: ${error}`);
  }

  public _updateDataStream(rowsPerPage: number, page: number, searchText: string) {
    this.getAllRecords(rowsPerPage, page, searchText)
      .then((data) => {
        this.dataStream.onNext(data);
      });
  }

  public applyFreeTextSearch(request: any, subset: any[]) {
    if (request.Search && request.Search.Operator === CompareOperators.auto) {
      const searchableColumns = _.filter(request.Columns, 'Searchable');

      if (searchableColumns.length > 0) {
        const filter = request.Search.Text.toLowerCase();

        return _.filter(subset, item => _.some(searchableColumns, x => item[x.Name].toLowerCase().indexOf(filter) > -1));
      }
    }

    return subset;
  }

  public applyFiltering(request: any, subset: any[]) {
    const filteredColumns  = request.Columns.filter((column: any) =>
      column.Filter && (column.Filter.Text || column.Filter.Argument) &&
      column.Filter && column.Filter.Operator.toLowerCase() != CompareOperators.none);

    filteredColumns.forEach((filterableColumn: any) => {
      request.Columns.find((column: any) => column.Name == filterableColumn.Name).HasFilter = true;

      switch (filterableColumn.Filter.Operator.toLowerCase()) {
        case CompareOperators.equals:
          subset = subset.filter((row) => row[filterableColumn.Name] === filterableColumn.Filter.Text);
          break;
        case CompareOperators.notEquals:
          subset = subset.filter((row) => row[filterableColumn.Name] !== filterableColumn.Filter.Text);
          break;
        case CompareOperators.contains:
          subset = subset.filter((row) => row[filterableColumn.Name].indexOf(filterableColumn.Filter.Text) >= 0);
          break;
        case CompareOperators.notContains:
          subset = subset.filter((row) => row[filterableColumn.Name].indexOf(filterableColumn.Filter.Text) < 0);
          break;
        case CompareOperators.startsWith:
          subset = subset.filter((row) => row[filterableColumn.Name].toLowerCase().startsWith(filterableColumn.Filter.Text));
          break;
        case CompareOperators.notStartsWith:
          subset = subset.filter((row) => !row[filterableColumn.Name].toLowerCase().startsWith(filterableColumn.Filter.Text));
          break;
        case CompareOperators.endsWith:
          subset = subset.filter((row) => row[filterableColumn.Name].toLowerCase().endsWith(filterableColumn.Filter.Text));
          break;
        case CompareOperators.notEndsWith:
          subset = subset.filter((row) => !row[filterableColumn.Name].toLowerCase().endsWith(filterableColumn.Filter.Text));
          break;
        case CompareOperators.gt:
          subset = subset.filter((row) => row[filterableColumn.Name] > filterableColumn.Filter.Text);
          break;
        case CompareOperators.gte:
          subset = subset.filter((row) => row[filterableColumn.Name] >= filterableColumn.Filter.Text);
          break;
        case CompareOperators.lt:
          subset = subset.filter((row) => row[filterableColumn.Name] < filterableColumn.Filter.Text);
          break;
        case CompareOperators.lte:
          subset = subset.filter((row) => row[filterableColumn.Name] <= filterableColumn.Filter.Text);
          break;
        case CompareOperators.between:
          subset = subset.filter(row => row[filterableColumn.Name] > filterableColumn.Filter.Text && row[filterableColumn.Name] < filterableColumn.Filter.Argument[0]);
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
        orders.push((column.SortDirection == SortDirection.ascending ? 'asc' : 'desc'));
      });

      subset = _.orderBy(subset, columns, orders);
    } else {
      subset = _.orderBy(subset, request.Columns[0].Name, 'asc');
    }

    return subset;
  }

  public getAggregatePayload(request: any, subset: any[]) {
    const aggregateColumns = _.filter(request.Columns, (column) =>
      column.Aggregate && column.Aggregate.toLowerCase() != AggregateFunctions.none);

    const results = _.map(aggregateColumns, (column) => {
      let value;

      switch (column.Aggregate.toLowerCase()) {
        case AggregateFunctions.sum:
          value = _.sumBy(subset, column.Name);
          break;
        case AggregateFunctions.average:
          value = _.meanBy(subset, column.Name);
          break;
        case AggregateFunctions.max:
          value = _.maxBy(subset, column.Name)[column.Name];
          break;
        case AggregateFunctions.min:
          value = _.minBy(subset, column.Name)[column.Name];
          break;
        case AggregateFunctions.count:
          value = subset.length;
          break;
        case AggregateFunctions.distinctCount:
          value = _.uniqWith(subset, (a, b) => {
            return a[column.Name] == b[column.Name];
          }).length;
          break;
        default:
          throw new Error('Unsupported aggregate function');
      }

      return { [column.Name]: value };
    });

    return _.reduce(results, _.merge, {});
  }

  /** Private methods */

  private normalizeColumns = (columns: any[]) =>
    columns.map((column) => {
      const obj = Object.assign({}, LocalDataSource.defaultColumnValues, column);

      if (column.Filtering) {
        obj.Filter = {
          Argument: [],
          HasFilter: false,
          Name: obj.Name,
          Operator: 'None',
          OptionsUrl: null,
          Text: null
        };
      }
      delete obj.Filtering;

      return obj;
    })
}
