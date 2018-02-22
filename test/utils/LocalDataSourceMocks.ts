// Expected response

const expectedLocaDataSourcelResponse = {
  Aggregate: { CustomerName: 22 },
  FilteredRecordCount: 22,
  Payload: [
    { OrderID: 1,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300
    },
    {
      OrderID: 2,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 9
    },
    { OrderID: 3,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92
    },
    { OrderID: 4,
      CustomerName: 'Vesta',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300
    },
    { OrderID: 5,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 174
    },
    { 
      OrderID: 6,
      CustomerName: 'OXXO',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92
    },
    {
      OrderID: 7,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300
    },
    {
      OrderID: 8,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 15
    },
    { OrderID: 9,
      CustomerName: 'OXXO',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92
    },
    {
      OrderID: 10,
      CustomerName: 'Vesta',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300
    }
  ],
  RowsPerPage: 10,
  SearchText: '',
  TotalRecordCount: 22
};

// Mock for unit test when page is set to 1 (Page 2)

const expectedPayloadPage2 = [
  {
    OrderID: 11,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 16
  },
  {
    OrderID: 12,
    CustomerName: 'OXXO',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 13,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 14,
    CustomerName: 'Vesta',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 60
  },
  {
    OrderID: 15,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Portland, OR, US',
    Amount: 192
  },
  {
    OrderID: 16,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 300
  },
  {
    OrderID: 17,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 108
  },
  {
    OrderID: 18,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 92
  },
  {
    OrderID: 19,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300
  },
  {
    OrderID: 20,
    CustomerName: 'OXXO',
    ShippedDate: '2016-11-04T18:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 78
  }
];

// Mock for unit test when sorting is descending

const expectedPayloadDescSortByOrderID = [
  {
    OrderID: 22,
    CustomerName: 'Tiempo Development',
    ShippedDate: '2016-01-04T18:00:00'
  },
  {
    OrderID: 21,
    CustomerName: 'Wizeline',
    ShippedDate: '2015-11-04T18:00:00'
  },
  {
    OrderID: 20,
    CustomerName: 'OXXO',
    ShippedDate: '2016-11-04T18:00:00'
  },
  {
    OrderID: 19,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-08T18:00:00'
  },
  {
    OrderID: 18,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-12-22T08:00:00'
  },
  {
    OrderID: 17,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-04-23T10:00:00'
  },
  {
    OrderID: 16,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00'
  },
  {
    OrderID: 15,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-12-22T08:00:00'
  },
  {
    OrderID: 14,
    CustomerName: 'Vesta',
    ShippedDate: '2016-04-23T10:00:00'
  },
  {
    OrderID: 13,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-03-19T19:00:00'
  }
];

// Mock for unit test when sorting is multiple

const expectedPayloadMultipleSort = [
  {
    OrderID: 18,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-12-22T08:00:00'
  },
  {
    OrderID: 16,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00'
  },
  {
    OrderID: 11,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-04-23T10:00:00'
  },
  {
    OrderID: 2,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-11-08T18:00:00'
  },
  {
    OrderID: 1,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00'
  },
  {
    OrderID: 20,
    CustomerName: 'OXXO',
    ShippedDate: '2016-11-04T18:00:00'
  },
  {
    OrderID: 12,
    CustomerName: 'OXXO',
    ShippedDate: '2016-11-08T18:00:00'
  },
  {
    OrderID: 9,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00'
  },
  {
    OrderID: 6,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00'
  },
  {
    OrderID: 15,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-12-22T08:00:00'
  }
];

// Mock for unit test when searchText is 'ves' ('Vesta')

const expectedPayloadTextSearchVesta = [
  {
    OrderID: 4,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 10,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 14,
    CustomerName: 'Vesta',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 60
  },
  {
    OrderID: 19,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300
  }
];

// Mocks for unit tests for numeric columns

