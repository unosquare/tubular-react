import {
  ColumnDataType,
  ColumnModel,
} from 'tubular-common';

const columns = [
  new ColumnModel('OrderID', {
    DataType: ColumnDataType.NUMERIC,
    IsKey: true,
    Label: 'Id',
  }),
  new ColumnModel('CustomerName'),
  new ColumnModel('ShippedDate', {
    DataType: ColumnDataType.DATE_TIME,
  }),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount', {
    DataType: ColumnDataType.NUMERIC,
  }),
  new ColumnModel('IsShipped', {
    DataType: ColumnDataType.BOOLEAN,
  }),
];
export default columns;
