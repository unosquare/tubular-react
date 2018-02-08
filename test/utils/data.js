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
  ]
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
export { expected, validResponseStructure, invalidResponseStructure };