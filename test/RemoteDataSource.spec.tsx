import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow } from 'enzyme';
import * as React from 'react';

import { withRemoteDataSource } from '../src';
import { validColumnsSample } from './utils/columns';
import { onlyMicrosoftExpected, simpleRecordsExpected } from './utils/data';
import { microsoftSearchRequest } from './utils/requests';

describe('<RemoteDataSource />', () => {
  const mock = new MockAdapter(axios);
  const TestComponent = withRemoteDataSource(() => (<span></span>), validColumnsSample, 'url') ;

  afterEach(() => mock.reset());

  test('Should mount with valid props', () => {
    const component = shallow(<TestComponent />);
    expect(component.props()).toBeDefined();
  });

  test('Should contain data with valid url', (done) => {
    mock.onPost('url').reply(200, {
      ...simpleRecordsExpected
    });

    const component = shallow(<TestComponent />);
    (component.instance() as any).retrieveData()
    .then(() => {
      expect(component.state().data).toEqual(simpleRecordsExpected.Payload);
      done();
    });
  });

  test('Should have error with invalid url', (done) => {
    mock.onPost('url').reply(400, { error: 'Bad Request' });

    const component = shallow(<TestComponent />);
    (component.instance() as any).retrieveData()
    .then(() => {
      expect(component.state().data).toEqual([]);
      expect(component.state().error).toBeDefined();
      done();
    });
  });

  test('Should contain state columns equals to props columns', () => {
    const component = shallow(<TestComponent />);
    expect(component.state('columns')).toEqual(validColumnsSample);
  });

  test.skip('Should filter using search text', () => {
    mock.onPost('url', { ...microsoftSearchRequest }).reply(200, {
      ...onlyMicrosoftExpected
    });

    const component = shallow(<TestComponent />);
  });
});