const expectedPayloadNoneNumeric = [
  {
    OrderID: 1,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300
  },
  {
    OrderID: 2,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 9
  },
  {
    OrderID: 3,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 4,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 5,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 174
  },
  {
    OrderID: 6,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  { 
    OrderID: 7,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 8,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 15
  },
  {
    OrderID: 9,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 10,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  }
];

const expectedPayloadEqualsNumeric = [
  {
    OrderID: 9,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  }
];

const expectedPayloadBetweenNumeric = [
  {
    OrderID: 2,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 9
  },
  {
    OrderID: 3,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 4,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 5,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 174
  },
  {
    OrderID: 6,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 7,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 8,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 15
  },
  {
    OrderID: 9,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  }
];

const expectedPayloadGteNumeric = [
  {
    OrderID: 9,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 10,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 11,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 16
  },
  { OrderID: 12,
    CustomerName: 'OXXO',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92 },
  { OrderID: 13,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300 },
  { OrderID: 14,
    CustomerName: 'Vesta',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 60 },
  {
    OrderID: 15,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Portland, OR, US',
    Amount: 192
  },
  {
    OrderID: 16,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 300
  },
  {
    OrderID: 17,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 108
  },
  {
    OrderID: 18,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 92
  }
];

const expectedPayloadGtNumeric = [
  {
    OrderID: 10,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 11,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 16
  },
  {
    OrderID: 12,
    CustomerName: 'OXXO',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 13,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 14,
    CustomerName: 'Vesta',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 60
  },
  {
    OrderID: 15,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Portland, OR, US',
    Amount: 192
  },
  {
    OrderID: 16,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 300
  },
  {
    OrderID: 17,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 108
  },
  {
    OrderID: 18,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 92
  },
  {
    OrderID: 19,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300
  }
];

const expectedPayloadLteNumeric = [
  {
    OrderID: 1,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300
  },
  {
    OrderID: 2,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 9
  },
  {
    OrderID: 3,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 4,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 5,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 174
  }
];

const expectedPayloadLtNumeric = [
  {
    OrderID: 1,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300
  },
  {
    OrderID: 2,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 9
  },
  {
    OrderID: 3,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 4,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  }
];

// Mocks for unit tests for string columns

const expectedPayloadNoneString = [
  {
    OrderID: 1,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300
  },
  {
    OrderID: 2,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 9
  },
  {
    OrderID: 3,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 4,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 5,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 174
  },
  {
    OrderID: 6,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 7,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 8,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 15
  },
  {
    OrderID: 9,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 10,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  }
];

const expectedPayloadEqualsString = [
  {
    OrderID: 3,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 13,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 17,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 108
  }
];

const expectedPayloadNotEqualsString = [
  {
    OrderID: 3,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 4,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 5,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 174
  },
  {
    OrderID: 6,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 7,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 8,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 15
  },
  {
    OrderID: 9,
    CustomerName: 'OXXO',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 10,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 12,
    CustomerName: 'OXXO',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 92
  },
  {
    OrderID: 13,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  }
];

const expectedPayloadContainsString = [
  {
    OrderID: 4,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 10,
    CustomerName: 'Vesta',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 300
  },
  {
    OrderID: 14,
    CustomerName: 'Vesta',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 60
  },
  {
    OrderID: 19,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300
  }
];

const expectedPayloadStartsWithString = [
  {
    OrderID: 1,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300
  },
  {
    OrderID: 2,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 9
  },
  {
    OrderID: 11,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-04-23T10:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 16
  },
  {
    OrderID: 16,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 300
  },
  {
    OrderID: 18,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-12-22T08:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 92
  }
];

export {
  expectedPayloadTextSearchVesta,
  expectedPayloadMultipleSort,
  expectedPayloadDescSortByOrderID,
  expectedPayloadNoneNumeric,
  expectedPayloadEqualsNumeric,
  expectedPayloadBetweenNumeric,
  expectedPayloadGteNumeric,
  expectedPayloadGtNumeric,
  expectedPayloadLteNumeric,
  expectedPayloadLtNumeric,
  expectedPayloadPage2,
  expectedPayloadContainsString,
  expectedPayloadNoneString,
  expectedPayloadEqualsString,
  expectedPayloadNotEqualsString,
  expectedLocaDataSourcelResponse,
  expectedPayloadStartsWithString
};
