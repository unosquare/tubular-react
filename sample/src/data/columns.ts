import { AggregateFunctions, ColumnDataType, ColumnSortDirection, createColumn } from 'tubular-common';

const columns = [
    createColumn('OrderID', {
        dataType: ColumnDataType.Numeric,
        filterable: true,
        isKey: true,
        label: 'Id',
        sortDirection: ColumnSortDirection.Ascending,
        sortOrder: 1,
        sortable: true,
    }),
    createColumn('CustomerName', {
        aggregate: AggregateFunctions.Count,
        filterable: true,
        searchable: true,
        sortable: true,
    }),
    createColumn('ShippedDate', {
        dataType: ColumnDataType.DateTime,
        filterable: true,
        sortable: true,
    }),
    createColumn('ShipperCity'),
    createColumn('Amount', {
        dataType: ColumnDataType.Numeric,
        sortable: true,
    }),
    createColumn('IsShipped', {
        dataType: ColumnDataType.Boolean,
        filterable: true,
        sortable: true,
    }),
];
export default columns;
