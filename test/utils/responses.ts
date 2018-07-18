const pageSize20Response = {
  Aggregate: { },
  Counter: 3,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
    {
      OrderID: 1,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300.00
    },
    {
      OrderID: 2,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 9.00
    },
    {
      OrderID: 3,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 4,
      CustomerName: 'Vesta',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    },
    {
      OrderID: 5,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 174.00
    },
    {
      OrderID: 6,
      CustomerName: 'OXXO',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 7,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    },
    {
      OrderID: 8,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 15.00
    },
    {
      OrderID: 9,
      CustomerName: 'OXXO',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 10,
      CustomerName: 'Vesta',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    },
    {
      OrderID: 11,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 16.00
    },
    {
      OrderID: 12,
      CustomerName: 'OXXO',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 13,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    },
    {
      OrderID: 14,
      CustomerName: 'Vesta',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 60.00
    },
    {
      OrderID: 15,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Portland, OR, US',
      Amount: 192.00
    },
    {
      OrderID: 16,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 300.00
    },
    {
      OrderID: 17,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 108.00
    },
    {
      OrderID: 18,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 92.00
    },
    {
      OrderID: 19,
      CustomerName: 'Vesta',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300.00
    },
    {
      OrderID: 20,
      CustomerName: 'OXXO',
      ShippedDate: '2016-11-04T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 78.00
    }
  ],
  TotalPages: 2,
  TotalRecordCount: 22
};

