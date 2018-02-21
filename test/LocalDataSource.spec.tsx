import { expect } from 'chai';
import GridResponse from '../src/Grid/GridResponse';
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
  expectedPayloadDescSortByOrderID,
  expectedPayloadEqualsNumeric,
  expectedPayloadEqualsString,
  expectedPayloadGteNumeric,
  expectedPayloadGtNumeric,
  expectedPayloadLteNumeric,
  expectedPayloadLtNumeric,
  expectedPayloadMultipleSort,
  expectedPayloadNoneNumeric,
  expectedPayloadNoneString,
  expectedPayloadPage2,
  expectedPayloadTextSearchVesta,
} from './utils/LocalDataSourceMocks';

describe('LocalDataSource', () => {

  describe('getAllRecords()', () => {
    const dataSource = new LocalDataSource(localData, validColumnsSample);
    it('should return a payload', (done) => {

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedLocaDataSourcelResponse.Payload);
        done();
      });
    });

    it('should return 10 records', (done) => {
      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(10);
        done();
      });
    });

    // Pager
    it('should return a payload with the following 10 records when page is set to 1', (done) => {
       dataSource.getAllRecords(10, 1, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadPage2);
        done();
      });
    });

    // Sorting
    it('should return a payload with records in descending order (sorting by \'OrderID\')', (done) => {
      const $dataSource = new LocalDataSource(localData, validColumnsSampleDescending);

      $dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadDescSortByOrderID);
        done();
      });
    });

    it('should return a payload with records that has multiple sorting (sorting by \'OrderID\' and \'CustomerName\')'
    , (done) => {
      const $dataSource = new LocalDataSource(localData, validColumnsSampleMultipleSorting);

      $dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadMultipleSort);
        done();
      });
    });

    // Search
    it('should return a payload when search by text is set (searching by \'CustomerName\')', (done) => {
      const $dataSource = new LocalDataSource(localData, validColumnsSample);

      $dataSource.getAllRecords(4, 0, 'ves').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(4);
        expect(response.Payload).to.deep.equal(expectedPayloadTextSearchVesta);

        done();
      });
    });
  });

  describe('When numeric column has filters', () => {
    const dataSource = new LocalDataSource(localData, validColumnsSample);

    beforeEach(() => {
      dataSource.columns[0].Filter.Text = null;
      dataSource.columns[0].Filter.Operator = 'None';
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];
    });

    // None
    it('should return a payload without filters', (done) => {

      dataSource.columns[0].Filter.Text = null;
      dataSource.columns[0].Filter.Operator = 'None';
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(10);
        expect(response.Payload).to.deep.equal(expectedPayloadNoneNumeric);

        done();
      });
    });

    // Equals
    it('should return a payload with one record', (done) => {
      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = 'Equals';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(1);
        expect(response.Payload).to.deep.equal(expectedPayloadEqualsNumeric);

        done();
      });
    });

    // Between
    it('should return a payload with records 2 to 9', (done) => {
      dataSource.columns[0].Filter.Text = 2;
      dataSource.columns[0].Filter.Operator = 'Between';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [9];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(8);
        expect(response.Payload).to.deep.equal(expectedPayloadBetweenNumeric);

        done();
      });
    });

    // >=
    it('should return a payload with records where OrderID >= 9', (done) => {
      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = 'Gte';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(10);
        expect(response.Payload).to.deep.equal(expectedPayloadGteNumeric);

        done();
      });
    });

    // >
    it('should return a payload with records where OrderID > 9', (done) => {
      let payloadResponse;

      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = 'Gt';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        payloadResponse = response.Payload;

        expect(response.Payload).to.have.lengthOf(10);
        expect(payloadResponse[0]['OrderID']).to.not.be.equal(9);
        expect(response.Payload).to.deep.equal(expectedPayloadGtNumeric);

        done();
      });
    });

    // <=
    it('should return a payload with records where OrderID <= 5', (done) => {
      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = 'Lte';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(5);
        expect(response.Payload).to.deep.equal(expectedPayloadLteNumeric);

        done();
      });
    });

    // <
    it('should return a payload with records where OrderId < 5', (done) => {
      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = 'Lt';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(4);
        expect(response.Payload).to.deep.equal(expectedPayloadLtNumeric);

        done();
      });
    });

    // No records
    it('should return an empty array', (done) => {
      dataSource.columns[0].Filter.Text = 501;
      dataSource.columns[0].Filter.Operator = 'Equals';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(0);
        done();
      });
    });
  });

  describe('When string column has filters', () => {
    const dataSource = new LocalDataSource(localData, validColumnsSample);

    beforeEach(() => {
      dataSource.columns[0].Filter.Text = null;
      dataSource.columns[0].Filter.Operator = 'None';
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];
    });

    it('should return a payload with records where CustomerName equals \'Unosquare LLC\'', (done) => {
      dataSource.columns[1].Filter.Text = 'Unosquare LLC';
      dataSource.columns[1].Filter.Operator = 'Equals';
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadEqualsString);
        done();
      });
    });
  });

});
