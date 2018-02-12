import MockAdapter from 'axios-mock-adapter';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import axios from 'axios';
import { expect }from 'chai';
import { invalidColumnsSample, normalizedColumns, validColumnsSample, request } from './utils/columns.js';
import { invalidResponseStructure, twentyRecordsExpected, validResponseStructure } from './utils/data.js';

describe('RemoteDateSource', () => {
  let dataSource;
  const mock = new MockAdapter(axios);
  const payload = twentyRecordsExpected;

  describe('_normalizeColumns()', () => {
    beforeEach(() => {
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
    });

    it('should return normalizedColumns with a validColumnsSample', () => {
      expect(dataSource._normalizeColumns(validColumnsSample)).to.deep.equal(normalizedColumns);
    });

    it('should return invalidNormalizedColumns with a invalidColumnsSample', () => {
      expect(dataSource._normalizeColumns(invalidColumnsSample)).to.not.deep.equal(normalizedColumns);
    });
  });

  describe('isValidResponse()', () => {
    beforeEach(() => {
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
    });

    it('should return true when expectedStructure is valid', () => {
      expect(dataSource.isValidResponse(validResponseStructure)).to.be.true;
    });

    it('should return false when expectedStructure is invalid', () => {
      expect(dataSource.isValidResponse(invalidResponseStructure)).to.be.false;
    });
  });

  describe('When columns structure is valid', () => {
    beforeEach( () => {
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
  
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', request).reply(200, {
        Counter: payload.Counter,
        Payload: payload.Payload,
        TotalRecordCount: payload.TotalRecordCount, 
        FilteredRecordCount: payload.FilteredRecordCount,
        TotalPages: payload.TotalPages,
        CurrentPage: payload.CurrentPage,
        AggregationPayload: payload.AggregationPayload
      });
    });
  
    it('Should return a payload', done => {
      dataSource.getAllRecords(20, 0, '')
        .then(r => {
          expect(r.payload).to.deep.equal(twentyRecordsExpected.Payload);
          expect(r.filteredRecordCount).to.deep.equal(twentyRecordsExpected.FilteredRecordCount);
          expect(r.totalRecordCount).to.deep.equal(twentyRecordsExpected.TotalRecordCount);
        }).finally( done() );
    });
  });

  describe('When columns structure is invalid', () => {
    beforeEach(() => {
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', invalidColumnsSample);

      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', request).reply(200, {
        Counter: payload.Counter,
        Payload: payload.Payload,
        TotalRecordCount: payload.TotalRecordCount, 
        FilteredRecordCount: payload.FilteredRecordCount,
        TotalPages: payload.TotalPages,
        CurrentPage: payload.CurrentPage,
        AggregationPayload: payload.AggregationPayload
      });
    });

    it('throws an Error 404', () => 
      dataSource.getAllRecords(10, 0, '')
        .catch( error => 
          expect(error.response.status).to.be.equal(404)
        )
    );
  });
});