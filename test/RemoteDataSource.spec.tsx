import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import RemoteDataSource from '../src/DataGrid/DataSource/RemoteDataSource';
import { validColumnsSample } from './utils/columns';
import {
  page2Expected,
  simpleRecordsExpected
} from './utils/data';

describe('RemoteDataSource', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('Should mount with valid props', () => {
    beforeEach(() => {
      mock.onPost('url').reply(200, {
        ...simpleRecordsExpected
      });
    });
    const component = shallow(
      <RemoteDataSource
        source='url'
        columns={validColumnsSample}
        itemsPerPage={10}
      />
    );
    expect(component.props()).toBeDefined();
  });

  test('Should contain data with valid url', () => {
    beforeEach(() => {
      mock.onPost('url').reply(200, {
        ...simpleRecordsExpected
      });
    });
    const component = shallow(
      <RemoteDataSource
        source='url'
        columns={validColumnsSample}
        itemsPerPage={10}
      />
    );

    expect(component.state().data).toBeDefined();
  });

  test('Should have error with invalid url', () => {
    beforeEach(() => {
      mock.onPost('url').reply(400, {error: 'Bad Request' });
    });
    const component = shallow(
      <RemoteDataSource
        source='url'
        columns={validColumnsSample}
        itemsPerPage={10}
      />
    );

    expect(component.state().data).not.toBeDefined();
  });

  test('Should contain state columns equals to props columns', () => {
    beforeEach(() => {
      mock.onPost('url').reply(200, {
        ...simpleRecordsExpected
      });
    });
    const component = shallow(
      <RemoteDataSource
        source='url'
        columns={validColumnsSample}
        itemsPerPage={10}
      />
    );

    expect(component.state('columns')).toEqual(validColumnsSample);
  });

  test('When change state page should reload data ', () => {
    beforeEach(() => {
      mock.onPost('url').reply(200, {
        ...simpleRecordsExpected
      });
      mock.onPost('url').reply(200, {
        ...page2Expected
      });
    });
    const component = shallow(
      <RemoteDataSource
        source='url'
        columns={validColumnsSample}
        itemsPerPage={10}
      />
    );
    component.setState({
      page: 1
    });

    expect(component.state().page).toBe(1);
    expect(component.state().data).toEqual(page2Expected.Payload);
  });
});
