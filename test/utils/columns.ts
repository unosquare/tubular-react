import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection
} from '../../src/DataGrid';

const validColumnsSample = [
  new ColumnModel( 'OrderID',
    { DataType: ColumnDataType.NUMERIC,
      Filtering: true,
      IsKey: true,
      Label: 'Order ID',
      SortDirection: ColumnSortDirection.ASCENDING,
      SortOrder: 1,
      Sortable: true }
  ),
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

// Columns for aggregate functions

const validColumnsSampleAggAverage = [
  new ColumnModel( 'Amount',
    {
      Aggregate: AggregateFunctions.AVERAGE,
      DataType: ColumnDataType.NUMERIC  }
  )
];

const validColumnsSampleAggSum = [
  new ColumnModel( 'Amount',
    {
      Aggregate: AggregateFunctions.SUM,
      DataType: ColumnDataType.NUMERIC  }
  )
];

const validColumnsSampleAggMax = [
  new ColumnModel( 'Amount',
    {
      Aggregate: AggregateFunctions.MAX,
      DataType: ColumnDataType.NUMERIC  }
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

export {
  simpleColumnsSample,
  validColumnsSample,
  validColumnsSampleDescending,
  validColumnsSampleMultipleSorting,
  validColumnsSampleAggAverage,
  validColumnsSampleAggSum,
  validColumnsSampleAggMax
};
