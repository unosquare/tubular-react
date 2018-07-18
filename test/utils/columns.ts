import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from 'tubular-common';

const regularOrderIdCol = new ColumnModel('OrderID',
  {
    DataType: ColumnDataType.NUMERIC,
    Filtering: true,
    IsKey: true,
    Label: 'Order ID',
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true
  }
);

const customAmountCol = new ColumnModel('Amount',
  {
    Aggregate: AggregateFunctions.NONE,
    DataType: ColumnDataType.NUMERIC
  }
);

const customCustomerNameCol = new ColumnModel('CustomerName',
  {
    Aggregate: AggregateFunctions.NONE,
    DataType: ColumnDataType.STRING
  }
);

// Column samples

const validColumnsSample = [
  regularOrderIdCol,
  new ColumnModel( 'CustomerName',
    { Aggregate: AggregateFunctions.COUNT,
      Filtering: true,
      Searchable: true }
  ),
  new ColumnModel( 'ShippedDate',
    { DataType: ColumnDataType.DATE_TIME,
      Filtering: true }
  ),
  new ColumnModel( 'ShipperCity' ),
  new ColumnModel( 'Amount',
    { DataType: ColumnDataType.NUMERIC  }
  )
];

export { validColumnsSample };
