import RemoteDataSource from '../src/Grid/RemoteDataSource';
import expect from 'expect.js';
import { expected } from './utils/data.js';
import { invalidColumnsSample, validColumnsSample } from './utils/columns.js';

describe('RemoteDateSource', () => {
  let expectedResponse;
  let dataSource;
  
  describe('When columns structure is valid', () => {
    beforeEach(() => {
      expectedResponse = expected;
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
    });

    it('should return a payload', () => dataSource.getAllRecords(10, 0, '')
      .then(r => {
        expect(JSON.stringify(r.payload)).to.be(JSON.stringify(expectedResponse.payload));
      })
    );

    it('should return a payload 100 records', () => dataSource.getAllRecords(100, 0, '')
      .then(r => {
        expect(r.payload).to.have.length(100);
      })
    );

    it('should return a payload with records where the CustomerName is equal to Microsoft', () => dataSource.getAllRecords(10, 0, 'Microsoft')
      .then(r => {
        r.payload.forEach(element => {
          expect(element.CustomerName).to.be('Microsoft');
        });
      })
    );

    it('should return a payload with records 11 to 20', () => dataSource.getAllRecords(10, 1, '')
      .then(r => {
        r.payload.forEach( (element, i) => {
          expect(element.OrderID).to.be(i + 11);
        });
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