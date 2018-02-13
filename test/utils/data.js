const data = [
  [1, 'Microsoft', '2016-03-19T19:00:00', 'Guadalajara, JAL, Mexico'], 
  [2, 'Microsoft', '2016-04-23T10:00:00', 'Guadalajara, JAL, Mexico'], 
  [3, 'Microsoft', '2016-12-22T08:00:00', 'Guadalajara, JAL, Mexico'], 
  [4, 'Unosquare LLC', '2016-02-01T18:00:00', 'Los Angeles, CA, USA'], 
  [5, 'Microsoft', '2016-11-10T18:00:00', 'Guadalajara, JAL, Mexico'], 
  [6, 'Unosquare LLC', '2016-11-06T18:00:00', 'Los Angeles, CA, USA'], 
  [7, 'Unosquare LLC', '2016-11-11T18:00:00', 'Leon, GTO, Mexico'], 
  [8, 'Unosquare LLC', '2016-11-08T18:00:00', 'Portland, OR, USA'], 
  [9, 'Vesta', '2016-11-07T18:00:00', 'Guadalajara, JAL, Mexico'], 
  [10, 'Unosquare LLC', '2016-11-05T18:00:00', 'Portland, OR, USA']
];

const twentyRecordsExpected = { 
  AggregationPayload: { CustomerName: 500 },
  Counter: 0,
  CurrentPage: 1,
  FilteredRecordCount: 500,
  Payload: [ 
    { OrderID: 1,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300 },
    { OrderID: 2,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: undefined },
    { OrderID: 3,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300 },
    { OrderID: 4,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-02-01T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: undefined },
    { OrderID: 5,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92 },
    { OrderID: 6,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-06T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 18 },
    { OrderID: 7,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 50 },
    { OrderID: 8,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 9 },
    { OrderID: 9,
      CustomerName: 'Vesta',
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 108 },
    { OrderID: 10,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-05T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 15 },
    { OrderID: 11,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 60 },
    { OrderID: 12,
      CustomerName: 'Vesta',
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 174 },
    { OrderID: 13,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-11-04T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 16 },
    { OrderID: 14,
      CustomerName: 'Advanced Technology Systems',
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: undefined },
    { OrderID: 15,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 78 },
    { OrderID: 16,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 41 },
    { OrderID: 17,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: undefined },
    { OrderID: 18,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-03T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 64 },
    { OrderID: 19,
      CustomerName: 'Oxxo',
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 25 },
    { OrderID: 20,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 3 } 
  ],
  TotalPages: 50,
  TotalRecordCount: 500
};

const simpleRecordsExpected = { 
  AggregationPayload: { CustomerName: 500 },
  Counter: 0,
  CurrentPage: 1,
  FilteredRecordCount: 500,
  Payload: [ 
    { OrderID: 1,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300 },
    { OrderID: 2,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: undefined },
    { OrderID: 3,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300 },
    { OrderID: 4,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-02-01T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: undefined },
    { OrderID: 5,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92 },
    { OrderID: 6,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-06T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 18 },
    { OrderID: 7,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 50 },
    { OrderID: 8,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 9 },
    { OrderID: 9,
      CustomerName: 'Vesta',
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 108 },
    { OrderID: 10,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-05T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 15 }
  ],
  TotalPages: 50,
  TotalRecordCount: 500
};

const onlyMicrosoftExpected = { 
  AggregationPayload: { CustomerName: 500 },
  Counter: 0,
  CurrentPage: 1,
  FilteredRecordCount: 500,
  Payload: [
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
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: undefined
    },
    {
      OrderID: 3,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300
    },
    {
      OrderID: 5,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92
    },
    {
      OrderID: 17,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: undefined
    },
    {
      OrderID: 18,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-03T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 64
    },
    {
      OrderID: 20,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 3
    },
    {
      OrderID: 26,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-04T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 56
    },
    {
      OrderID: 33,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: undefined
    },
    {
      OrderID: 35,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 16
    }
  ],
  TotalPages: 50,
  TotalRecordCount: 500
};

const page2Expected = {
  AggregationPayload: { CustomerName: 500 },
  Counter: 0,
  CurrentPage: 2,
  FilteredRecordCount: 500,
  Payload:[ 
    { 
      OrderID: 11,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 60 
    },
    { 
      OrderID: 12,
      CustomerName: 'Vesta',
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 174 
    },
    { 
      OrderID: 13,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-11-04T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 16 
    },
    { 
      OrderID: 14,
      CustomerName: 'Advanced Technology Systems',
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: undefined 
    },
    { 
      OrderID: 15,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 78 
    },
    { 
      OrderID: 16,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 41 
    },
    { 
      OrderID: 17,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: undefined 
    },
    { 
      OrderID: 18,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-03T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 64 
    },
    { 
      OrderID: 19,
      CustomerName: 'Oxxo',
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 25 
    },
    { 
      OrderID: 20,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 3 
    } 
  ],
  TotalPages: 50,
  TotalRecordCount: 500
};

const expected = { 
  payload: [ 
    { 
      OrderID: 1,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300 
    },
    { OrderID: 2,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: undefined 
    },
    { 
      OrderID: 3,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300 
    },
    { 
      OrderID: 4,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-02-01T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: undefined 
    },
    { 
      OrderID: 5,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92 
    },
    { 
      OrderID: 6,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-06T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 18 
    },
    { 
      OrderID: 7,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 50 
    },
    { 
      OrderID: 8,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 9 
    },
    { 
      OrderID: 9,
      CustomerName: 'Vesta',
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 108 
    },
    { 
      OrderID: 10,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-05T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 15 
    } 
  ],
  filteredRecordCount: 500,
  totalRecordCount: 500,
  aggregate: { CustomerName: 500 },
  searchText: '',
  rowsPerPage: 10 
};

const validResponseStructure = {
  'Counter': null,
  'Payload': null,
  'TotalRecordCount': null, 
  'FilteredRecordCount': null,
  'TotalPages': null,
  'CurrentPage': null,
  'AggregationPayload': null
};

const invalidResponseStructure = {
  'Counters': null,
  'Paiload': null,
  'TotalRecordCount': null, 
  'FilteredRecordCount': null,
  'TotalPages': null,
  'AggregationPayload': null
};

export default data;
export { expected, validResponseStructure, invalidResponseStructure, onlyMicrosoftExpected, page2Expected, simpleRecordsExpected, twentyRecordsExpected };