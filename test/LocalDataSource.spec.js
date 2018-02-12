import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { expect } from 'chai';
import { expected, expectedColumnStructure, expectedResponseStructure, fakeResponseStructure } from './utils/data.js';
import { 
  expectedPayloadBetweenNumeric,
  expectedPayloadContainsString, 
  expectedPayloadDescSortByOrderID,
  expectedPayloadEndsWithString,
  expectedPayloadEqualsNumeric,
  expectedPayloadEqualsString, 
  expectedPayloadGtNumeric,
  expectedPayloadGteNumeric,
  expectedPayloadLtNumeric,
  expectedPayloadLteNumeric,
  expectedPayloadMultipleSort,
  expectedPayloadNoneNumeric,
  expectedPayloadNoneString,
  expectedPayloadNotEndsWithString, 
  expectedPayloadNotEqualsString, 
  expectedPayloadNotStartsWithString,
  expectedPayloadPage2,
  expectedPayloadStartsWithString,
  expectedPayloadTextSearchVesta 
} from './utils/LocalDataSourceMocks';
import { 
  invalidColumnsSample, 
  validColumnsSample, 
  validColumnsSampleDescending,
  validColumnsSampleMultipleSorting
} from './utils/columns.js';

describe('LocalDataSource', () => {
  describe('getAllRecords()', () => {
    it('should return a payload', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      
      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expected.payload);
        done();
      });
    });

    it('should return 10 records', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      
      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.have.lengthOf(10);
        done();
      });
    });

    // Pager 
    it('should return a payload with the following 10 records when page is set to 1', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      
      dataSource.getAllRecords(10, 1, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadPage2);
        done();
      });
    });

    // Sorting
    it('should return a payload with records in descending order (sorting by \'OrderID\')', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSampleDescending);

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadDescSortByOrderID);
        done();
      });
    });

    it('should return a payload with records that has multiple sorting (sorting by \'OrderID\' and \'CustomerName\')', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSampleMultipleSorting);
      
      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadMultipleSort);
        done();
      });
    });

    // Search
    it('should return a payload when search by text is set (searching by \'CustomerName\')', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.getAllRecords(30, 0, 'ves').then(response => {
        expect(response.payload).to.have.lengthOf(30);
        expect(response.payload).to.deep.equal(expectedPayloadTextSearchVesta);

        done();
      });
    });
  });

  describe('isValidResponse()', () => {
    it('should return true when there\'s a Tubular Response Object', () => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      expect(dataSource.isValidResponse(expectedResponseStructure)).to.be.true;
    });

    it('should return false when there isn\'t a Tubular Response Object', () => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      expect(dataSource.isValidResponse(fakeResponseStructure)).to.be.false;
    });
  });

  describe('When column structure is wrong', () => {
    it('should return a status code 500', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', invalidColumnsSample);

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expected.payload);
        done();
      }).catch(error => {
        expect(error.response.status).to.equal(500);
        done();
      });
    });
  });

  describe('_normalizeColumns()', () => {
    it('should return an object with the column structure accepted for Tubular', () => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      expect(dataSource._normalizeColumns(validColumnsSample)).to.deep.equal(expectedColumnStructure);
    });
  });

  // Unit tests for numeric columns
  describe('When numeric column has filters', () => {
    // None
    it('should return a payload without filters', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      
      dataSource.columns[0].Filter.Text = null;
      dataSource.columns[0].Filter.Operator = 'None';
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.have.lengthOf(10);
        expect(response.payload).to.deep.equal(expectedPayloadNoneNumeric);
        
        done();     
      });      
    });

    // Equals
    it('should return a payload with one record', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = 'Equals';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.have.lengthOf(1);
        expect(response.payload).to.deep.equal(expectedPayloadEqualsNumeric);

        done();
      });
    });

    // Between
    it('should return a payload with records 2 to 9', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      
      dataSource.columns[0].Filter.Text = 2;
      dataSource.columns[0].Filter.Operator = 'Between';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [9];

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.have.lengthOf(8);
        expect(response.payload).to.deep.equal(expectedPayloadBetweenNumeric);

        done();
      });      
    });

    // >=
    it('should return a payload with records where OrderID >= 9', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = 'Gte';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.have.lengthOf(10);
        expect(response.payload).to.deep.equal(expectedPayloadGteNumeric);
        
        done();
      });
    });

    // >
    it('should return a payload with records where OrderID > 9', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      let payloadResponse;

      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = 'Gt';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        payloadResponse = response.payload;

        expect(response.payload).to.have.lengthOf(10);
        expect(payloadResponse[0]['OrderID']).to.not.be.equal(9);
        expect(response.payload).to.deep.equal(expectedPayloadGtNumeric);

        done();
      });
    });

    // <=
    it('should return a payload with records where OrderID <= 5', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = 'Lte';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.have.lengthOf(5);
        expect(response.payload).to.deep.equal(expectedPayloadLteNumeric);

        done();
      });
    });

    // <
    it('should return a payload with records where OrderId < 5', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = 'Lt';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.have.lengthOf(4);
        expect(response.payload).to.deep.equal(expectedPayloadLtNumeric);
        
        done();
      });
    });

    // No records
    it('should return an empty array', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 501;
      dataSource.columns[0].Filter.Operator = 'Equals';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.be.empty;
        done();
      });
    });
  });

  // Unit tests for string columns
  describe('When string column has filters', () => {
    // None
    it('should return a payload without filters', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = null;
      dataSource.columns[1].Filter.Operator = 'None';
      dataSource.columns[1].Filter.HasFilter = false;

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadNoneString);
        done();
      });
    });

    // Equals
    it('should return a payload with records where CustomerName are equals to \'Unosquare LLC\'', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'Unosquare LLC';
      dataSource.columns[1].Filter.Operator = 'Equals';
      dataSource.columns[1].Filter.HasFilter = true;

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadEqualsString);
        done();
      });
    });

    // Contains
    it('should return a payload with records where CustomerName contains a letter \'v\'', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'v';
      dataSource.columns[1].Filter.Operator = 'Contains';
      dataSource.columns[1].Filter.HasFilter = true;

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadContainsString);
        done();
      });
    });

    // Not Equals
    it('should return a payload with records where CustomerName isn\'t equals to \'Microsoft\'', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'Microsoft';
      dataSource.columns[1].Filter.Operator = 'NotEquals';
      dataSource.columns[1].Filter.HasFilter = true;
      
      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadNotEqualsString);
        done();
      });
    });

    // Starts With
    it('should return a payload with records where CustomerName starts with \'M\'', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'M';
      dataSource.columns[1].Filter.Operator = 'StartsWith';
      dataSource.columns[1].Filter.HasFilter = true;

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadStartsWithString);
        done();
      });
    });

    // Not Starts With
    it('should return a payload with records where CustomerName not starts with \'M\'', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'M';
      dataSource.columns[1].Filter.Operator = 'NotStartsWith';
      dataSource.columns[1].Filter.HasFilter = true;

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadNotStartsWithString);
        done();
      });
    });

    // Ends With
    it('should return a payload with records where CustomerName ends with \'a\'', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'a';
      dataSource.columns[1].Filter.Operator = 'EndsWith';
      dataSource.columns[1].Filter.HasFilter = true;

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadEndsWithString);
        done();
      });
    });

    // Not Ends With
    it('should return a payload with records where CustomerName not ends with \'a\'', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'a';
      dataSource.columns[1].Filter.Operator = 'NotEndsWith';
      dataSource.columns[1].Filter.HasFilter = true;

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadNotEndsWithString);
        done();
      });
    });

    // No records
    it('should return an empty array', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'Unosquares LLC';
      dataSource.columns[1].Filter.Operator = 'Equals';
      dataSource.columns[1].Filter.HasFilter = true;

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.be.empty;
        done();
      });
    });
  });

  beforeEach(() => {
  });
});