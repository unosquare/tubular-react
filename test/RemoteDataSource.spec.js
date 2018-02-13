
import MockAdapter from 'axios-mock-adapter';
import * as RemoteDataSource from '../src/Grid/RemoteDataSource';
import axios from 'axios';
import { expect }from 'chai';
import { invalidColumnsSample, validColumnsSample } from './utils/columns.js';
import { invalidResponseStructure, onlyMicrosoftExpected, page2Expected, simpleRecordsExpected, twentyRecordsExpected, validResponseStructure } from './utils/data.js';
import { onlyMicrosoftRecordsRequest, page2Request, simpleRequest, twentyRecordsRequest } from './utils/requests.js';

describe('RemoteDateSource', () => {
  let dataSource;
  const mock = new MockAdapter(axios);

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
    describe('When 20 records are requested', () => {
      beforeEach( () => {
        dataSource = 
          new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', twentyRecordsRequest).reply(200, {
          Counter: twentyRecordsExpected.Counter,
          Payload: twentyRecordsExpected.Payload,
          TotalRecordCount: twentyRecordsExpected.TotalRecordCount, 
          FilteredRecordCount: twentyRecordsExpected.FilteredRecordCount,
          TotalPages: twentyRecordsExpected.TotalPages,
          CurrentPage: twentyRecordsExpected.CurrentPage,
          AggregationPayload: twentyRecordsExpected.AggregationPayload
        });
      });

      it('Should return a payload with 20 records', () => dataSource.getAllRecords(20, 0, '')
        .then(r => {
          expect(r.payload).to.deep.equal(twentyRecordsExpected.Payload);
          expect(r.filteredRecordCount).to.deep.equal(twentyRecordsExpected.FilteredRecordCount);
          expect(r.totalRecordCount).to.deep.equal(twentyRecordsExpected.TotalRecordCount);
          expect(r.payload).to.have.lengthOf(20);
        }));
    });

    describe('When search input is Microsoft', () => {
      beforeEach( () => {
        dataSource = 
          new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', onlyMicrosoftRecordsRequest).reply(200, {
          Counter: onlyMicrosoftExpected.Counter,
          Payload: onlyMicrosoftExpected.Payload,
          TotalRecordCount: onlyMicrosoftExpected.TotalRecordCount, 
          FilteredRecordCount: onlyMicrosoftExpected.FilteredRecordCount,
          TotalPages: onlyMicrosoftExpected.TotalPages,
          CurrentPage: onlyMicrosoftExpected.CurrentPage,
          AggregationPayload: onlyMicrosoftExpected.AggregationPayload
        });
      });

      it('Should return a payload with only Microsoft records', () => dataSource.getAllRecords(10, 0, 'Microsoft')
        .then(r => {
          expect(r.payload).to.deep.equal(onlyMicrosoftExpected.Payload);
          expect(r.filteredRecordCount).to.deep.equal(onlyMicrosoftExpected.FilteredRecordCount);
          expect(r.totalRecordCount).to.deep.equal(onlyMicrosoftExpected.TotalRecordCount);
        }));
    });

    describe('When refresh is called', () => {
      describe('When 10 records are requested', () => {
        beforeEach( () => {
          dataSource = 
            new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

          mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', simpleRequest).reply(200, {
            Counter: simpleRecordsExpected.Counter,
            Payload: simpleRecordsExpected.Payload,
            TotalRecordCount: simpleRecordsExpected.TotalRecordCount, 
            FilteredRecordCount: simpleRecordsExpected.FilteredRecordCount,
            TotalPages: simpleRecordsExpected.TotalPages,
            CurrentPage: simpleRecordsExpected.CurrentPage,
            AggregationPayload: simpleRecordsExpected.AggregationPayload
          });

          dataSource.refresh(10, 0, '');
        });

        it('Should return a payload', done => {
          setTimeout( () => {
            expect(dataSource.dataStream.value.payload).to.deep.equal(simpleRecordsExpected.Payload);
            expect(dataSource.dataStream.value.filteredRecordCount).to.deep.equal(simpleRecordsExpected.FilteredRecordCount);
            expect(dataSource.dataStream.value.totalRecordCount).to.deep.equal(simpleRecordsExpected.TotalRecordCount);
            done();
          }, 0);
        });
      });

      describe('When page 2 is requested', () => {
        beforeEach( () => {
          dataSource = 
            new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

          mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', page2Request).reply(200, {
            Counter: page2Expected.Counter,
            Payload: page2Expected.Payload,
            TotalRecordCount: page2Expected.TotalRecordCount, 
            FilteredRecordCount: page2Expected.FilteredRecordCount,
            TotalPages: page2Expected.TotalPages,
            CurrentPage: page2Expected.CurrentPage,
            AggregationPayload: page2Expected.AggregationPayload
          });

          dataSource.refresh(10, 1, '');
        });

        it('Should return a payload with records 11 to 20', done => {
          setTimeout( () => {
            expect(dataSource.dataStream.value.payload).to.deep.equal(page2Expected.Payload);
            expect(dataSource.dataStream.value.filteredRecordCount).to.deep.equal(page2Expected.FilteredRecordCount);
            expect(dataSource.dataStream.value.totalRecordCount).to.deep.equal(page2Expected.TotalRecordCount);
            done();
          }, 0);
        });
      });
    });

    describe('When connect is called', () => {
      let response;

      beforeEach( () => {
        dataSource = 
          new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', simpleRequest).reply(200, {
          Counter: simpleRecordsExpected.Counter,
          Payload: simpleRecordsExpected.Payload,
          TotalRecordCount: simpleRecordsExpected.TotalRecordCount, 
          FilteredRecordCount: simpleRecordsExpected.FilteredRecordCount,
          TotalPages: simpleRecordsExpected.TotalPages,
          CurrentPage: simpleRecordsExpected.CurrentPage,
          AggregationPayload: simpleRecordsExpected.AggregationPayload
        });

        response = dataSource.connect(10, 0, '');
      });

      it('Should return a payload', done => {
        setTimeout( () => {
          expect(response.value.payload).to.deep.equal(simpleRecordsExpected.Payload);
          expect(response.value.filteredRecordCount).to.deep.equal(simpleRecordsExpected.FilteredRecordCount);
          expect(response.value.totalRecordCount).to.deep.equal(simpleRecordsExpected.TotalRecordCount);
          done();
        }, 0);
      });
    });
  });

  describe('When columns structure is invalid', () => {
    beforeEach(() => {
      dataSource = 
      new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', invalidColumnsSample);

      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', twentyRecordsRequest).reply(200, {
        Counter: twentyRecordsExpected.Counter,
        Payload: twentyRecordsExpected.Payload,
        TotalRecordCount: twentyRecordsExpected.TotalRecordCount, 
        FilteredRecordCount: twentyRecordsExpected.FilteredRecordCount,
        TotalPages: twentyRecordsExpected.TotalPages,
        CurrentPage: twentyRecordsExpected.CurrentPage,
        AggregationPayload: twentyRecordsExpected.AggregationPayload
      });
    });

    describe('When records are requested', () => {
      it('throws an Error 404', () => 
        dataSource.getAllRecords(20, 0, '')
          .catch( error => 
            expect(error.response.status).to.be.equal(404)
          )
      );
    });
  });
});