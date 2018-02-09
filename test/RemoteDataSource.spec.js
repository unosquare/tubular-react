import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { expect }from 'chai';
import { expected, invalidResponseStructure, validResponseStructure } from './utils/data.js';
import { invalidColumnsSample, normalizedColumns, validColumnsSample } from './utils/columns.js';

describe('RemoteDateSource', () => {
  let dataSource;
  let mock;
  let axiosInstance; 

  describe('When columns structure is valid', () => {
    beforeEach(() => {
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
    });

    it('should return a payload', () => dataSource.getAllRecords(10, 0, '')
      .then(r => {
        expect(r.payload).to.deep.equal(expected.payload);
        expect(r.filteredRecordCount).to.deep.equal(expected.filteredRecordCount);
        expect(r.totalRecordCount).to.deep.equal(expected.totalRecordCount);
        expect(r.aggregate).to.deep.equal(expected.aggregate);
        expect(r.searchText).to.deep.equal(expected.searchText);
        expect(r.rowsPerPage).to.deep.equal(expected.rowsPerPage);
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
  
  describe('refresh()', () => {
    beforeEach(done => setTimeout( () => {  
      dataSource.refresh(100, 0, '');
      done();
    }, 300));

    it('should return a payload with 100 records', done => setTimeout( () => {
      expect(dataSource.dataStream.value.payload).to.have.lengthOf(100);
      done();
    }, 300));
  });

  describe('search()', () => {
    beforeEach(done => setTimeout( () => {  
      dataSource.search(10, 0, 'Microsoft');
      done();
    }, 300));

    it('should return a payload with records where the CustomerName is equal to Microsoft', done => setTimeout( () => {
      dataSource.dataStream.value.payload.forEach(element => {
        expect(element.CustomerName).to.be.equal('Microsoft');
      });
      done();
    }, 300));
  });

  beforeEach(() => {
    axiosInstance = Axios.create();
    mock = new MockAdapter(axiosInstance);
    mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { validColumnsSample }).reply(200);
    dataSource = 
      new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
    dataSource.connect(10, 0, '')
      .subscribe();
  });
});