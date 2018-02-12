import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { expect } from 'chai';
import { expected, expectedColumnStructure, expectedResponseStructure, fakeResponseStructure } from './utils/data.js';
import { 
  expectedPayloadNone_numeric,
  expectedPayloadEquals_numeric,
  expectedPayloadBetween_numeric,
  expectedPayloadGte_numeric,
  expectedPayloadGt_numeric,
  expectedPayloadLte_numeric,
  expectedPayloadLt_numeric,
  expectedPayloadContains_string, 
  expectedPayloadEndsWith_string,
  expectedPayloadEquals_string, 
  expectedPayloadNone_string,
  expectedPayloadNotEndsWith_string, 
  expectedPayloadNotEquals_string, 
  expectedPayloadNotStartsWith_string,
  expectedPayloadStartsWith_string 
} from './utils/LocalDataSourceMocks';
import { invalidColumnsSample, validColumnsSample } from './utils/columns.js';

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

  /** Unit tests for numeric columns */
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
        expect(response.payload).to.deep.equal(expectedPayloadNone_numeric);
        
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
        expect(response.payload).to.deep.equal(expectedPayloadEquals_numeric);

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
        expect(response.payload).to.deep.equal(expectedPayloadBetween_numeric);

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
        expect(response.payload).to.deep.equal(expectedPayloadGte_numeric);
        
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
        expect(response.payload).to.deep.equal(expectedPayloadGt_numeric);

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
        expect(response.payload).to.deep.equal(expectedPayloadLte_numeric);

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
        expect(response.payload).to.deep.equal(expectedPayloadLt_numeric);
        
        done();
      });
    });
  });

  /** Unit tests for string columns */
  describe('When string column has filters', () => {
    // None
    it('should return a payload without filters', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = null;
      dataSource.columns[1].Filter.Operator = 'None';
      dataSource.columns[1].Filter.HasFilter = false;

      dataSource.getAllRecords(10, 0, '').then(response => {
        expect(response.payload).to.deep.equal(expectedPayloadNone_string);
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
        expect(response.payload).to.deep.equal(expectedPayloadEquals_string);
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
        expect(response.payload).to.deep.equal(expectedPayloadContains_string);
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
        expect(response.payload).to.deep.equal(expectedPayloadNotEquals_string);
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
        expect(response.payload).to.deep.equal(expectedPayloadStartsWith_string);
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
        expect(response.payload).to.deep.equal(expectedPayloadNotStartsWith_string);
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
        expect(response.payload).to.deep.equal(expectedPayloadEndsWith_string);
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
        expect(response.payload).to.deep.equal(expectedPayloadNotEndsWith_string);
        done();
      });
    });
  });

  beforeEach(() => {
  });
});