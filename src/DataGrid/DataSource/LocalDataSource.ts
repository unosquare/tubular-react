import * as _ from 'lodash';
import * as moment from 'moment';
import {
  AggregateFunctions,
  ColumnSortDirection,
  CompareOperators,
} from '../Models/Column';
import ColumnModel from '../Models/ColumnModel';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';
import GridDataResponse from '../utils/GridDataResponse';
import BaseDataSource from './BaseDataSource';

export default class LocalDataSource extends BaseDataSource {

  public localData: any[];

  constructor(localData: any[], columns: ColumnModel[]) {
    super(columns);
    this.localData = localData;
  }

  public getAllRecords(rowsPerPage: number, page: number, searchText: string): Promise<object> {
    return new Promise((resolve, reject) => {
      try {
        let data = this.localData;

        const request = new GridRequest({
          Columns: this.columns,
          Count: BaseDataSource.counter++,
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
    const filteredColumns = request.Columns.filter((column: any) =>
      column.Filter && (column.Filter.Text || column.Filter.Argument) &&
      column.Filter && column.Filter.Operator.toLowerCase() !== CompareOperators.NONE.toLowerCase());

    filteredColumns.forEach((filterableColumn: any) => {
      request.Columns.find((column: any) => column.Name === filterableColumn.Name).HasFilter = true;

      switch (filterableColumn.Filter.Operator) {
        case CompareOperators.EQUALS:
          if (filterableColumn.DataType === 'datetime' ||
            filterableColumn.DataType === 'date' ||
            filterableColumn.DataType === 'datetimeutc') {
            subset = subset.filter((row) =>
              moment(row[filterableColumn.Name]).isSame(moment(filterableColumn.Filter.Text)));
          } else if (filterableColumn.DataType === 'string') {
            subset = subset.filter((row) =>
              row[filterableColumn.Name].toLowerCase() === filterableColumn.Filter.Text.toLowerCase());
          } else {
            subset = subset.filter((row) =>
              row[filterableColumn.Name] === filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.NOT_EQUALS:
          if (filterableColumn.DataType === 'string') {
            subset = subset.filter((row) =>
              row[filterableColumn.Name].toLowerCase() !== filterableColumn.Filter.Text.toLowerCase());
          } else {
            subset = subset.filter((row) =>
              row[filterableColumn.Name] !== filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.CONTAINS:
          subset = subset.filter((row) => row[filterableColumn.Name].toLowerCase()
            .indexOf(filterableColumn.Filter.Text.toLowerCase()) >= 0);
          break;
        case CompareOperators.NOT_CONTAINS:
          subset = subset.filter((row) => row[filterableColumn.Name].toLowerCase()
            .indexOf(filterableColumn.Filter.Text.toLowerCase()) < 0);
          break;
        case CompareOperators.STARTS_WITH:
          subset = subset.filter((row) =>
            row[filterableColumn.Name].toLowerCase().startsWith(filterableColumn.Filter.Text.toLowerCase()));
          break;
        case CompareOperators.NOT_STARTS_WITH:
          subset = subset.filter((row) =>
            !row[filterableColumn.Name].toLowerCase().startsWith(filterableColumn.Filter.Text.toLowerCase()));
          break;
        case CompareOperators.ENDS_WITH:
          subset = subset.filter((row) =>
            row[filterableColumn.Name].toLowerCase().endsWith(filterableColumn.Filter.Text.toLowerCase()));
          break;
        case CompareOperators.NOT_ENDS_WITH:
          subset = subset.filter((row) =>
            !row[filterableColumn.Name].toLowerCase().endsWith(filterableColumn.Filter.Text.toLowerCase()));
          break;
        case CompareOperators.GT:
          if (filterableColumn.DataType === 'datetime' ||
            filterableColumn.DataType === 'date' ||
            filterableColumn.DataType === 'datetimeutc') {
            subset = subset.filter((row) =>
              moment(row[filterableColumn.Name]).isAfter(moment(filterableColumn.Filter.Text)));
          } else {
            subset = subset.filter((row) => row[filterableColumn.Name] > filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.GTE:
          if (filterableColumn.DataType === 'datetime' ||
            filterableColumn.DataType === 'date' ||
            filterableColumn.DataType === 'datetimeutc') {
            subset = subset.filter((row) =>
              moment(row[filterableColumn.Name]).isSameOrAfter(moment(filterableColumn.Filter.Text)));
          } else {
            subset = subset.filter((row) => row[filterableColumn.Name] >= filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.LT:
          if (filterableColumn.DataType === 'datetime' ||
            filterableColumn.DataType === 'date' ||
            filterableColumn.DataType === 'datetimeutc') {
            subset = subset.filter((row) =>
              moment(row[filterableColumn.Name]).isBefore(moment(filterableColumn.Filter.Text)));
          } else {
            subset = subset.filter((row) => row[filterableColumn.Name] < filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.LTE:
          if (filterableColumn.DataType === 'datetime' ||
            filterableColumn.DataType === 'date' ||
            filterableColumn.DataType === 'datetimeutc') {
            subset = subset.filter((row) =>
              moment(row[filterableColumn.Name]).isSameOrBefore(moment(filterableColumn.Filter.Text)));
          } else {
            subset = subset.filter((row) => row[filterableColumn.Name] <= filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.BETWEEN:
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

      _.forEach(sortedColumns, (column) => {
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