const simpleRecordsExpected = {
  AggregationPayload: { CustomerName: 500 },
  Counter: 0,
  CurrentPage: 1,
  FilteredRecordCount: 500,
  Payload: [
    { Amount: 300,
      CustomerName: 'Microsoft',
      OrderID: 1,
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: '',
      CustomerName: 'Microsoft',
      OrderID: 2,
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: 300,
      CustomerName: 'Microsoft',
      OrderID: 3,
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: '',
      CustomerName: 'Unosquare LLC',
      OrderID: 4,
      ShippedDate: '2016-02-01T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA' },
    { Amount: 92,
      CustomerName: 'Microsoft',
      OrderID: 5,
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: 18,
      CustomerName: 'Unosquare LLC',
      OrderID: 6,
      ShippedDate: '2016-11-06T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA' },
    { Amount: 50,
      CustomerName: 'Unosquare LLC',
      OrderID: 7,
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico' },
    { Amount: 9,
      CustomerName: 'Unosquare LLC',
      OrderID: 8,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Portland, OR, USA'},
    { Amount: 108,
      CustomerName: 'Vesta',
      OrderID: 9,
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: 15,
      CustomerName: 'Unosquare LLC',
      OrderID: 10,
      ShippedDate: '2016-11-05T18:00:00',
      ShipperCity: 'Portland, OR, USA' }
  ],
  TotalPages: 50,
  TotalRecordCount: 500
};

const searcTexthMicrosoftResponse =   {
  Aggregate: {},
  Counter: 1,
  CurrentPage: 1,
  FilteredRecordCount: 5,
  Payload: [
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 1,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 9, CustomerName: 'Microsoft', OrderID: 2,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 16, CustomerName: 'Microsoft', OrderID: 11,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'}
  ],
  TotalPages: 1,
  TotalRecordCount: 22
};

const page2Response = {
  Aggregate: { },
  Counter: 2,
  CurrentPage : 2,
  FilteredRecordCount: 22,
  Payload: [
    {
      OrderID: 11,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 16.00
    },
    {
      OrderID: 12,
      CustomerName: 'OXXO',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 13,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    },
    {
      OrderID: 14,
      CustomerName: 'Vesta',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 60.00
    },
    {
      OrderID: 15,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Portland, OR, US',
      Amount: 192.00
    },
    {
      OrderID: 16,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 300.00
    },
    {
      OrderID: 17,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 108.00
    },
    {
      OrderID: 18,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 92.00
    },
    {
      OrderID: 19,
      CustomerName: 'Vesta',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300.00
    },
    {
      OrderID: 20,
      CustomerName: 'OXXO',
      ShippedDate: '2016-11-04T18:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 78.00
    }
  ],
  TotalPages: 3,
  TotalRecordCount: 22
};

const descendingOrderIdResponse = {
  Aggregate: {},
  Counter: 4,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
    {Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
    ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'},
    {Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
    ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 78, CustomerName: 'OXXO', OrderID: 20,
    ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 19,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'},
    {Amount: 60, CustomerName: 'Vesta', OrderID: 14,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'}
  ],
  TotalPages: 3,
  TotalRecordCount: 22
};

const simpleResponse = {
  Aggregate: { },
  Counter: 0,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
    {
      OrderID: 1,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 300.00
    },
    {
      OrderID: 2,
      CustomerName: 'Microsoft',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA',
      Amount: 9.00
    },
    {
      OrderID: 3,
      CustomerName: 'Unosquare LLC',
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 4,
      CustomerName: 'Vesta',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    },
    {
      OrderID: 5,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 174.00
    },
    {
      OrderID: 6,
      CustomerName: 'OXXO',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 7,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    },
    {
      OrderID: 8,
      CustomerName: 'Super La Playa',
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Leon, GTO, Mexico',
      Amount: 15.00
    },
    {
      OrderID: 9,
      CustomerName: 'OXXO',
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico',
      Amount: 92.00
    },
    {
      OrderID: 10,
      CustomerName: 'Vesta',
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Portland, OR, USA',
      Amount: 300.00
    }
  ],
  TotalPages: 3,
  TotalRecordCount: 22
};

const aggregateCountResponse = {
  Aggregate: {CustomerName: 22},
  Counter: 5,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
    {Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
    ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'},
    {Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
    ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 78, CustomerName: 'OXXO', OrderID: 20,
    ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 19,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'},
    {Amount: 60, CustomerName: 'Vesta', OrderID: 14,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'}
  ],
  TotalPages: 3,
  TotalRecordCount: 22
};

const aggregateSumResponse = {
  Aggregate: {Amount: 3462},
  Counter: 6,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
    {Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
    ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'},
    {Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
    ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 78, CustomerName: 'OXXO', OrderID: 20,
    ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 19,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'},
    {Amount: 60, CustomerName: 'Vesta', OrderID: 14,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'}
  ], 
  TotalPages: 3,
  TotalRecordCount: 22
};

const aggregateAverageResponse = {
  Aggregate: {Amount: 157.36363636363637},
  Counter: 7,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
    {Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
    ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'},
    {Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
    ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 78, CustomerName: 'OXXO', OrderID: 20,
    ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 19,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'},
    {Amount: 60, CustomerName: 'Vesta', OrderID: 14,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'}
  ], 
  TotalPages: 3,
  TotalRecordCount: 22
};

const aggregateDistinctCountResponse = {
  Aggregate: {Amount: 12},
  Counter: 8,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
    {Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
    ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'},
    {Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
    ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 78, CustomerName: 'OXXO', OrderID: 20,
    ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 19,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'},
    {Amount: 60, CustomerName: 'Vesta', OrderID: 14,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'}
  ],
  TotalPages: 3,
  TotalRecordCount: 22
};

const aggregateMaxResponse = {
  Aggregate: {Amount: 300},
  Counter: 9,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
    {Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
    ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'},
    {Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
    ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 78, CustomerName: 'OXXO', OrderID: 20,
    ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 19,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'},
    {Amount: 60, CustomerName: 'Vesta', OrderID: 14,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'}
  ],
  TotalPages: 3,
  TotalRecordCount: 22
};

const aggregateMinResponse = {
  Aggregate: {Amount: 9 },
  Counter: 10,
  CurrentPage: 1,
  FilteredRecordCount: 22,
  Payload: [
    {Amount: 150, CustomerName: 'Tiempo Development', OrderID: 22,
    ShippedDate: '2016-01-04T18:00:00', ShipperCity: 'Monterrey, NL, Mexico'},
    {Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
    ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 78, CustomerName: 'OXXO', OrderID: 20,
    ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 19,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'},
    {Amount: 60, CustomerName: 'Vesta', OrderID: 14,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'}
  ],
  TotalPages: 3,
  TotalRecordCount: 22
};

const pageMinus1Response = {
  Aggregate: {},
  Counter: 11,
  CurrentPage: 0,
  FilteredRecordCount: 22,
  Payload: [
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 1,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 9, CustomerName: 'Microsoft', OrderID: 2,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 92, CustomerName: 'Unosquare LLC', OrderID: 3,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 4,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 174, CustomerName: 'Super La Playa', OrderID: 5,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 92, CustomerName: 'OXXO', OrderID: 6,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Super La Playa', OrderID: 7,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 15, CustomerName: 'Super La Playa', OrderID: 8,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 92, CustomerName: 'OXXO', OrderID: 9,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 10,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 16, CustomerName: 'Microsoft', OrderID: 11,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 92, CustomerName: 'OXXO', OrderID: 12,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 300, CustomerName: 'Unosquare LLC', OrderID: 13,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 60,  CustomerName: 'Vesta', OrderID: 14,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 192, CustomerName: 'Super La Playa', OrderID: 15,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Portland, OR, US'},
    {Amount: 300, CustomerName: 'Microsoft', OrderID: 16,
    ShippedDate: '2016-03-19T19:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 108, CustomerName: 'Unosquare LLC', OrderID: 17,
    ShippedDate: '2016-04-23T10:00:00', ShipperCity: 'Leon, GTO, Mexico'},
    {Amount: 92, CustomerName: 'Microsoft', OrderID: 18,
    ShippedDate: '2016-12-22T08:00:00', ShipperCity: 'Los Angeles, CA, USA'},
    {Amount: 300, CustomerName: 'Vesta', OrderID: 19,
    ShippedDate: '2016-11-08T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'},
    {Amount: 78, CustomerName: 'OXXO', OrderID: 20,
    ShippedDate: '2016-11-04T18:00:00', ShipperCity: 'Portland, OR, USA'},
    {Amount: 100, CustomerName: 'Wizeline', OrderID: 21,
    ShippedDate: '2015-11-04T18:00:00', ShipperCity: 'Guadalajara, JAL, Mexico'}
],
TotalPages: 1,
TotalRecordCount: 22
};

export {
  aggregateAverageResponse,
  aggregateCountResponse,
  aggregateDistinctCountResponse,
  aggregateMaxResponse,
  aggregateMinResponse,
  aggregateSumResponse,
  descendingOrderIdResponse,
  simpleResponse,
  searcTexthMicrosoftResponse,
  pageMinus1Response,
  page2Response,
  simpleRecordsExpected,
  pageSize20Response,
};
