import { isAfter, isBefore, isEqual } from 'date-fns';
import { orderBy, sortBy } from 'lodash';

import {
    AggregateFunctions, ColumnSortDirection, CompareOperators,
} from '../Models/Column';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';

class LocalDataSourceResponse {

    public static getResponse(request: GridRequest, dataSource: any): GridResponse {
        const response = new GridResponse(request.Counter);
        response.TotalRecordCount = dataSource.length;

        let data = this.applyFreeTextSearch(request, dataSource);
        data = this.applyFiltering(request, data);
        data = this.applySorting(request, data);

        response.FilteredRecordCount = data.length;

        if (request.Take > -1) {
            response.TotalPages = Math.ceil(response.FilteredRecordCount / request.Take);

            if (response.TotalPages > 0) {
                response.CurrentPage = request.Skip / request.Take + 1;
            }
        }

        response.Aggregate = this.getAggregatePayload(request, data);

        response.Payload = data
            .slice(request.Skip, request.Skip + request.Take)
            .map((row: any) => this.parsePayload(row, request.Columns));

        return response;
    }

    private static applyFreeTextSearch(request: any, subset: any[]) {
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

    private static applyFiltering(request: any, subset: any[]) {
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

    private static applySorting(request: any, subset: any[]) {
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
    }

    private static getAggregatePayload(request: any, subset: any[]) {
        const aggregateColumns = request.Columns.filter((column: any) =>
            column.Aggregate && column.Aggregate.toLowerCase() !== AggregateFunctions.NONE.toLowerCase());

        return aggregateColumns.reduce((prev: any, column: any) => {
            let value;

            switch (column.Aggregate.toLowerCase()) {
                case AggregateFunctions.SUM.toLowerCase():
                    value = subset.reduce((sum, r) => sum + r[column.Name],
                        subset[0][column.Name] - subset[0][column.Name]);
                    break;
                case AggregateFunctions.AVERAGE.toLowerCase():
                    value = (subset.reduce((sum, r) => sum + r[column.Name],
                    subset[0][column.Name] - subset[0][column.Name]) / subset.length);
                    break;
                case AggregateFunctions.MAX.toLowerCase():
                    value = subset.reduce((max, r) => r[column.Name] > max ? r[column.Name] : max,
                    subset[0][column.Name]);
                    break;
                case AggregateFunctions.MIN.toLowerCase():
                    value = subset.reduce((min, r) => r[column.Name] < min ? r[column.Name] : min,
                    subset[0][column.Name]);
                    break;
                case AggregateFunctions.COUNT.toLowerCase():
                    value = subset.length;
                    break;
                case AggregateFunctions.DISTINCT_COUNT.toLowerCase():
                    value = subset.reduce((list, r) => {
                        if (list.indexOf(r[column.Name]) === -1) { list.push(r[column.Name]); }
                        return  list; }, []).length;
                    break;
                default:
                    throw new Error('Unsupported aggregate function');
            }

            prev[column.Name] = value;
            return prev;
        }, {});
    }

    private static parsePayload(row: any, columns: any[]) {
        return columns.reduce((obj: any, column: any, key: any) => {
            obj[column.Name] = row[key] || row[column.Name];

            return obj;
        }, {});
    }
}

export default LocalDataSourceResponse;
