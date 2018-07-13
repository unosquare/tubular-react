import GridResponse from "../../src/Models/GridResponse";

const pageSize20Response = {
  Aggregate: { },
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
  TotalRecordCount: 22
};

const page2Response = {
  Aggregate: { },
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
  TotalRecordCount: 22
};

const desendingOrderIdResponse = {
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
  Aggregate: { },
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
  TotalRecordCount: 22
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
  desendingOrderIdResponse,
  simpleResponse,
  invalidResponseStructure,
  searcTexthMicrosoftResponse,
  page2Response,
  simpleRecordsExpected,
  pageSize20Response,
  validResponseStructure
};
