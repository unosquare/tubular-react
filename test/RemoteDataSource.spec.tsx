
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
import {
  descendingRequest,
  onlyMicrosoftRecordsRequest,
  page2Request,
  simpleRequest,
  twentyRecordsRequest
} from './utils/requests';

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
      let response;

      before( () => {
        mock.reset();
        mock.onPost('url').reply(200, {
          ...simpleRecordsExpected
        });

        dataSource.connect(10, 0, '')
          .subscribe((r) => {
            response = r;
          }, (error: any) => {
            response = error;
          });
      });

      it('Should return a payload', (done) => {
        setTimeout( () => {
          expect(response.Payload).to.deep.equal(simpleRecordsExpected.Payload);
          expect(response.FilteredRecordCount).to.deep.equal(simpleRecordsExpected.FilteredRecordCount);
          expect(response.TotalRecordCount).to.deep.equal(simpleRecordsExpected.TotalRecordCount);
          done();
        }, 0);
      });

      describe('When refresh is called', () => {
        describe('When page 2 is requested', () => {
          before( () => {
            mock.reset();
            mock.onPost('url').reply(200, {
              ...page2Expected
            });

            dataSource.refresh(10, 1, '');
          });

          it('Should return a payload with records 11 to 20', (done) => {
            setTimeout( () => {
              expect(response.Payload).to.deep.equal(page2Expected.Payload);
              expect(response.FilteredRecordCount).to.deep.equal(page2Expected.FilteredRecordCount);
              expect(response.TotalRecordCount).to.deep.equal(page2Expected.TotalRecordCount);
              done();
            }, 0);
          });
        });

        describe('When sort order is descending', () => {
          before( () => {
            mock.reset();
            mock.onPost('url').reply(200, {
              ...descendingExpected
            });
            dataSource.columns[0].SortDirection = ColumnSortDirection.DESCENDING;
            dataSource.refresh(10, 0, '');
          });

          it('Should return a payload with records in descending order', (done) => {
            setTimeout( () => {
              expect(response.Payload).to.deep.equal(descendingExpected.Payload);
              expect(response.FilteredRecordCount).to.deep.equal(descendingExpected.FilteredRecordCount);
              expect(response.TotalRecordCount).to.deep.equal(descendingExpected.TotalRecordCount);
              done();
            }, 0);
          });
        });

        describe('When the response is invalid', () => {
          before( () => {
            mock.reset();
            mock.onPost('url').reply(200, {
              AggregationPayload: simpleRecordsExpected.AggregationPayload,
              Counter: simpleRecordsExpected.Counter,
              CurrentPage: simpleRecordsExpected.CurrentPage,
              FilteredRecordCount: simpleRecordsExpected.FilteredRecordCount
            });

            dataSource.refresh(10, 0, '');
          });

          it('Should throw an error', (done) => {
            setTimeout( () => {
              expect(response.message).to.deep.equal('It\'s not a valid Tubular response object');
              done();
            }, 0);
          });
        });
      });
    });
  });
});
