import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection
} from 'tubular-common';

const columns = [
  new ColumnModel('OrderID', {
    DataType: ColumnDataType.NUMERIC,
    Filtering: true,
    IsKey: true,
    Label: 'Id',
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true
  }),
  new ColumnModel('CustomerName', {
    Aggregate: AggregateFunctions.COUNT,
    Filtering: true,
    Searchable: true,
    Sortable: true
  }),
  new ColumnModel('ShippedDate', {
    DataType: ColumnDataType.DATE_TIME,
    Filtering: true,
    Sortable: true
  }),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount', {
    DataType: ColumnDataType.NUMERIC,
    Sortable: true
  }),
  new ColumnModel('IsShipped', {
    DataType: ColumnDataType.BOOLEAN,
    Filtering: true,
    Sortable: true
  })
];
export default columns;
