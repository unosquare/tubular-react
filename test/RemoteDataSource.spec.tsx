
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
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
  let dataSource;
  const mock = new MockAdapter(axios);

  describe('isValidResponse()', () => {
    beforeEach(() => {
      dataSource =
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
    });

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
        dataSource =
          new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', twentyRecordsRequest).reply(200, {
          AggregationPayload: twentyRecordsExpected.AggregationPayload,
          Counter: twentyRecordsExpected.Counter,
          CurrentPage: twentyRecordsExpected.CurrentPage,
          FilteredRecordCount: twentyRecordsExpected.FilteredRecordCount,
          Payload: twentyRecordsExpected.Payload,
          TotalPages: twentyRecordsExpected.TotalPages,
          TotalRecordCount: twentyRecordsExpected.TotalRecordCount
        });
      });

      it('Should return a payload with 20 records', () => {
        return dataSource.getAllRecords(20, 0, '')
          .then((r) => {
            expect(r.Payload).to.deep.equal(twentyRecordsExpected.Payload);
            expect(r.FilteredRecordCount).to.deep.equal(twentyRecordsExpected.FilteredRecordCount);
            expect(r.TotalRecordCount).to.deep.equal(twentyRecordsExpected.TotalRecordCount);
            expect(r.Payload).to.have.lengthOf(20);
          });
      });
    });

    describe('When search input is Microsoft', () => {
      beforeEach( () => {
        dataSource =
          new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', onlyMicrosoftRecordsRequest).reply(200, {
          AggregationPayload: onlyMicrosoftExpected.AggregationPayload,
          Counter: onlyMicrosoftExpected.Counter,
          CurrentPage: onlyMicrosoftExpected.CurrentPage,
          FilteredRecordCount: onlyMicrosoftExpected.FilteredRecordCount,
          Payload: onlyMicrosoftExpected.Payload,
          TotalPages: onlyMicrosoftExpected.TotalPages,
          TotalRecordCount: onlyMicrosoftExpected.TotalRecordCount
        });
      });

      it('Should return a payload with only Microsoft records', () => dataSource.getAllRecords(10, 0, 'Microsoft')
        .then((r) => {
          expect(r.Payload).to.deep.equal(onlyMicrosoftExpected.Payload);
          expect(r.FilteredRecordCount).to.deep.equal(onlyMicrosoftExpected.FilteredRecordCount);
          expect(r.TotalRecordCount).to.deep.equal(onlyMicrosoftExpected.TotalRecordCount);
        }));
    });

    describe('When connect is called', () => {
      let response;

      beforeEach( () => {
        dataSource =
          new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

        mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', simpleRequest).reply(200, {
          AggregationPayload: simpleRecordsExpected.AggregationPayload,
          Counter: simpleRecordsExpected.Counter,
          CurrentPage: simpleRecordsExpected.CurrentPage,
          FilteredRecordCount: simpleRecordsExpected.FilteredRecordCount,
          Payload: simpleRecordsExpected.Payload,
          TotalPages: simpleRecordsExpected.TotalPages,
          TotalRecordCount: simpleRecordsExpected.TotalRecordCount
        });

        dataSource.connect(10, 0, '').subscribe((r) => { response = r; });
      });

      afterEach(() => {
        mock.reset();
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
            mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', page2Request).reply(200, {
              AggregationPayload: page2Expected.AggregationPayload,
              Counter: page2Expected.Counter,
              CurrentPage: page2Expected.CurrentPage,
              FilteredRecordCount: page2Expected.FilteredRecordCount,
              Payload: page2Expected.Payload,
              TotalPages: page2Expected.TotalPages,
              TotalRecordCount: page2Expected.TotalRecordCount
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
            mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', descendingRequest).reply(200, {
              AggregationPayload: descendingExpected.AggregationPayload,
              Counter: descendingExpected.Counter,
              CurrentPage: descendingExpected.CurrentPage,
              FilteredRecordCount: descendingExpected.FilteredRecordCount,
              Payload: descendingExpected.Payload,
              TotalPages: descendingExpected.TotalPages,
              TotalRecordCount: descendingExpected.TotalRecordCount,
            });
            dataSource.columns[0].SortDirection = 'Descending';
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
