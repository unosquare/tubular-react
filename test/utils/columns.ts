import { AggregateFunctions, ColumnDataType, ColumnSortDirection, createColumn } from 'tubular-common';

const regularOrderIdCol = createColumn('OrderID', {
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
    createColumn('CustomerName', {
        aggregate: AggregateFunctions.Count,
        filterable: true,
        searchable: true,
    }),
    createColumn('ShippedDate', {
        dataType: ColumnDataType.DateTime,
        filterable: true,
    }),
    createColumn('ShipperCity'),
    createColumn('Amount', { dataType: ColumnDataType.Numeric }),
];

export { validColumnsSample };
