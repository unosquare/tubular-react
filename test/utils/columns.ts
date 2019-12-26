import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from 'tubular-common';

const regularOrderIdCol = new ColumnModel('OrderID', {
    dataType: ColumnDataType.Numeric,
    filterable: true,
    isKey: true,
    sortDirection: ColumnSortDirection.Ascending,
    sortOrder: 1,
    sortable: true,
});

// Column samples
const validColumnsSample = [
    regularOrderIdCol,
    new ColumnModel('CustomerName', {
        aggregate: AggregateFunctions.Count,
        filterable: true,
        searchable: true,
    }),
    new ColumnModel('ShippedDate', {
        dataType: ColumnDataType.DateTime,
        filterable: true,
    }),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount', { dataType: ColumnDataType.Numeric }),
];

export { validColumnsSample };
