// Mock for unit test when page is set to 1 (Page 2)

const expectedPayloadPage2 = [ 
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
];

// Mock for unit test when sorting is descending

const expectedPayloadDescSortByOrderID = [ 
  { 
    OrderID: 500,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-02T18:00:00' 
  },
  { 
    OrderID: 499,
    CustomerName: 'Oxxo',
    ShippedDate: '2016-11-11T18:00:00' 
  },
  { 
    OrderID: 498,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00' 
  },
  { 
    OrderID: 497,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-11-03T18:00:00' 
  },
  { 
    OrderID: 496,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-05T18:00:00' 
  },
  { 
    OrderID: 495,
    CustomerName: 'Oxxo',
    ShippedDate: '2016-11-10T18:00:00' 
  },
  { 
    OrderID: 494,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-03T18:00:00' 
  },
  { 
    OrderID: 493,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-11T18:00:00' 
  },
  { 
    OrderID: 492,
    CustomerName: 'Oxxo',
    ShippedDate: '2016-11-09T18:00:00' 
  },
  { 
    OrderID: 491,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-02T18:00:00' 
  } 
];

// Mocks for unit tests for numeric columns

const expectedPayloadNone_numeric = [ 
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
];

const expectedPayloadEquals_numeric = [ 
  { OrderID: 9,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-07T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 108 
  } 
];

const expectedPayloadBetween_numeric = [ 
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
  } 
];

const expectedPayloadGte_numeric = [ 
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
  },
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
  } 
];

const expectedPayloadGt_numeric = [ 
  { 
    OrderID: 10,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-05T18:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 15 
  },
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
  } 
];

const expectedPayloadLte_numeric = [ 
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
  } 
];

const expectedPayloadLt_numeric = [ 
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
    OrderID: 4,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-02-01T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: undefined 
  } 
];

// Mocks for unit tests for string columns

const expectedPayloadNone_string = [ 
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
];

const expectedPayloadEquals_string = [ 
  { 
    OrderID: 4,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-02-01T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: undefined 
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
    OrderID: 10,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-05T18:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 15 
  },
  { 
    OrderID: 11,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-11T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 60 
  },
  { 
    OrderID: 15,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 78 
  },
  { 
    OrderID: 21,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-11T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 70 
  },
  { 
    OrderID: 22,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-03T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 17 
  },
  { 
    OrderID: 25,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 34 
  } 
];

const expectedPayloadContains_string = [ 
  { 
    OrderID: 9,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-07T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 108 
  },
  { 
    OrderID: 12,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-09T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 174 
  },
  { 
    OrderID: 14,
    CustomerName: 'Advanced Technology Systems',
    ShippedDate: '2016-11-09T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: undefined 
  },
  { 
    OrderID: 23,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-07T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 95 
  },
  { 
    OrderID: 28,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 60 
  },
  { 
    OrderID: 29,
    CustomerName: 'Advanced Technology Systems',
    ShippedDate: '2016-11-10T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 54 
  },
  { 
    OrderID: 32,
    CustomerName: 'Advanced Technology Systems',
    ShippedDate: '2016-11-04T18:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 225 
  },
  { 
    OrderID: 38,
    CustomerName: 'Advanced Technology Systems',
    ShippedDate: '2016-11-09T18:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 7 
  },
  { 
    OrderID: 42,
    CustomerName: 'Advanced Technology Systems',
    ShippedDate: '2016-11-09T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: undefined 
  },
  { 
    OrderID: 46,
    CustomerName: 'Advanced Technology Systems',
    ShippedDate: '2016-11-07T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 128 
  } 
];

const expectedPayloadNotEquals_string = [ 
  { 
    OrderID: 4,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-02-01T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: undefined 
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
  },
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
  } 
];

const expectedPayloadStartsWith_string = [ 
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
];

const expectedPayloadNotStartsWith_string = [ 
  { 
    OrderID: 4,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-02-01T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: undefined 
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
  },
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
  } 
];

const expectedPayloadEndsWith_string = [ 
  { 
    OrderID: 9,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-07T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 108 
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
    OrderID: 16,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 41 
  },
  { 
    OrderID: 23,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-07T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 95 
  },
  { 
    OrderID: 24,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-11-05T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 3 
  },
  { 
    OrderID: 28,
    CustomerName: 'Vesta',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 60 
  },
  { 
    OrderID: 31,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-11-11T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 39 
  },
  { 
    OrderID: 34,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-11-09T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 8 
  },
  { 
    OrderID: 36,
    CustomerName: 'Super La Playa',
    ShippedDate: '2016-11-11T18:00:00',
    ShipperCity: 'Leon, GTO, Mexico',
    Amount: 163 
  } 
];

const expectedPayloadNotEndsWith_string = [ 
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
    OrderID: 10,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-05T18:00:00',
    ShipperCity: 'Portland, OR, USA',
    Amount: 15 
  },
  { 
    OrderID: 11,
    CustomerName: 'Unosquare LLC',
    ShippedDate: '2016-11-11T18:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 60 
  } 
];

export {
  expectedPayloadDescSortByOrderID,
  expectedPayloadNone_numeric,
  expectedPayloadEquals_numeric,
  expectedPayloadBetween_numeric,
  expectedPayloadGte_numeric,
  expectedPayloadGt_numeric,
  expectedPayloadLte_numeric,
  expectedPayloadLt_numeric,
  expectedPayloadPage2, 
  expectedPayloadNone_string, 
  expectedPayloadContains_string, 
  expectedPayloadEquals_string, 
  expectedPayloadNotEquals_string, 
  expectedPayloadStartsWith_string,
  expectedPayloadNotStartsWith_string,
  expectedPayloadEndsWith_string,
  expectedPayloadNotEndsWith_string
};