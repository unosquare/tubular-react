import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow, mount, render } from 'enzyme';
import * as React from 'react';

import RemoteDataSource from '../src/DataGrid/DataSource/RemoteDataSource';
import { validColumnsSample } from './utils/columns';
import { simpleRecordsExpected } from './utils/data';

describe('<RemoteDataSource />', () => {
  const mock = new MockAdapter(axios);
  const componentJsx = (
    <RemoteDataSource
      source='url'
      columns={validColumnsSample}
    />
  );

  afterEach(() => mock.reset());

  test('Should mount with valid props', () => {
    const component = shallow(componentJsx);
    expect(component.props()).toBeDefined();
  });

  test('Should contain data with valid url', (done) => {
    mock.onPost('url').reply(200, {
      ...simpleRecordsExpected
    });

    const component = shallow(componentJsx);
    (component.instance() as any).retrieveData({}, () => {
      expect(component.state().data).toEqual(simpleRecordsExpected.Payload);
      done();
    });
  });

  test('Should have error with invalid url', (done) => {
    mock.onPost('url').reply(400, { error: 'Bad Request' });

    const component = shallow(componentJsx);
    (component.instance() as any).retrieveData({}, () => {
      expect(component.state().data).toEqual([]);
      expect(component.state().error).toBeDefined();
      done();
    });
  });

  test('Should contain state columns equals to props columns', () => {
    mock.onPost('url').reply(200, {
      ...simpleRecordsExpected
    });

    const component = shallow(componentJsx);
    expect(component.state('columns')).toEqual(validColumnsSample);
  });
});
