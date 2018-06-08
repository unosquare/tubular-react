import { AggregateFunctions } from '../src/DataGrid';
import { CompareOperators } from '../src/DataGrid/Column';
import GridResponse from '../src/DataGrid/GridResponse';
import LocalDataSource from '../src/DataGrid/DataSource/LocalDataSource';
import {
  aggregateColumnsSample,
  customAmountCol,
  customCustomerNameCol,
  simpleColumnsSample,
  validColumnsSample,
  validColumnsSampleDescending,
  validColumnsSampleMultipleSorting
} from './utils/columns';
import localData from './utils/localData';
import {
  expectedLocaDataSourcelResponse,
  expectedLocalDataSourceResponseConnect,
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
  expectedPayloadLtDate,
  expectedPayloadLteDate,
  expectedPayloadLteNumeric,
  expectedPayloadLtNumeric,
  expectedPayloadMultipleSort,
  expectedPayloadNoneDate,
  expectedPayloadNoneNumeric,
  expectedPayloadNoneString,
  expectedPayloadNotContainsString,
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
    test('should return a payload', (done) => {

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedLocaDataSourcelResponse.Payload);
        done();
      });
    });

    test('should return 10 records', (done) => {
      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(10);
        done();
      });
    });

    test('should return a payload with the following 10 records when page is set to 1', (done) => {
       dataSource.getAllRecords(10, 1, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadPage2);
        done();
      });
    });

    test('should return a payload with records in descending order (sorting by \'OrderID\')', (done) => {
      const $dataSource = new LocalDataSource(localData, validColumnsSampleDescending);

      $dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadDescSortByOrderID);
        done();
      });
    });

    test('should return a payload with records that has multiple sorting (sorting by \'CustomerName\' and \'OrderID\')'
    , (done) => {
      const $dataSource = new LocalDataSource(localData, validColumnsSampleMultipleSorting);

      $dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadMultipleSort);
        done();
      });
    });

    test('should return a payload when search by text is set (searching by \'CustomerName\')', (done) => {
      const $dataSource = new LocalDataSource(localData, validColumnsSample);

      $dataSource.getAllRecords(4, 0, 'ves').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(4);
        expect(response.Payload).toEqual(expectedPayloadTextSearchVesta);

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

    test('should return a payload without filters', (done) => {

      dataSource.columns[0].Filter.Text = null;
      dataSource.columns[0].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(10);
        expect(response.Payload).toEqual(expectedPayloadNoneNumeric);

        done();
      });
    });

    test('should return a payload with one record', (done) => {
      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = CompareOperators.EQUALS;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(1);
        expect(response.Payload).toEqual(expectedPayloadEqualsNumeric);
        done();
      });
    });

    test('should return a payload with records 2 to 9', (done) => {
      dataSource.columns[0].Filter.Text = 2;
      dataSource.columns[0].Filter.Operator = CompareOperators.BETWEEN;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [9];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(8);
        expect(response.Payload).toEqual(expectedPayloadBetweenNumeric);

        done();
      });
    });

    test('should return a payload with records where OrderID >= 9', (done) => {
      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = CompareOperators.GTE;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(10);
        expect(response.Payload).toEqual(expectedPayloadGteNumeric);

        done();
      });
    });

    test('should return a payload with records where OrderID > 9', (done) => {
      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = CompareOperators.GT;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(10);
        expect(response.Payload).toEqual(expectedPayloadGtNumeric);

        done();
      });
    });

    test('should return a payload with records where OrderID <= 5', (done) => {
      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = CompareOperators.LTE;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(5);
        expect(response.Payload).toEqual(expectedPayloadLteNumeric);

        done();
      });
    });

    test('should return a payload with records where OrderId < 5', (done) => {
      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = CompareOperators.LT;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(4);
        expect(response.Payload).toEqual(expectedPayloadLtNumeric);

        done();
      });
    });

    test('should return an empty array', (done) => {
      dataSource.columns[0].Filter.Text = 501;
      dataSource.columns[0].Filter.Operator = CompareOperators.EQUALS;
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(0);
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

    test('should return a payload without filters', (done) => {
      dataSource.columns[1].Filter.Text = null;
      dataSource.columns[1].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[1].Filter.HasFilter = false;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadNoneString);
        done();
      });
    });

    test('should return a payload with records where CustomerName equals \'Unosquare LLC\'', (done) => {
      dataSource.columns[1].Filter.Text = 'Unosquare LLC';
      dataSource.columns[1].Filter.Operator = CompareOperators.EQUALS;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadEqualsString);
        done();
      });
    });

    test('should return a payload with records where CustomerName isn\'t equals to \'Microsoft\'', (done) => {
      dataSource.columns[1].Filter.Text = 'Microsoft';
      dataSource.columns[1].Filter.Operator = CompareOperators.NOT_EQUALS;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadNotEqualsString);
        done();
      });
    });

    test('should return a payload with records where CustomerName contains \'ves\'', (done) => {
      dataSource.columns[1].Filter.Text = 'ves';
      dataSource.columns[1].Filter.Operator = CompareOperators.CONTAINS;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadContainsString);
        done();
      });
    });

    test('should return a payload with records where CustomerName not contains \'a\'', (done) => {
      dataSource.columns[1].Filter.Text = 'a';
      dataSource.columns[1].Filter.Operator = CompareOperators.NOT_CONTAINS;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadNotContainsString);
        done();
      });
    });

    test('should return a payload with records where CustomerName starts with \'M\'', (done) => {
      dataSource.columns[1].Filter.Text = 'M';
      dataSource.columns[1].Filter.Operator = CompareOperators.STARTS_WITH;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadStartsWithString);
        done();
      });
    });

    test('should return a payload with records where CustomerName does not starts with \'M\'', (done) => {
      dataSource.columns[1].Filter.Text = 'M';
      dataSource.columns[1].Filter.Operator = CompareOperators.NOT_STARTS_WITH;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadNotStartsWithString);
        done();
      });
    });

    test('should return a payload with records where CustomerName ends with \'a\'', (done) => {
      dataSource.columns[1].Filter.Text = 'a';
      dataSource.columns[1].Filter.Operator = CompareOperators.ENDS_WITH;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadEndsWithString);
        done();
      });
    });

    test('should return a payload with records where CustomerName not ends with \'a\'', (done) => {
      dataSource.columns[1].Filter.Text = 'a';
      dataSource.columns[1].Filter.Operator = CompareOperators.NOT_ENDS_WITH;
      dataSource.columns[1].Filter.HasFilter = true;
      dataSource.columns[1].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadNotEndsWithString);
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

    test('should return a payload without filters', (done) => {
      dataSource.columns[2].Filter.Text = null;
      dataSource.columns[2].Filter.Operator = CompareOperators.NONE;
      dataSource.columns[2].Filter.HasFilter = false;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadNoneDate);
        done();
      });
    });

    test('should return a payload with records where \'Shipped Date\' are equals to March 19th 2016', (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.EQUALS;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadEqualsDate);
        done();
      });
    });

    test('should return a payload with records where \'Shipped Date\' are between March 19th 2016 and November 11th 2016',
        (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.BETWEEN;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = ['2016-11-08T18:00:00'];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadBetweenDate);
        done();
      });
    });

    test('should return a payload with records where \'Shipped Date\' are greater than or equal to March 19th 2016',
        (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.GTE;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadGteDate);
        done();
      });
    });

    test('should return a payload with records where \'Shipped Date\' are greater than to March 19th 2016',
        (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.GT;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(10);
        expect(response.Payload).toEqual(expectedPayloadGtDate);

        done();
      });
    });

    test('should return a payload with records where \'Shipped Date\' are less than or equal than to March 19th 2016',
        (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.LTE;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedPayloadLteDate);

        done();
      });
    });

    test('should return a payload with records where \'Shipped Date\' are less than or equal than to March 19th 2016',
        (done) => {
      dataSource.columns[2].Filter.Text = '2016-03-19T19:00:00';
      dataSource.columns[2].Filter.Operator = CompareOperators.LT;
      dataSource.columns[2].Filter.HasFilter = true;
      dataSource.columns[2].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Payload).toHaveLength(2);
        expect(response.Payload).toEqual(expectedPayloadLtDate);

        done();
      });
    });
  });

  describe('When column has aggregate function', () => {
    beforeEach(() => {
      customAmountCol.Aggregate = null;
    });

    test('should return the average of the \'Amount\' column', (done) => {
      customAmountCol.Aggregate = AggregateFunctions.AVERAGE;
      const dataSource = new LocalDataSource(localData, aggregateColumnsSample);

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Aggregate.Amount).toBeCloseTo(157.363, 0.001);
        done();
      });
    });

    test('should return the sum of the \'Amount\' column', (done) => {
      customAmountCol.Aggregate = AggregateFunctions.SUM;
      const dataSource = new LocalDataSource(localData, aggregateColumnsSample);

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Aggregate.Amount).toBe(3462);
        done();
      });
    });

    test('should return the max of the \'Amount\' column', (done) => {
      customAmountCol.Aggregate = AggregateFunctions.MAX;
      const dataSource = new LocalDataSource(localData, aggregateColumnsSample);

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Aggregate.Amount).toBe(300);
        done();
      });
    });

    test('should return the min of the \'Amount\' column', (done) => {
      customAmountCol.Aggregate = AggregateFunctions.MIN;
      const dataSource = new LocalDataSource(localData, aggregateColumnsSample);

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Aggregate.Amount).toBe(9);
        done();
      });
    });

    test('should return the total of records in \'Customer Name\' eliminating duplicates', (done) => {
      customCustomerNameCol.Aggregate = AggregateFunctions.DISTINCT_COUNT;
      const dataSource = new LocalDataSource(localData, aggregateColumnsSample);

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Aggregate.CustomerName).toBe(7);
        done();
      });
    });

    test('should return the total of records in \'Customer Name\'', (done) => {
      customCustomerNameCol.Aggregate = AggregateFunctions.COUNT;
      const dataSource = new LocalDataSource(localData, aggregateColumnsSample);

      dataSource.getAllRecords(10, 0, '').then((response: GridResponse) => {
        expect(response.Aggregate.CustomerName).toBe(22);
        done();
      });
    });
  });

  describe('When retrieveData() is called', () => {
    const dataSource = new LocalDataSource(localData, simpleColumnsSample);

    test('should return a payload', (done) => {
      dataSource.retrieveData(10, 0, '').skip(1).subscribe((response: GridResponse) => {
        expect(response.Payload).toEqual(expectedLocalDataSourceResponseConnect.Payload);
        expect(response.FilteredRecordCount).toEqual(expectedLocalDataSourceResponseConnect.FilteredRecordCount);
        expect(response.TotalRecordCount).toEqual(expectedLocalDataSourceResponseConnect.TotalRecordCount);
        done();
      }, (error: any) => {
        done();
      });
    });
  });

});