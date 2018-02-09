import Axios from 'axios';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { expect } from 'chai';
import { setTimeout } from 'timers';
import { expected, expectedColumnStructure, expectedResponseStructure, fakeResponseStructure } from './utils/data.js';
import { invalidColumnsSample, validColumnsSample } from './utils/columns.js';

describe('LocalDataSource', () => {
  describe('getAllRecords()', () => {
    it('should return a payload', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      
      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.deep.equal(expected.payload);
          done();
        });
      });
    });

    it('should return 10 records', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      
      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(10);
          done();
        });
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
        setTimeout(() => {
          expect(response.payload).to.deep.equal(expected.payload);
          done();
        });
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
    /** None */
    it('should return a payload without filters', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      
      dataSource.columns[0].Filter.Text = null;
      dataSource.columns[0].Filter.Operator = 'None';
      dataSource.columns[0].Filter.HasFilter = false;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(10);
          response.payload.map((element, i) => {
            expect(element.OrderID).to.be.equal(i + 1);
          });
          done();
        });        
      });      
    });

    /** Equals */
    it('should return a payload with one record', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = 'Equals';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(1);
          response.payload.map(element => {
            expect(element.OrderID).to.be.equal(9);
          });
          done();
        });
      });
    });

    /** Between */
    it('should return a payload with records 2 to 9', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);
      
      dataSource.columns[0].Filter.Text = 2;
      dataSource.columns[0].Filter.Operator = 'Between';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [9];

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(8);
          response.payload.map((element, i) => {
            expect(element.OrderID).to.be.equal(i + 2);
          });
          done();
        });
      });      
    });

    /** >= */
    it('should return a payload with records where OrderID >= 9', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = 'Gte';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(10);
          response.payload.map((element, i) => {
            expect(element.OrderID).to.be.equal(i + 9);
          });
          done();
        });
      });
    });

    /** > */
    it('should return a payload with records where OrderID > 9', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 9;
      dataSource.columns[0].Filter.Operator = 'Gt';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(10);
          response.payload.map((element, i) => {
            expect(element.OrderID).to.not.be.equal(9);
            expect(element.OrderID).to.be.equal(i + 10);
          });
          done();
        });
      });
    });

    /** <= */
    it('should return a payload with records where OrderID <= 5', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = 'Lte';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(5);
          response.payload.map((element, i) => {
            expect(element.OrderID).to.be.equal(i + 1);
          });
          done();
        });
      });
    });

    /** < */
    it('should return a payload with records where OrderId < 5', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[0].Filter.Text = 5;
      dataSource.columns[0].Filter.Operator = 'Lt';
      dataSource.columns[0].Filter.HasFilter = true;
      dataSource.columns[0].Filter.Argument = [];

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(4);
          response.payload.map((element, i) => {
            expect(element.OrderID).to.be.equal(i + 1);
          });
          done(); 
        });
      });
    });
  });

  /** Unit test for string/date columns */
  describe('When string/date column has filters', () => {
    /** None */
    it('should return a payload without filters', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = null;
      dataSource.columns[1].Filter.Operator = 'None';
      dataSource.columns[1].Filter.HasFilter = false;

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(10);
          response.payload.map((element, i) => {
            expect(element.OrderID).to.be.equal(i + 1);
          });
          done();
        });
      });
    });

    /** Equals */
    it('should return a payload with records where CustomerName are equals to Unosquare LLC', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'Unosquare LLC';
      dataSource.columns[1].Filter.Operator = 'Equals';
      dataSource.columns[1].Filter.HasFilter = true;

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(10);
          response.payload.map(element => {
            expect(element.CustomerName).to.be.equal('Unosquare LLC');
          });
          done();
        });
      });
    });

    /** Contains */
    it('should return a payload with records where the CustomerName contains a letter v', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'v';
      dataSource.columns[1].Filter.Operator = 'Contains';
      dataSource.columns[1].Filter.HasFilter = true;

      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          expect(response.payload).to.have.lengthOf(10);
          done();
        });
      });
    });

    /** Not Equals */
    it('should return a payload with records where the CustomerName isn\'t equals to Microsoft', done => {
      const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample);

      dataSource.columns[1].Filter.Text = 'Microsoft';
      dataSource.columns[1].Filter.Operator = 'NotEquals';
      dataSource.columns[1].Filter.HasFilter = true;
      
      dataSource.getAllRecords(10, 0, '').then(response => {
        setTimeout(() => {
          response.payload.map(element => {
            expect(element.CustomerName).to.not.equal('Microsoft');
          }); 
          done();
        });
      });
    });
  });

  beforeEach(() => {
  });
});