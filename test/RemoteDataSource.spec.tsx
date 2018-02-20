
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { ColumnSortDirection } from '../src/Grid';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { validColumnsSample } from './Mocks/columns';
import {
  descendingExpected,
  invalidResponseStructure,
  onlyMicrosoftExpected,
  page2Expected,
  simpleRecordsExpected,
  twentyRecordsExpected,
  validResponseStructure
} from './Mocks/data';
import {
  descendingRequest,
  onlyMicrosoftRecordsRequest,
  page2Request,
  simpleRequest,
  twentyRecordsRequest
} from './Mocks/requests';

describe('RemoteDateSource', () => {
  const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
  const mock = new MockAdapter(axios);

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
      beforeEach( () => {
        mock.reset();
        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(200, {
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
      beforeEach( () => {
        mock.reset();
        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(200, {
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
        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(200, {
          ...simpleRecordsExpected
        });

        dataSource.connect(10, 0, '').subscribe((r) => { response = r; });
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
          beforeEach( () => {
            mock.reset();
            mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(200, {
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
          beforeEach( () => {
            mock.reset();
            mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(200, {
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
      });
    });
  });

  describe('When columns structure is invalid', () => {
    beforeEach(() => {
      dataSource =
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
    });

    afterEach(() => {
      mock.reset();
    });

    describe('With an invalid response', () => {
      beforeEach(() => {
        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(200, {
          AggregationPayload: twentyRecordsExpected.AggregationPayload,
          Counter: twentyRecordsExpected.Counter,
          CurrentPage: twentyRecordsExpected.CurrentPage,
          FilteredRecordCount: twentyRecordsExpected.FilteredRecordCount
        });
      });

      it('throws an Error', () => {
        return dataSource.getAllRecords(20, 0, '')
          .catch((error) =>
            expect(error instanceof Error).to.be.equal(true)
          );
        }
      );
    });

    it('throws an Error 400', (done) => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(400);
      dataSource.refresh(20, 0, '');

      setTimeout( () => {
        expect(dataSource.message).to.be.equal('There was a client error');
        done();
      }, 0);
    });

    it('throws an Error 401', (done) => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(401);
      dataSource.refresh(20, 0, '');

      setTimeout( () => {
        expect(dataSource.message).to.be.equal('Authentication is required');
        done();
      }, 0);
    });

    it('throws an Error 403', (done) => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(403);
      dataSource.refresh(20, 0, '');

      setTimeout( () => {
        expect(dataSource.message).to.be.equal('Access Denied/Forbidden');
        done();
      }, 0);
    });

    it('throws an Error 404', (done) => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(404);
      dataSource.refresh(20, 0, '');

      setTimeout( () => {
        expect(dataSource.message).to.be.equal('Keys were not found');
        done();
      }, 0);
    });

    it('throws an Error 500', (done) => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged').reply(500);
      dataSource.refresh(20, 0, '');

      setTimeout( () => {
        expect(dataSource.message).to.be.equal('Internal server error');
        done();
      }, 0);
    });
  });
});
