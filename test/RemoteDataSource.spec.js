import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { expect }from 'chai';
import { expected, validResponseStructure, invalidResponseStructure } from './utils/data.js';
import { invalidColumnsSample, normalizedColumns, validColumnsSample } from './utils/columns.js';

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
        expect(r.payload).to.deep.equal(expectedResponse.payload);
      })
    );

    it('should return a payload 100 records', () => dataSource.getAllRecords(100, 0, '')
      .then(r => {
        expect(r.payload).to.have.lengthOf(100);
      })
    );

    it('should return a payload with records where the CustomerName is equal to Microsoft', () => dataSource.getAllRecords(10, 0, 'Microsoft')
      .then(r => {
        r.payload.forEach(element => {
          expect(element.CustomerName).to.be.equal('Microsoft');
        });
      })
    );

    it('should return a payload with records 11 to 20', () => dataSource.getAllRecords(10, 1, '')
      .then(r => {
        r.payload.forEach( (element, i) => {
          expect(element.OrderID).to.be.equal(i + 11);
        });
      })
    );
  });

  describe('When columns structure is invalid', () => {
    beforeEach(() => {
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', invalidColumnsSample);
    });

    it('throws an Internal Server Error', () => 
      dataSource.getAllRecords(10, 0, '')
        .catch( error => 
          expect(error.response.statusText).to.be.equal('Internal Server Error')
        )
    );
  });

  describe('isValidResponse()', () => {
    beforeEach(() => {
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', invalidColumnsSample);
    });

    it('should return true when expectedStructure is valid', () => {
      expect(dataSource.isValidResponse(validResponseStructure)).to.be.true;
    });

    it('should return false when expectedStructure is invalid', () => {
      expect(dataSource.isValidResponse(invalidResponseStructure)).to.be.false;
    });
  });

  describe('_normalizeColumns()', () => {
    beforeEach(() => {
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', invalidColumnsSample);
    });

    it('should return normalizedColumns with a validColumnsSample', () => {
      expect(dataSource._normalizeColumns(validColumnsSample)).to.deep.equal(normalizedColumns);
    });

    it('should return invalidNormalizedColumns with a invalidColumnsSample', () => {
      expect(dataSource._normalizeColumns(invalidColumnsSample)).to.not.deep.equal(normalizedColumns);
    });
  });
});