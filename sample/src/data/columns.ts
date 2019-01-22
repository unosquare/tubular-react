import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection,
} from 'tubular-common';

const columns = [
  new ColumnModel('OrderID', {
    DataType: ColumnDataType.NUMERIC,
    Filterable: true,
    IsKey: true,
    Label: 'Id',
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true,
  }),
  new ColumnModel('CustomerName', {
    Aggregate: AggregateFunctions.COUNT,
    Filterable: true,
    Searchable: true,
    Sortable: true,
  }),
  new ColumnModel('ShippedDate', {
    DataType: ColumnDataType.DATE_TIME,
    Filterable: true,
    Sortable: true,
  }),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount', {
    DataType: ColumnDataType.NUMERIC,
    Sortable: true,
  }),
  new ColumnModel('IsShipped', {
    DataType: ColumnDataType.BOOLEAN,
    Filterable: true,
    Sortable: true,
  }),
];
export default columns;
