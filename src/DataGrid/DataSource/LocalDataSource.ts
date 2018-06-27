import { isAfter, isBefore, isEqual } from 'date-fns';
import { maxBy, meanBy, merge, minBy, orderBy, sortBy, sumBy, uniqWith } from 'lodash';
import * as React from 'react'; // leave here

import {
  AggregateFunctions,
  ColumnSortDirection,
  CompareOperators,
} from '../Models/Column';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from './IBaseDataSourceState';

const withLocalDataSource = (WrappedComponent: any, columns: any, source: any, itemsPerPage = 10) => {
  return class extends BaseDataSource {
    setInitialState(value: any): IBaseDataSourceState {
      return {
        ...value,
        columns: columns,
        itemsPerPage: itemsPerPage
      }
    }

    getWrappedComponent(): any {
      return WrappedComponent;
    }

    public getAllRecords(request: GridRequest): Promise<object> {
      return new Promise((resolve, reject) => {
        try {
          const response: any = {
            Counter: request.Count,
            CurrentPage: 1,
            TotalRecordCount: source.length
          };

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

          data = data.slice(request.Skip, request.Skip + request.Take);

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

          return subset.filter((item) =>
            searchableColumns.some((x: any) =>
              item[x.Name].toLowerCase().indexOf(filter) > -1));
        }

        return subset;
      }
    }

    public applyFiltering(request: any, subset: any[]) {
      request.Columns
        .filter((column: any) => column.hasFilter)
        .forEach((filterableColumn: any) => {
        const isDate = filterableColumn.DataType === 'datetime' ||
          filterableColumn.DataType === 'date' ||
          filterableColumn.DataType === 'datetimeutc';

        switch (filterableColumn.Filter.Operator) {
          case CompareOperators.EQUALS:
            if (isDate) {
              subset = subset.filter((row) =>
                isEqual(row[filterableColumn.Name], filterableColumn.Filter.Text));
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
                isAfter(row[filterableColumn.Name], filterableColumn.Filter.Text));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] > filterableColumn.Filter.Text);
            }
            break;
          case CompareOperators.GTE:
            if (isDate) {
              subset = subset.filter((row) =>
                isEqual(row[filterableColumn.Name], filterableColumn.Filter.Text)
                || isAfter(row[filterableColumn.Name], filterableColumn.Filter.Text));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] >= filterableColumn.Filter.Text);
            }
            break;
          case CompareOperators.LT:
            if (isDate) {
              subset = subset.filter((row) =>
                isBefore(row[filterableColumn.Name], filterableColumn.Filter.Text));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] < filterableColumn.Filter.Text);
            }
            break;
          case CompareOperators.LTE:
            if (isDate) {
              subset = subset.filter((row) =>
                isEqual(row[filterableColumn.Name], filterableColumn.Filter.Text)
                || isBefore(row[filterableColumn.Name], filterableColumn.Filter.Text));
            } else {
              subset = subset.filter((row) => row[filterableColumn.Name] <= filterableColumn.Filter.Text);
            }
            break;
          case CompareOperators.BETWEEN:
            if (isDate) {
              subset = subset.filter((row) =>
                (isEqual(row[filterableColumn.Name], filterableColumn.Filter.Text)
                  || isAfter(row[filterableColumn.Name], filterableColumn.Filter.Text)) &&
                (isEqual(row[filterableColumn.Name], filterableColumn.Filter.Argument[0])
                  || isBefore(row[filterableColumn.Name], filterableColumn.Filter.Argument[0])));
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
      let sortedColumns = request.Columns.filter((column: any) => column.SortOrder > 0);

      let columns: any[] = [];
      let orders: any[] = [];

      if (sortedColumns.length > 0) {
        sortedColumns = sortBy(sortedColumns, ['SortOrder']);
        columns = sortedColumns.map((y: any) => y.Name);
        orders = sortedColumns.map((y: any) => y.SortDirection === ColumnSortDirection.ASCENDING ? 'asc' : 'desc');
      } else {
        columns.push(request.Columns[0].Name);
        orders.push('asc');
      }

      return orderBy(subset, columns, orders);
    }

    public getAggregatePayload(request: any, subset: any[]) {
      const aggregateColumns = request.Columns.filter((column: any) =>
        column.Aggregate && column.Aggregate.toLowerCase() !== AggregateFunctions.NONE.toLowerCase());

      const results = aggregateColumns.map((column: any) => {
        let value;

        switch (column.Aggregate.toLowerCase()) {
          case AggregateFunctions.SUM.toLowerCase():
            value = sumBy(subset, column.Name);
            break;
          case AggregateFunctions.AVERAGE.toLowerCase():
            value = meanBy(subset, column.Name);
            break;
          case AggregateFunctions.MAX.toLowerCase():
            value = maxBy(subset, column.Name)[column.Name];
            break;
          case AggregateFunctions.MIN.toLowerCase():
            value = minBy(subset, column.Name)[column.Name];
            break;
          case AggregateFunctions.COUNT.toLowerCase():
            value = subset.length;
            break;
          case AggregateFunctions.DISTINCT_COUNT.toLowerCase():
            value = uniqWith(subset, (a, b) => (a[column.Name] === b[column.Name])).length;
            break;
          default:
            throw new Error('Unsupported aggregate function');
        }

        return { [column.Name]: value };
      });

      return results.reduce(merge(results), {});
    }
  }
}
export default withLocalDataSource;
