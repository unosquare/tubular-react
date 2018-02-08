import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { expect } from 'chai';
import { expected, expectedResponseStructure } from './utils/data.js';
import { invalidColumnsSample, validColumnsSample } from './utils/columns.js';
import { setTimeout } from 'timers';

describe('LocalDataSource', () => {
  let axiosInstance; 
  let mock;

  describe('getAllRecords()', () => {
    beforeEach(() => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { validColumnsSample }).reply(200);
    });

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

  beforeEach(() => {
    axiosInstance = Axios.create();
    mock = new MockAdapter(axiosInstance);
  });
});