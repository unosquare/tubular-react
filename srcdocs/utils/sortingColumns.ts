import {
    ColumnDataType,
    ColumnModel,
} from 'tubular-common';

export default [
    new ColumnModel('OrderID',
        {
            DataType: ColumnDataType.NUMERIC,
            Label: 'ID',
            Sortable: true,
        }
    ),
    new ColumnModel('CustomerName',
        {
            Sortable: true,
        },
    ),
    new ColumnModel('ShippedDate',
        {
            DataType: ColumnDataType.DATE_TIME,
            Sortable: true,
        },
    ),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount',
        {
            DataType: ColumnDataType.NUMERIC,
            Sortable: true,
        },
    ),
    new ColumnModel('IsShipped',
        {
            DataType: ColumnDataType.BOOLEAN,
        },
    ),
];
