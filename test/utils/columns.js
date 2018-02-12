const validColumnsSample = [
  {
    Label: 'Order ID',
    Name: 'OrderID',
    Sortable: true,
    SortOrder: 1,
    SortDirection: 'Ascending',
    IsKey: true,
    DataType: 'numeric',    
    Filtering: true
  },
  {
    Label: 'Customer Name',
    Name: 'CustomerName',
    Searchable: true,
    Aggregate: 'Count',
    Filtering: true
  },
  {
    Label: 'Shipped Date',
    Name: 'ShippedDate',
    DataType: 'datetime',
    Filtering: true
  },
  {
    Label: 'Shipper City',
    Name: 'ShipperCity'
  },
  {
    Label: 'Amount',
    Name: 'Amount',
    DataType: 'numeric'
  }
];

const invalidColumnsSample = [
  {
    SortOrder: 1,
    SortDirection: 'Descending',
    IsKey: true,
    DataType: 'numeric',    
    Filtering: true
  },
  {
    Label: 'Customer Name',
    Name: 'CustomerName',
    Searchable: true,
    Aggregate: 'Count',
    Filtering: true
  },
  {
    Label: 'Shipped Date',
    Name: 'ShippedDate',
    DataType: 'datetime',
    Filtering: true
  },
  {
    Label: 'Shipper City',
    Name: 'ShipperCity'
  },
  {
    Label: 'Amount',
    Name: 'Amount',
    DataType: 'numeric'
  }
];

const validColumnsSampleDescending = [
  {
    Label: 'Order ID',
    Name: 'OrderID',
    Sortable: true,
    SortOrder: 1,
    SortDirection: 'Descending',
    IsKey: true,
    DataType: 'numeric',    
    Filtering: true
  },
  {
    Label: 'Customer Name',
    Name: 'CustomerName',
    Searchable: true,
    Aggregate: 'Count',
    Filtering: true
  },
  {
    Label: 'Shipped Date',
    Name: 'ShippedDate',
    DataType: 'datetime',
    Filtering: true
  }
];

const validColumnsSampleMultipleSorting = [
  {
    Label: 'Order ID',
    Name: 'OrderID',
    Sortable: true,
    SortOrder: 2,
    SortDirection: 'Descending',
    IsKey: true,
    DataType: 'numeric',    
    Filtering: true
  },
  {
    Label: 'Customer Name',
    Name: 'CustomerName',
    Sortable: true,
    SortOrder: 1,
    SortDirection: 'Ascending',
    Searchable: true,
    Aggregate: 'Count',
    Filtering: true
  },
  {
    Label: 'Shipped Date',
    Name: 'ShippedDate',
    Sortable: true,
    SortOrder: -1,
    SortDirection: 'None',
    DataType: 'datetime',
    Filtering: true
  }
];

export { 
  validColumnsSample, 
  validColumnsSampleDescending, 
  validColumnsSampleMultipleSorting,
  invalidColumnsSample 
};