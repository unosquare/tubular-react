import RemoteDataSource from '../src/Grid/RemoteDataSource';
import expect from 'expect.js';
import { invalidColumnsSample, validColumnsSample } from './utils/columns.js';

describe('RemoteDateSource', () => {
  const expected = { 
    payload: [ 
      { OrderID: 500,
        CustomerName: 'Vesta',
        ShippedDate: '2016-11-02T18:00:00',
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 120 },
      { OrderID: 499,
        CustomerName: 'Oxxo',
        ShippedDate: '2016-11-11T18:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 66 },
      { OrderID: 498,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 6 },
      { OrderID: 497,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-11-03T18:00:00',
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 79 },
      { OrderID: 496,
        CustomerName: 'Vesta',
        ShippedDate: '2016-11-05T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 72 },
      { OrderID: 495,
        CustomerName: 'Oxxo',
        ShippedDate: '2016-11-10T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico',
        Amount: 20 },
      { OrderID: 494,
        CustomerName: 'Vesta',
        ShippedDate: '2016-11-03T18:00:00',
        ShipperCity: 'Portland, OR, USA',
        Amount: 35 },
      { OrderID: 493,
        CustomerName: 'Vesta',
        ShippedDate: '2016-11-11T18:00:00',
        ShipperCity: 'Leon, GTO, Mexico',
        Amount: 118 },
      { OrderID: 492,
        CustomerName: 'Oxxo',
        ShippedDate: '2016-11-09T18:00:00',
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 110 },
      { OrderID: 491,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-11-02T18:00:00',
        ShipperCity: 'Los Angeles, CA, USA',
        Amount: 108 } 
    ]
  };

  let expectedResponse;
  let dataSource;
  
  describe('When columns structure is valid', () => {
    beforeEach(() => {
      expectedResponse = expected;
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
    });

    it('should return 10 records', () => dataSource.getAllRecords(10, 0, '')
      .then(r => {
        expect(JSON.stringify(r.payload)).to.be(JSON.stringify(expectedResponse.payload));
      })
    );
  });
  
  describe('When columns structure is invalid', () => {
    beforeEach(() => {
      expectedResponse = expected;
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', invalidColumnsSample);
    });

    it('throws an Internal Server Error', () => 
      dataSource.getAllRecords(10, 0, '')
        .then(r => {
          expect(JSON.stringify(r.payload)).to.be(JSON.stringify(expectedResponse.payload));
        }).catch( error => 
          expect(error.response.statusText).to.be('Internal Server Error')
        )
    );
  });
});