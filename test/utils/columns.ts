import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from 'tubular-common';

const regularOrderIdCol = new ColumnModel('OrderID',
  {
    DataType: ColumnDataType.NUMERIC,
    Filterable: true,
    IsKey: true,
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true
  }
);

// Column samples
const validColumnsSample = [
  regularOrderIdCol,
  new ColumnModel( 'CustomerName',
    { Aggregate: AggregateFunctions.COUNT,
      Filterable: true,
      Searchable: true }
  ),
  new ColumnModel( 'ShippedDate',
    { DataType: ColumnDataType.DATE_TIME,
      Filterable: true }
  ),
  new ColumnModel( 'ShipperCity' ),
  new ColumnModel( 'Amount',
    { DataType: ColumnDataType.NUMERIC  }
  )
];

export { validColumnsSample };
