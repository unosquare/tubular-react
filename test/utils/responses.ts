import { GridResponse } from 'tubular-common';

const simpleRecordsExpected = new GridResponse(0);
simpleRecordsExpected.AggregationPayload = { CustomerName: 500 };
simpleRecordsExpected.CurrentPage = 1;
simpleRecordsExpected.FilteredRecordCount = 500;
simpleRecordsExpected.Payload = [
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
];
simpleRecordsExpected.TotalPages = 50;
simpleRecordsExpected.TotalRecordCount = 500;

export { simpleRecordsExpected };
