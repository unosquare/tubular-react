
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { ColumnSortDirection } from '../src/DataGrid';
import RemoteDataSource from '../src/DataGrid/RemoteDataSource';
import { validColumnsSample } from './utils/columns';
import {
  descendingExpected,
  invalidResponseStructure,
  onlyMicrosoftExpected,
  page2Expected,
  simpleRecordsExpected,
  twentyRecordsExpected,
  validResponseStructure
} from './utils/data';

const mock = new MockAdapter(axios);

describe('RemoteDateSource', () => {
  const dataSource = new RemoteDataSource('url', validColumnsSample);

  describe('isValidResponse()', () => {
    it('should return true when expectedStructure is valid', () => {
      expect(dataSource.isValidResponse(validResponseStructure)).to.be.equal(true);
    });

    it('should return false when expectedStructure is invalid', () => {
      expect(dataSource.isValidResponse(invalidResponseStructure)).to.be.equal(false);
    });
  });

  describe('When columns structure is valid', () => {
    describe('When 20 records are requested', () => {
      before( () => {
        mock.reset();
        mock.onPost('url').reply(200, {
          ...twentyRecordsExpected
        });
      });

      it('Should return a payload with 20 records', () => {
         return dataSource.getAllRecords(20, 0, '').then((e: any) => {
            expect(e.Payload).to.have.lengthOf(20);
         });
      });
    });

    describe('When search input is Microsoft', () => {
      before( () => {
        mock.reset();
        mock.onPost('url').reply(200, {
          ...onlyMicrosoftExpected
        });
      });

      it('Should return a payload with only Microsoft records', () => dataSource.getAllRecords(10, 0, 'Microsoft')
        .then((r: any) => {
          expect(r.Payload).to.deep.equal(onlyMicrosoftExpected.Payload);
          expect(r.FilteredRecordCount).to.deep.equal(onlyMicrosoftExpected.FilteredRecordCount);
          expect(r.TotalRecordCount).to.deep.equal(onlyMicrosoftExpected.TotalRecordCount);
        }));
    });

    describe('When connect is called', () => {
      describe('When the response is invalid', () => {
        let response;

        before( () => {
          mock.reset();
          mock.onPost('url').reply(200, {
            ...simpleRecordsExpected
          });
        });

        it('Should return a payload', (done) => {
          dataSource.connect(10, 0, '')
            .skip(1).subscribe((r) => {
              expect(r.Payload).to.deep.equal(simpleRecordsExpected.Payload);
              expect(r.FilteredRecordCount).to.deep.equal(simpleRecordsExpected.FilteredRecordCount);
              expect(r.TotalRecordCount).to.deep.equal(simpleRecordsExpected.TotalRecordCount);
              /* console.log(dataSource.dataStream); */
              done();
            }, (error: any) => {
              response = error;
              done();
            });
        });
      });

      describe('When the response is invalid', () => {
        const dtSource = new RemoteDataSource('url', validColumnsSample);

        before( () => {
          mock.reset();
          mock.onPost('url').reply(200, {
            AggregationPayload: simpleRecordsExpected.AggregationPayload,
            Counter: simpleRecordsExpected.Counter,
            CurrentPage: simpleRecordsExpected.CurrentPage,
            FilteredRecordCount: simpleRecordsExpected.FilteredRecordCount
          });
        });

        it('Should throw an error', (done) => {
          dtSource.connect(10, 0, '')
            .subscribe((r) => r, (error: any) => {
              expect(error.message).to.be.equal('It\'s not a valid Tubular response object');
              done();
            });
        });
      });
    });
  });
});
