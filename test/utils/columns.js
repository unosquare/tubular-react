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

const validColumnsSample_descending = [
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

export { validColumnsSample, validColumnsSample_descending, invalidColumnsSample };