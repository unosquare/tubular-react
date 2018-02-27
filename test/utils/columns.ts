import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection
} from '../../src/DataGrid';

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

const simpleColumnsSample = [
  new ColumnModel( 'OrderID',
    { DataType: ColumnDataType.NUMERIC,
      IsKey: true,
      Label: 'Order ID',
      SortDirection: ColumnSortDirection.ASCENDING,
      SortOrder: 1,
      Sortable: true }
  ),
  new ColumnModel( 'CustomerName',
    { Aggregate: AggregateFunctions.COUNT,
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

// Columns for sorting

const validColumnsSampleDescending = [
  new ColumnModel('OrderID',
    {
      DataType: ColumnDataType.NUMERIC,
      Filtering: true,
      IsKey: true,
      Label: 'ID',
      SortDirection: ColumnSortDirection.DESCENDING,
      SortOrder: 1,
      Sortable: true
    }
  ),
  new ColumnModel('CustomerName',
    {
      Aggregate: AggregateFunctions.COUNT,
      Filtering: true,
      Searchable: true,
      Sortable: true
    }
  ),
  new ColumnModel('ShippedDate',
    {
      DataType: ColumnDataType.DATE_TIME,
      Filtering: true,
      Sortable: true
    }
  ),
  new ColumnModel('Amount',
    {
      Aggregate: AggregateFunctions.MAX,
      DataType: ColumnDataType.NUMERIC
    }
  ),
];

const validColumnsSampleMultipleSorting = [
  new ColumnModel('OrderID',
    {
      DataType: ColumnDataType.NUMERIC,
      Filtering: true,
      IsKey: true,
      Label: 'ID',
      SortDirection: ColumnSortDirection.DESCENDING,
      SortOrder: 1,
      Sortable: true
    }
  ),
  new ColumnModel('CustomerName',
    {
      Aggregate: AggregateFunctions.COUNT,
      Filtering: true,
      Label: 'Customer Name',
      Searchable: true,
      SortDirection: ColumnSortDirection.ASCENDING,
      SortOrder: 2,
      Sortable: true
    }
  ),
  new ColumnModel('ShippedDate',
    {
      DataType: ColumnDataType.DATE_TIME,
      Filtering: true,
      Label: 'Shipped Date',
      SortDirection: ColumnSortDirection.NONE,
      SortOrder: -1,
      Sortable: true
    }
  ),
];

// Columns for aggregate functions

const aggregateColumnsSample = [
  regularOrderIdCol,
  customCustomerNameCol,
  new ColumnModel( 'ShippedDate',
    { DataType: ColumnDataType.DATE_TIME,
      Filtering: true }
  ),
  new ColumnModel( 'ShipperCity' ),
  customAmountCol
];

export {
  customAmountCol,
  customCustomerNameCol,
  aggregateColumnsSample,
  simpleColumnsSample,
  validColumnsSample,
  validColumnsSampleDescending,
  validColumnsSampleMultipleSorting,
};
