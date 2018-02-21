import { expect } from 'chai';
import LocalDataSource from '../src/Grid/LocalDataSource';
import {
  validColumnsSample,
  validColumnsSampleDescending,
  validColumnsSampleMultipleSorting
} from './utils/columns';
import {
  expected
} from './utils/data';
import localData from './utils/localData';
import {
  expectedLocaDataSourcelResponse,
  expectedPayloadBetweenNumeric,
  expectedPayloadContainsString,
  expectedPayloadDescSortByOrderID,
  expectedPayloadEndsWithString,
  expectedPayloadEqualsNumeric,
  expectedPayloadEqualsString,
  expectedPayloadGteNumeric,
  expectedPayloadGtNumeric,
  expectedPayloadLteNumeric,
  expectedPayloadLtNumeric,
  expectedPayloadMultipleSort,
  expectedPayloadNoneNumeric,
  expectedPayloadNoneString,
  expectedPayloadNotEndsWithString,
  expectedPayloadNotEqualsString,
  expectedPayloadNotStartsWithString,
  expectedPayloadPage2,
  expectedPayloadStartsWithString,
  expectedPayloadTextSearchVesta,
} from './utils/LocalDataSourceMocks';

describe('LocalDataSource', () => {
  describe('getAllRecords()', () => {
    it('should return a payload', (done) => {
      const dataSource = new LocalDataSource(localData, validColumnsSample);

      dataSource.getAllRecords(10, 0, '').then((response) => {
        expect(response.Payload).to.deep.equal(expectedLocaDataSourcelResponse.Payload);
        done();
      });
    });

    it('should return 10 records', (done) => {
      const dataSource = new LocalDataSource(localData, validColumnsSample);

      dataSource.getAllRecords(10, 0, '').then((response) => {
        expect(response.Payload).to.have.lengthOf(10);
        done();
      });
    });

    // Pager
    it('should return a payload with the following 10 records when page is set to 1', (done) => {
      const dataSource = new LocalDataSource(localData, validColumnsSample);

      dataSource.getAllRecords(10, 1, '').then((response) => {
        expect(response.Payload).to.deep.equal(expectedPayloadPage2);
        done();
      });
    });

    // Sorting
    it('should return a payload with records in descending order (sorting by \'OrderID\')', (done) => {
      const dataSource = new LocalDataSource(localData, validColumnsSampleDescending);

      dataSource.getAllRecords(10, 0, '').then((response) => {
        expect(response.Payload).to.deep.equal(expectedPayloadDescSortByOrderID);
        done();
      });
    });

    it('should return a payload with records that has multiple sorting (sorting by \'OrderID\' and \'CustomerName\')', (done) => {
      const dataSource = new LocalDataSource(localData, validColumnsSampleMultipleSorting);

      dataSource.getAllRecords(10, 0, '').then((response) => {
        expect(response.Payload).to.deep.equal(expectedPayloadMultipleSort);
        done();
      });
    });

    // Search
    it('should return a payload when search by text is set (searching by \'CustomerName\')', (done) => {
      const dataSource = new LocalDataSource(localData, validColumnsSample);

      dataSource.getAllRecords(4, 0, 'ves').then((response) => {
        expect(response.Payload).to.have.lengthOf(4);
        expect(response.Payload).to.deep.equal(expectedPayloadTextSearchVesta);

        done();
      });
    });
  });

  beforeEach(() => {});
});
