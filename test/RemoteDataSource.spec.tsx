import { shallow } from 'enzyme';
import RemoteDataSource from '../src/DataGrid/DataSource/RemoteDataSource';
import * as React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { validColumnsSample } from './utils/columns';
import {
  invalidResponseStructure,
  onlyMicrosoftExpected,
  simpleRecordsExpected,
  twentyRecordsExpected,
  validResponseStructure
} from './utils/data';

describe('RemoteDataSource', () => {
  describe('When component is mounted', () => {
    beforeEach( () => {
      mock.reset();
      mock.onPost('url').reply(200, {
        ...twentyRecordsExpected
      });
    });

    test('Should contain data', () => {
      const component = shallow(
        <RemoteDataSource
          source='url'
          columns={validColumnsSample}
          itemsPerPage={10}
        />
      );

      expect(component.state('data')).toBeDefined();
    })
  });

  describe('When columns structure is valid', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    

    describe('When 20 records are requested', () => {
      beforeEach( () => {
        mock.reset();
        mock.onPost('url').reply(200, {
          ...twentyRecordsExpected
        });
      });

      test('Should return a payload with 20 records', () => {
         return dataSource.getAllRecords(20, 0, '').then((e: any) => {
            expect(e.Payload).toHaveLength(20);
         });
      });
    });

    describe('When search input is Microsoft', () => {
      beforeEach( () => {
        mock.reset();
        mock.onPost('url').reply(200, {
          ...onlyMicrosoftExpected
        });
      });

      test('Should return a payload with only Microsoft records', () => dataSource.getAllRecords(10, 0, 'Microsoft')
        .then((r: any) => {
          expect(r.Payload).toEqual(onlyMicrosoftExpected.Payload);
          expect(r.FilteredRecordCount).toEqual(onlyMicrosoftExpected.FilteredRecordCount);
          expect(r.TotalRecordCount).toEqual(onlyMicrosoftExpected.TotalRecordCount);
        }));
    });

    describe('When retrieveData() is called', () => {
      describe('When the response is invalid', () => {
        beforeEach( () => {
          mock.reset();
          mock.onPost('url').reply(200, {
            ...simpleRecordsExpected
          });
        });

        test('Should return a payload', (done) => {
          dataSource.retrieveData(10, 0, '')
            .skip(1).subscribe((r) => {
              expect(r.Payload).toEqual(simpleRecordsExpected.Payload);
              expect(r.FilteredRecordCount).toEqual(simpleRecordsExpected.FilteredRecordCount);
              expect(r.TotalRecordCount).toEqual(simpleRecordsExpected.TotalRecordCount);
              done();
            }, (error: any) => {
              done();
            });
        });
      });

      describe('When the response is invalid', () => {
        const dtSource = new RemoteDataSource('url', validColumnsSample);

        beforeEach( () => {
          mock.reset();
          mock.onPost('url').reply(200, {
            AggregationPayload: simpleRecordsExpected.AggregationPayload,
            Counter: simpleRecordsExpected.Counter,
            CurrentPage: simpleRecordsExpected.CurrentPage,
            FilteredRecordCount: simpleRecordsExpected.FilteredRecordCount
          });
        });

        test('Should throw an error', (done) => {
          dtSource.retrieveData(10, 0, '')
            .subscribe((r) => r, (error: any) => {
              expect(error.message).toBe('It\'s not a valid Tubular response object');
              done();
            });
        });
      });
    });
  });
});