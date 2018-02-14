const validColumnsSample = [
  {
    DataType: 'numeric',
    Filtering: true,
    IsKey: true,
    Label: 'Order ID',
    Name: 'OrderID',
    SortDirection: 'Ascending',
    SortOrder: 1,
    Sortable: true,
  },
  {
    Aggregate: 'Count',
    Filtering: true,
    Label: 'Customer Name',
    Name: 'CustomerName',
    Searchable: true
  },
  {
    DataType: 'datetime',
    Filtering: true,
    Label: 'Shipped Date',
    Name: 'ShippedDate'
  },
  {
    Label: 'Shipper City',
    Name: 'ShipperCity'
  },
  {
    DataType: 'numeric',
    Label: 'Amount',
    Name: 'Amount',
  }
];

const validColumnsSampleDescending = [
  {
    DataType: 'numeric',
    Filtering: true,
    IsKey: true,
    Label: 'Order ID',
    Name: 'OrderID',
    SortDirection: 'Descending',
    SortOrder: 1,
    Sortable: true
  },
  {
    Aggregate: 'Count',
    Filtering: true,
    Label: 'Customer Name',
    Name: 'CustomerName',
    Searchable: true
  },
  {
    DataType: 'datetime',
    Filtering: true,
    Label: 'Shipped Date',
    Name: 'ShippedDate'
  },
  {
    Label: 'Shipper City',
    Name: 'ShipperCity'
  },
  {
    DataType: 'numeric',
    Label: 'Amount',
    Name: 'Amount'
  }
];

const invalidColumnsSample = [
  {
    DataType: 'numeric',
    Filtering: true,
    IsKey: true,
    SortDirection: 'Descending',
    SortOrder: 1,
  },
  {
    Aggregate: 'Count',
    Filtering: true,
    Label: 'Customer Name',
    Name: 'CustomerName',
    Searchable: true
  },
  {
    DataType: 'datetime',
    Filtering: true,
    Label: 'Shipped Date',
    Name: 'ShippedDate'
  },
  {
    Label: 'Shipper City',
    Name: 'ShipperCity'
  },
  {
    DataType: 'numeric',
    Label: 'Amount',
    Name: 'Amount'
  }
];

const normalizedColumns = [
  { Aggregate: 'None',
    DataType: 'numeric',
    Filter:
    { Argument: [],
      HasFilter: false,
      Name: 'OrderID',
      Operator: 'None',
      OptionsUrl: null,
      Text: null },
    IsKey: true,
    Label: 'Order ID',
    Name: 'OrderID',
    Searchable: false,
    SortDirection: 'Ascending',
    SortOrder: 1,
    Sortable: true,
    Visible: true },
  { Aggregate: 'Count',
    DataType: 'string',
    Filter:
    { Argument: [],
      HasFilter: false,
      Name: 'CustomerName',
      Operator: 'None',
      OptionsUrl: null,
      Text: null },
    IsKey: false,
    Label: 'Customer Name',
    Name: 'CustomerName',
    Searchable: true,
    Sortable: false,
    Visible: true },
  { Aggregate: 'None',
    DataType: 'datetime',
    Filter:
    { Argument: [],
      HasFilter: false,
      Name: 'ShippedDate',
      Operator: 'None',
      OptionsUrl: null,
      Text: null },
    IsKey: false,
    Label: 'Shipped Date',
    Name: 'ShippedDate',
    Searchable: false,
    Sortable: false,
    Visible: true },
  { Aggregate: 'None',
    DataType: 'string',
    IsKey: false,
    Label: 'Shipper City',
    Name: 'ShipperCity',
    Searchable: false,
    Sortable: false,
    Visible: true },
  { Aggregate: 'None',
    DataType: 'numeric',
    IsKey: false,
    Label: 'Amount',
    Name: 'Amount',
    Searchable: false,
    Sortable: false,
    Visible: true }
];

export { invalidColumnsSample, normalizedColumns, validColumnsSample, validColumnsSampleDescending };
