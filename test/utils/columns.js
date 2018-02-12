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

const normalizedColumns = [ 
  { Sortable: true,
    Searchable: false,
    Aggregate: 'None',
    DataType: 'numeric',
    IsKey: true,
    Visible: true,
    Label: 'Order ID',
    Name: 'OrderID',
    SortOrder: 1,
    SortDirection: 'Ascending',
    Filter:
   { Argument: [],
     HasFilter: false,
     Name: 'OrderID',
     Operator: 'None',
     OptionsUrl: null,
     Text: null } },
  { Sortable: false,
    Searchable: true,
    Aggregate: 'Count',
    DataType: 'string',
    IsKey: false,
    Visible: true,
    Label: 'Customer Name',
    Name: 'CustomerName',
    Filter:
   { Argument: [],
     HasFilter: false,
     Name: 'CustomerName',
     Operator: 'None',
     OptionsUrl: null,
     Text: null } },
  { Sortable: false,
    Searchable: false,
    Aggregate: 'None',
    DataType: 'datetime',
    IsKey: false,
    Visible: true,
    Label: 'Shipped Date',
    Name: 'ShippedDate',
    Filter:
   { Argument: [],
     HasFilter: false,
     Name: 'ShippedDate',
     Operator: 'None',
     OptionsUrl: null,
     Text: null } },
  { Sortable: false,
    Searchable: false,
    Aggregate: 'None',
    DataType: 'string',
    IsKey: false,
    Visible: true,
    Label: 'Shipper City',
    Name: 'ShipperCity' },
  { Sortable: false,
    Searchable: false,
    Aggregate: 'None',
    DataType: 'numeric',
    IsKey: false,
    Visible: true,
    Label: 'Amount',
    Name: 'Amount' } 
];

const request = { Count: 0,
  Columns:
   [ { Sortable: true,
     Searchable: false,
     Aggregate: 'None',
     DataType: 'numeric',
     IsKey: true,
     Visible: true,
     Label: 'Order ID',
     Name: 'OrderID',
     SortOrder: 1,
     SortDirection: 'Ascending',
     Filter:
     { Argument: [],
       HasFilter: false,
       Name: 'OrderID',
       Operator: 'None',
       OptionsUrl: null,
       Text: null } },
   { Sortable: false,
     Searchable: true,
     Aggregate: 'Count',
     DataType: 'string',
     IsKey: false,
     Visible: true,
     Label: 'Customer Name',
     Name: 'CustomerName',
     Filter:
     { Argument: [],
       HasFilter: false,
       Name: 'CustomerName',
       Operator: 'None',
       OptionsUrl: null,
       Text: null } },
   { Sortable: false,
     Searchable: false,
     Aggregate: 'None',
     DataType: 'datetime',
     IsKey: false,
     Visible: true,
     Label: 'Shipped Date',
     Name: 'ShippedDate',
     Filter:
     { Argument: [],
       HasFilter: false,
       Name: 'ShippedDate',
       Operator: 'None',
       OptionsUrl: null,
       Text: null } },
   { Sortable: false,
     Searchable: false,
     Aggregate: 'None',
     DataType: 'string',
     IsKey: false,
     Visible: true,
     Label: 'Shipper City',
     Name: 'ShipperCity' },
   { Sortable: false,
     Searchable: false,
     Aggregate: 'None',
     DataType: 'numeric',
     IsKey: false,
     Visible: true,
     Label: 'Amount',
     Name: 'Amount' } ],
  Skip: 0,
  Take: 20,
  Search: { Text: '', Operator: 'Auto' },
  TimezoneOffset: 360 };

export { validColumnsSample, invalidColumnsSample, normalizedColumns, request };