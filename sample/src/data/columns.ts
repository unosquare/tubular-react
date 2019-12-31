import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from 'tubular-common';

const columns = [
    new ColumnModel('OrderID', {
        dataType: ColumnDataType.Numeric,
        filterable: true,
        isKey: true,
        label: 'Id',
        sortDirection: ColumnSortDirection.Ascending,
        sortOrder: 1,
        sortable: true,
    }),
    new ColumnModel('CustomerName', {
        aggregate: AggregateFunctions.Count,
        filterable: true,
        searchable: true,
        sortable: true,
    }),
    new ColumnModel('ShippedDate', {
        dataType: ColumnDataType.DateTime,
        filterable: true,
        sortable: true,
    }),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount', {
        dataType: ColumnDataType.Numeric,
        sortable: true,
    }),
    new ColumnModel('IsShipped', {
        dataType: ColumnDataType.Boolean,
        filterable: true,
        sortable: true,
    }),
];
export default columns;
