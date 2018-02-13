const simpleRequest = { 
  Count: 0,
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
  Take: 10,
  Search: { Text: '', Operator: 'Auto' },
  TimezoneOffset: 360 };

const page2Request = { 
  Count: 1,
  Columns: [ 
    { Aggregate: 'None',
    DataType: 'numeric',
    IsKey: true,
    Searchable: false,
      Sortable: true,
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
    { Aggregate: 'Count',
      DataType: 'string',
      IsKey: false,
      Searchable: true,
      Sortable: false,
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
    { Aggregate: 'None',
      DataType: 'datetime',
      IsKey: false,
      Searchable: false,
      Sortable: false,
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
    { Aggregate: 'None',
      DataType: 'string',
      IsKey: false,
      Searchable: false,
      Sortable: false,
      Visible: true,
      Label: 'Shipper City',
      Name: 'ShipperCity' },
    { Aggregate: 'None',
      DataType: 'numeric',
      IsKey: false,
      Searchable: false,
      Sortable: false,
      Visible: true,
      Label: 'Amount',
      Name: 'Amount' } 
  ],
  Skip: 10,
  Take: 10,
  Search: { Text: '', Operator: 'Auto' },
  TimezoneOffset: 360 };


  // const page2Request = { 
  //   Count: 0,
  //   Columns: [ 
  //     { Sortable: true,
  //       Searchable: false,
  //       Aggregate: 'None',
  //       DataType: 'numeric',
  //       IsKey: true,
  //       Visible: true,
  //       Label: 'Order ID',
  //       Name: 'OrderID',
  //       SortOrder: 1,
  //       SortDirection: 'Ascending',
  //       Filter:
  //       { Argument: [],
  //         HasFilter: false,
  //         Name: 'OrderID',
  //         Operator: 'None',
  //         OptionsUrl: null,
  //         Text: null } },
  //     { Sortable: false,
  //       Searchable: true,
  //       Aggregate: 'Count',
  //       DataType: 'string',
  //       IsKey: false,
  //       Visible: true,
  //       Label: 'Customer Name',
  //       Name: 'CustomerName',
  //       Filter:
  //       { Argument: [],
  //         HasFilter: false,
  //         Name: 'CustomerName',
  //         Operator: 'None',
  //         OptionsUrl: null,
  //         Text: null } },
  //     { Sortable: false,
  //       Searchable: false,
  //       Aggregate: 'None',
  //       DataType: 'datetime',
  //       IsKey: false,
  //       Visible: true,
  //       Label: 'Shipped Date',
  //       Name: 'ShippedDate',
  //       Filter:
  //       { Argument: [],
  //         HasFilter: false,
  //         Name: 'ShippedDate',
  //         Operator: 'None',
  //         OptionsUrl: null,
  //         Text: null } },
  //     { Sortable: false,
  //       Searchable: false,
  //       Aggregate: 'None',
  //       DataType: 'string',
  //       IsKey: false,
  //       Visible: true,
  //       Label: 'Shipper City',
  //       Name: 'ShipperCity' },
  //     { Sortable: false,
  //       Searchable: false,
  //       Aggregate: 'None',
  //       DataType: 'numeric',
  //       IsKey: false,
  //       Visible: true,
  //       Label: 'Amount',
  //       Name: 'Amount' } ],
  //   Skip: 10,
  //   Take: 10,
  //   Search: { Text: '', Operator: 'Auto' },
  //   TimezoneOffset: 360 };



const descendingRequest = { 
  Count: 1,
  Columns: [ 
    { Aggregate: 'None',
      DataType: 'numeric',
      IsKey: true,
      Searchable: false,
      Sortable: true,
      Visible: true,
      Label: 'Order ID',
      Name: 'OrderID',
      SortOrder: 1,
      SortDirection: 'Descending',
      Filter:
      { Argument: [],
        HasFilter: false,
        Name: 'OrderID',
        Operator: 'None',
        OptionsUrl: null,
        Text: null } },
    { Aggregate: 'Count',
      DataType: 'string',
      IsKey: false,
      Searchable: true,
      Sortable: false,
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
    { Aggregate: 'None',
      DataType: 'datetime',
      IsKey: false,
      Searchable: false,
      Sortable: false,
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
    { Aggregate: 'None',
      DataType: 'string',
      IsKey: false,
      Searchable: false,
      Sortable: false,
      Visible: true,
      Label: 'Shipper City',
      Name: 'ShipperCity' },
    { Aggregate: 'None',
      DataType: 'numeric',
      IsKey: false,
      Searchable: false,
      Sortable: false,
      Visible: true,
      Label: 'Amount',
      Name: 'Amount' } 
    ],
  Skip: 0,
  Take: 10,
  Search: { Text: '', Operator: 'Auto' },
  TimezoneOffset: 360 };

const twentyRecordsRequest = { 
  Count: 0,
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

const onlyMicrosoftRecordsRequest = { 
  Count: 0,
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
  Take: 10,
  Search: { Text: 'Microsoft', Operator: 'Auto' },
  TimezoneOffset: 360 };  

export { descendingRequest, onlyMicrosoftRecordsRequest, page2Request, simpleRequest, twentyRecordsRequest };