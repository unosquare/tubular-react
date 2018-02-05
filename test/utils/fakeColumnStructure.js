const columns = [
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
    Name: 'ShipperCity',
  },
  {
    Label: 'Amount',
    Name: 'Amount',
    DataType: 'numeric'
  }
];

export default columns;