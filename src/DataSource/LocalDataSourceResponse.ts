import { isAfter, isBefore, isEqual } from 'date-fns';
import { maxBy, meanBy, minBy, orderBy, sortBy, sumBy, uniqWith } from 'lodash';
import * as React from 'react'; // leave here

import {
    AggregateFunctions,
    ColumnSortDirection,
    CompareOperators,
} from '../Models/Column';
import GridRequest from '../Models/GridRequest';

const LocalDataSourceResponse = {

    getResponse: (request: GridRequest, dataSource: any): any => {
        try {
            const response: any = {
                Counter: request.Count,
                CurrentPage: 1,
                TotalRecordCount: dataSource.length
            };

            response.data = this.applyFreeTextSearch(request, dataSource);
            response.data = this.applyFiltering(request, response.data);
            response.data = this.applySorting(request, response.data);

            response.FilteredRecordCount = response.data.length;

            if (request.Take > -1) {
                response.TotalPages = Math.ceil(response.FilteredRecordCount / request.Take);

                if (response.TotalPages > 0) {
                    response.CurrentPage = request.Skip / request.Take + 1;
                }
            }

            response.aggregate = this.getAggregatePayload(request, response.data);
            response.data = response.data.slice(request.Skip, request.Skip + request.Take);

            return response;
        } catch (error) {
            return null;
        }
    },

    applyFreeTextSearch: (request: any, subset: any[]) => {
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
    },

    applyFiltering: (request: any, subset: any[]) => {
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
    },

    applySorting: (request: any, subset: any[]) => {
        let sortedColumns = request.Columns.filter((column: any) => column.SortOrder > 0);

        let cols: any[] = [];
        let orders: any[] = [];

        if (sortedColumns.length > 0) {
            sortedColumns = sortBy(sortedColumns, ['SortOrder']);
            cols = sortedColumns.map((y: any) => y.Name);
            orders = sortedColumns.map((y: any) => y.SortDirection === ColumnSortDirection.ASCENDING ? 'asc' : 'desc');
        } else {
            cols.push(request.Columns[0].Name);
            orders.push('asc');
        }

        return orderBy(subset, cols, orders);
    },

    getAggregatePayload: (request: any, subset: any[]) => {
        const aggregateColumns = request.Columns.filter((column: any) =>
            column.Aggregate && column.Aggregate.toLowerCase() !== AggregateFunctions.NONE.toLowerCase());

        return aggregateColumns.reduce((prev: any, column: any) => {
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

            prev[column.Name] = value;
            return prev;
        }, {});
    }

};

export default LocalDataSourceResponse;
