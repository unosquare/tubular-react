import { expect } from 'chai';
import { CompareOperators } from '../src/DataGrid/Column';
import GridResponse from '../src/DataGrid/GridResponse';
import LocalDataSource from '../src/DataGrid/LocalDataSource';
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
  expectedPayloadBetweenDate,
  expectedPayloadBetweenNumeric,
  expectedPayloadContainsString,
  expectedPayloadDescSortByOrderID,
  expectedPayloadEndsWithString,
  expectedPayloadEqualsDate,
  expectedPayloadEqualsNumeric,
  expectedPayloadEqualsString,
  expectedPayloadGtDate,
  expectedPayloadGteDate,
  expectedPayloadGteNumeric,
  expectedPayloadGtNumeric,
  expectedPayloadLteNumeric,
  expectedPayloadLtNumeric,
  expectedPayloadMultipleSort,
  expectedPayloadNoneDate,
  expectedPayloadNoneNumeric,
  expectedPayloadNoneString,
  expectedPayloadNotEndsWithString,
  expectedPayloadNotEqualsString,
  expectedPayloadNotStartsWithString,
  expectedPayloadPage2,
  expectedPayloadStartsWithString,
  expectedPayloadTextSearchVesta
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

    it('should return a payload with the following 10 records when page is set to 1', (done) => {
       dataSource.getAllRecords(10, 1, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadPage2);
        done();
      });
    });

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
      dataSource.columns[0].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];
    });

    it('should return a payload without filters', (done) => {

      dataSource.columns[0].Filter.Text = null;
      dataSource.columns[0].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(10);
        expect(response.Payload).to.deep.equal(expectedPayloadNoneNumeric);

        done();
      });
    });

    it('should return a payload with one record', (done) => {
      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = CompareOperators.EQUALS;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(1);
        expect(response.Payload).to.deep.equal(expectedPayloadEqualsNumeric);

        done();
      });
    });

    it('should return a payload with records 2 to 9', (done) => {
      dataSource.columns[0].Filter.Text = 2;
      dataSource.columns[0].Filter.Operator = CompareOperators.BETWEEN;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [9];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(8);
        expect(response.Payload).to.deep.equal(expectedPayloadBetweenNumeric);

        done();
      });
    });

    it('should return a payload with records where OrderID >= 9', (done) => {
      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = CompareOperators.GTE;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(10);
        expect(response.Payload).to.deep.equal(expectedPayloadGteNumeric);

        done();
      });
    });

    it('should return a payload with records where OrderID > 9', (done) => {
      let payloadResponse;

      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = CompareOperators.GT;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        payloadResponse = response.Payload;

        const orderID = payloadResponse.find((x) => {
          return x.OrderID !== 9;
        });

        expect(orderID).to.not.equal(9);
        expect(response.Payload).to.have.lengthOf(10);
        expect(response.Payload).to.deep.equal(expectedPayloadGtNumeric);

        done();
      });
    });

    it('should return a payload with records where OrderID <= 5', (done) => {
      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = CompareOperators.LTE;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.have.lengthOf(5);
        expect(response.Payload).to.deep.equal(expectedPayloadLteNumeric);

        done();
      });
    });

    it('should return a payload with records where OrderId < 5', (done) => {
      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = CompareOperators.LT;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        const payloadResponse = response.Payload;

        const orderID = payloadResponse.find((x) => {
          return x.OrderID !== 5;
        });

        expect(orderID).to.not.equal(5);
        expect(response.Payload).to.have.lengthOf(4);
        expect(response.Payload).to.deep.equal(expectedPayloadLtNumeric);

        done();
      });
    });

    it('should return an empty array', (done) => {
      dataSource.columns[0].Filter.Text = 501;
      dataSource.columns[0].Filter.Operator = CompareOperators.EQUALS;
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
      dataSource.columns[0].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.columns[1].Filter.Text = null;
      dataSource.columns[1].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[1].Filter.HasFilter = false;
      dataSource.columns[1].Filter.Argument = [];
    });

    it('should return a payload without filters', (done) => {
      dataSource.columns[1].Filter.Text = null;
      dataSource.columns[1].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[1].Filter.HasFilter = false;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadNoneString);
        done();
      });
    });

    it('should return a payload with records where CustomerName equals \'Unosquare LLC\'', (done) => {
      dataSource.columns[1].Filter.Text = 'Unosquare LLC';
      dataSource.columns[1].Filter.Operator = CompareOperators.EQUALS;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadEqualsString);
        done();
      });
    });

    it('should return a payload with records where CustomerName isn\'t equals to \'Microsoft\'', (done) => {
      dataSource.columns[1].Filter.Text = 'Microsoft';
      dataSource.columns[1].Filter.Operator = CompareOperators.NOT_EQUALS;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadNotEqualsString);
        done();
      });
    });

    it('should return a payload with records where CustomerName contains \'ves\'', (done) => {
      dataSource.columns[1].Filter.Text = 'ves';
      dataSource.columns[1].Filter.Operator = CompareOperators.CONTAINS;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadContainsString);
        done();
      });
    });

    it('should return a payload with records where CustomerName starts with \'M\'', (done) => {
      dataSource.columns[1].Filter.Text = 'M';
      dataSource.columns[1].Filter.Operator = CompareOperators.STARTS_WITH;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadStartsWithString);
        done();
      });
    });

    it('should return a payload with records where CustomerName does not starts with \'M\'', (done) => {
      dataSource.columns[1].Filter.Text = 'M';
      dataSource.columns[1].Filter.Operator = CompareOperators.NOT_STARTS_WITH;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadNotStartsWithString);
        done();
      });
    });

    it('should return a payload with records where CustomerName ends with \'a\'', (done) => {
      dataSource.columns[1].Filter.Text = 'a';
      dataSource.columns[1].Filter.Operator = CompareOperators.ENDS_WITH;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadEndsWithString);
        done();
      });
    });

    it('should return a payload with records where CustomerName not ends with \'a\'', (done) => {
      dataSource.columns[1].Filter.Text = 'a';
      dataSource.columns[1].Filter.Operator = CompareOperators.NOT_ENDS_WITH;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadNotEndsWithString);
        done();
      });
    });
  });

  describe('When date column has filters', () => {
    const dataSource = new LocalDataSource(localData, validColumnsSample);

    beforeEach(() => {
      dataSource.columns[0].Filter.Text = null;
      dataSource.columns[0].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.columns[1].Filter.Text = null;
      dataSource.columns[1].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[1].Filter.HasFilter = false;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.columns[2].Filter.Text = null;
      dataSource.columns[2].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[2].Filter.HasFilter = false;
      dataSource.columns[2].Filter.Argument = [];
    });

    it('should return a payload without filters', (done) => {
      dataSource.columns[2].Filter.Text = null;
      dataSource.columns[2].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[2].Filter.HasFilter = false;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadNoneDate);
        done();
      });
    });

    it('should return a payload with records where \'Shipped Date\' are equals to March 19th 2016', (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.EQUALS;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadEqualsDate);
        done();
      });
    });

    it('should return a payload with records where \'Shipped Date\' are between March 19th 2016 and November 11th 2016',
        (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.BETWEEN;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = ['2016-11-08T18:00:00'];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadBetweenDate);
        done();
      });
    });

    it('should return a payload with records where \'Shipped Date\' are greater than or equal to March 19th 2016',
        (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.GTE;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).to.deep.equal(expectedPayloadGteDate);
        done();
      });
    });

    it('should return a payload with records where \'Shipped Date\' are greater than to March 19th 2016',
        (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.GT;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        const payloadResponse = response.Payload;

        const shippedDate = payloadResponse.find((x) => {
          return x.ShippedDate !== '2016-03-19T19:00:00';
        });

        expect(shippedDate).to.not.equal('2016-03-19T19:00:00');
        expect(response.Payload).to.have.lengthOf(10);
        expect(response.Payload).to.deep.equal(expectedPayloadGtDate);

        done();
      });
    });
  });

});
