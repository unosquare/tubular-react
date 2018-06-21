import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import RemoteDataSource from '../src/DataGrid/DataSource/RemoteDataSource';
import { validColumnsSample } from './utils/columns';
import GridRequest from '../src/DataGrid/Models/GridRequest'
import {
  invalidResponseStructure,
  onlyMicrosoftExpected,
  simpleRecordsExpected,
  twentyRecordsExpected,
  validResponseStructure
} from './utils/data';



describe('RemoteDataSource', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('When component is mounted', () => {
    beforeEach(() => {
      mock.reset();
      mock.onPost('url').reply(200, {
        ...simpleRecordsExpected
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
    });
  });

  describe('', () => {
    describe('When 20 records are requested', () => {
      beforeEach(() => {
        mock.onPost('url').reply(200, {
          ...twentyRecordsExpected
        });
      });

      const component = shallow(
        <RemoteDataSource
          source='url'
          columns={validColumnsSample}
          itemsPerPage={10}
        />
      );
      const instance  = component.instance();
      instance.getAllRecords(new GridRequest(validColumnsSample, 20, 0, ''));
      expect(inst.getAllRecords(any))
      test('Should return a payload with 20 records', () => {
        return dataSource.getAllRecords(20, 0, '').then((e: any) => {
          expect(e.Payload).toHaveLength(20);
        });
      });
    });
  });

});
