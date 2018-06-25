import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import {
  AggregateFunctions,
  ColumnSortDirection,
  CompareOperators,
} from '../Models/Column';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';
import GridDataResponse from '../utils/GridDataResponse';
import BaseDataSource, {IBaseDataSourceState } from './BaseDataSource';

const withLocalDataSource = (WrappedComponent: any, columns: any, source: any, itemsPerPage = 10) => {
  return class extends BaseDataSource {
    setInitialState(value: any): IBaseDataSourceState {
      return {
        ...value,
        columns: columns,
        itemsPerPage: itemsPerPage
      }
    }
    
    getWrappedComponent() {
      return <WrappedComponent {...this.props} />;
    }

  public getAllRecords(request: GridRequest): Promise<object> {
    return new Promise((resolve, reject) => {
      try {
        const response = new GridDataResponse({
          Counter: request.Count,
          CurrentPage: 1,
          TotalRecordCount: source.length
        });

        let data = this.applyFreeTextSearch(request, source);
        data = this.applyFiltering(request, data);
        data = this.applySorting(request, data);

        response.FilteredRecordCount = data.length;

        if (request.Take > -1) {
          response.TotalPages = Math.ceil(response.FilteredRecordCount / request.Take);

          if (response.TotalPages > 0) {
            response.CurrentPage = request.Skip / request.Take + 1;
          }
        }

        data = _.slice(data, request.Skip, request.Skip + request.Take);

        resolve(new GridResponse({
          Aggregate: this.getAggregatePayload(request, data),
          FilteredRecordCount: response.FilteredRecordCount,
          Payload: data.map((row: any) => this.parsePayload(row, request.Columns)),
          TotalRecordCount: response.TotalRecordCount
        }));
      } catch (error) {
        reject(error);
      }
    });
  }

  public applyFreeTextSearch(request: any, subset: any[]) {
    if (request.Search && request.Search.Operator.toLowerCase() === CompareOperators.AUTO.toLowerCase()) {
      const searchableColumns = request.Columns.filter((x: any) => x.Searchable);

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
      const isDate = filterableColumn.DataType === 'datetime' ||
        filterableColumn.DataType === 'date' ||
        filterableColumn.DataType === 'datetimeutc';

      switch (filterableColumn.Filter.Operator) {
        case CompareOperators.EQUALS:
          if (isDate) {
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
          if (isDate) {
            subset = subset.filter((row) =>
              moment(row[filterableColumn.Name]).isAfter(moment(filterableColumn.Filter.Text)));
          } else {
            subset = subset.filter((row) => row[filterableColumn.Name] > filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.GTE:
          if (isDate) {
            subset = subset.filter((row) =>
              moment(row[filterableColumn.Name]).isSameOrAfter(moment(filterableColumn.Filter.Text)));
          } else {
            subset = subset.filter((row) => row[filterableColumn.Name] >= filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.LT:
          if (isDate) {
            subset = subset.filter((row) =>
              moment(row[filterableColumn.Name]).isBefore(moment(filterableColumn.Filter.Text)));
          } else {
            subset = subset.filter((row) => row[filterableColumn.Name] < filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.LTE:
          if (isDate) {
            subset = subset.filter((row) =>
              moment(row[filterableColumn.Name]).isSameOrBefore(moment(filterableColumn.Filter.Text)));
          } else {
            subset = subset.filter((row) => row[filterableColumn.Name] <= filterableColumn.Filter.Text);
          }
          break;
        case CompareOperators.BETWEEN:
          if (isDate) {
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

    let columns: any[] = [];
    let orders: any[] = [];

    if (sortedColumns.length > 0) {
      sortedColumns = _.sortBy(sortedColumns, ['SortOrder']);
      columns = sortedColumns.map((y) => y.Name);
      orders = sortedColumns.map((y) => y.SortDirection === ColumnSortDirection.ASCENDING ? 'asc' : 'desc');
    } else {
      columns.push(request.Columns[0].Name);
      orders.push('asc');
    }

    return _.orderBy(subset, columns, orders);
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
          value = _.uniqWith(subset, (a, b) => (a[column.Name] === b[column.Name])).length;
          break;
        default:
          throw new Error('Unsupported aggregate function');
      }

      return { [column.Name]: value };
    });

    return _.reduce(results, _.merge, {});
  }
}
}

export default withLocalDataSource;