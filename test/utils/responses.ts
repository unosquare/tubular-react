
const twentyRecordsExpected = {
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
      ShipperCity: 'Guadalajara, JAL, Mexico'},
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
      ShipperCity: 'Portland, OR, USA' },
    { Amount: 108,
      CustomerName: 'Vesta',
      OrderID: 9,
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: 15,
      CustomerName: 'Unosquare LLC',
      OrderID: 10,
      ShippedDate: '2016-11-05T18:00:00',
      ShipperCity: 'Portland, OR, USA' },
    { Amount: 60,
      CustomerName: 'Unosquare LLC',
      OrderID: 11,
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: 174,
      CustomerName: 'Vesta',
      OrderID: 12,
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico' },
    { Amount: 16,
      CustomerName: 'Super La Playa',
      OrderID: 13,
      ShippedDate: '2016-11-04T18:00:00',
      ShipperCity: 'Portland, OR, USA' },
    { Amount: '',
      CustomerName: 'Advanced Technology Systems',
      OrderID: 14,
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico' },
    { Amount: 78,
      CustomerName: 'Unosquare LLC',
      OrderID: 15,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico' },
    { Amount: 41,
      CustomerName: 'Super La Playa',
      OrderID: 16,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: '',
      CustomerName: 'Microsoft',
      OrderID: 17,
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: 64,
      CustomerName: 'Microsoft',
      OrderID: 18,
      ShippedDate: '2016-11-03T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' },
    { Amount: 25,
      CustomerName: 'Oxxo',
      OrderID: 19,
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA' },
    { Amount: 3,
      CustomerName: 'Microsoft',
      OrderID: 20,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico' }
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

const onlyMicrosoftExpected = {
  AggregationPayload: { CustomerName: 500 },
  Counter: 0,
  CurrentPage: 1,
  FilteredRecordCount: 500,
  Payload: [
    {
      Amount: 300,
      CustomerName: 'Microsoft',
      OrderID: 1,
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: '',
      CustomerName: 'Microsoft',
      OrderID: 2,
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 300,
      CustomerName: 'Microsoft',
      OrderID: 3,
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 92,
      CustomerName: 'Microsoft',
      OrderID: 5,
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: '',
      CustomerName: 'Microsoft',
      OrderID: 17,
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 64,
      CustomerName: 'Microsoft',
      OrderID: 18,
      ShippedDate: '2016-11-03T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 3,
      CustomerName: 'Microsoft',
      OrderID: 20,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 56,
      CustomerName: 'Microsoft',
      OrderID: 26,
      ShippedDate: '2016-11-04T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA'
    },
    {
      Amount: '',
      CustomerName: 'Microsoft',
      OrderID: 33,
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico'
    },
    {
      Amount: 16,
      CustomerName: 'Microsoft',
      OrderID: 35,
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Portland, OR, USA'
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
  Payload: [
    {
      Amount: 60,
      CustomerName: 'Unosquare LLC',
      OrderID: 11,
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 174,
      CustomerName: 'Vesta',
      OrderID: 12,
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico'
    },
    {
      Amount: 16,
      CustomerName: 'Super La Playa',
      OrderID: 13,
      ShippedDate: '2016-11-04T18:00:00',
      ShipperCity: 'Portland, OR, USA'
    },
    {
      Amount: '',
      CustomerName: 'Advanced Technology Systems',
      OrderID: 14,
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico'
    },
    {
      Amount: 78,
      CustomerName: 'Unosquare LLC',
      OrderID: 15,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico'
    },
    {
      Amount: 41,
      CustomerName: 'Super La Playa',
      OrderID: 16,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: '',
      CustomerName: 'Microsoft',
      OrderID: 17,
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 64,
      CustomerName: 'Microsoft',
      OrderID: 18,
      ShippedDate: '2016-11-03T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 25,
      CustomerName: 'Oxxo',
      OrderID: 19,
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA'
    },
    {
      Amount: 3,
      CustomerName: 'Microsoft',
      OrderID: 20,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    }
  ],
  TotalPages: 50,
  TotalRecordCount: 500
};

const descendingExpected = {
  AggregationPayload: { CustomerName: 500 },
  Counter: 0,
  CurrentPage: 1,
  FilteredRecordCount: 500,
  Payload: [
    {
      Amount: 120,
      CustomerName: 'Vesta',
      OrderID: 500,
      ShippedDate: '2016-11-02T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA'
    },
    {
      Amount: 66,
      CustomerName: 'Oxxo',
      OrderID: 499,
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Portland, OR, USA'
    },
    {
      Amount: 6,
      CustomerName: 'Unosquare LLC',
      OrderID: 498,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Portland, OR, USA'
    },
    {
      Amount: 79,
      CustomerName: 'Microsoft',
      OrderID: 497,
      ShippedDate: '2016-11-03T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA'
    },
    {
      Amount: 72,
      CustomerName: 'Vesta',
      OrderID: 496,
      ShippedDate: '2016-11-05T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 20,
      CustomerName: 'Oxxo',
      OrderID: 495,
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 35,
      CustomerName: 'Vesta',
      OrderID: 494,
      ShippedDate: '2016-11-03T18:00:00',
      ShipperCity: 'Portland, OR, USA'
    },
    {
      Amount: 118,
      CustomerName: 'Vesta',
      OrderID: 493,
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico'
    },
    {
      Amount: 110,
      CustomerName: 'Oxxo',
      OrderID: 492,
      ShippedDate: '2016-11-09T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA'
    },
    {
      Amount: 108,
      CustomerName: 'Unosquare LLC',
      OrderID: 491,
      ShippedDate: '2016-11-02T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA'
    }
  ],
  TotalPages: 50,
  TotalRecordCount: 500
};

const simpleResponse = {
  aggregate: { CustomerName: 500 },
  filteredRecordCount: 500,
  payload: [
    {
      Amount: 300,
      CustomerName: 'Microsoft',
      OrderID: 1,
      ShippedDate: '2016-03-19T19:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: '',
      CustomerName: 'Microsoft',
      OrderID: 2,
      ShippedDate: '2016-04-23T10:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 300,
      CustomerName: 'Microsoft',
      OrderID: 3,
      ShippedDate: '2016-12-22T08:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: '',
      CustomerName: 'Unosquare LLC',
      OrderID: 4,
      ShippedDate: '2016-02-01T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA'
    },
    {
      Amount: 92,
      CustomerName: 'Microsoft',
      OrderID: 5,
      ShippedDate: '2016-11-10T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 18,
      CustomerName: 'Unosquare LLC',
      OrderID: 6,
      ShippedDate: '2016-11-06T18:00:00',
      ShipperCity: 'Los Angeles, CA, USA'
    },
    {
      Amount: 50,
      CustomerName: 'Unosquare LLC',
      OrderID: 7,
      ShippedDate: '2016-11-11T18:00:00',
      ShipperCity: 'Leon, GTO, Mexico'
    },
    {
      Amount: 9,
      CustomerName: 'Unosquare LLC',
      OrderID: 8,
      ShippedDate: '2016-11-08T18:00:00',
      ShipperCity: 'Portland, OR, USA'
    },
    {
      Amount: 108,
      CustomerName: 'Vesta',
      OrderID: 9,
      ShippedDate: '2016-11-07T18:00:00',
      ShipperCity: 'Guadalajara, JAL, Mexico'
    },
    {
      Amount: 15,
      CustomerName: 'Unosquare LLC',
      OrderID: 10,
      ShippedDate: '2016-11-05T18:00:00',
      ShipperCity: 'Portland, OR, USA'
    }
  ],
  rowsPerPage: 10,
  searchText: '',
  totalRecordCount: 500
};

const validResponseStructure = {
  AggregationPayload: null,
  Counter: null,
  CurrentPage: null,
  FilteredRecordCount: null,
  Payload: null,
  TotalPages: null,
  TotalRecordCount: null
};

const invalidResponseStructure = {
  AggregationPayload: null,
  Counters: null,
  FilteredRecordCount: null,
  Paiload: null,
  TotalPages: null,
  TotalRecordCount: null
};

export {
  descendingExpected,
  simpleResponse,
  invalidResponseStructure,
  onlyMicrosoftExpected,
  page2Expected,
  simpleRecordsExpected,
  twentyRecordsExpected,
  validResponseStructure
};
