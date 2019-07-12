import { shallow } from 'enzyme';
import * as fetch from 'jest-fetch-mock';
import * as React from 'react';
import { withRemoteDataSource } from '../src';
import { validColumnsSample } from './utils/columns';
import { simpleRecordsExpected } from './utils/responses';

describe('<RemoteDataSource />', () => {
  // tslint:disable-next-line:max-line-length
  const TestComponent = withRemoteDataSource(
    () => <span />,
    validColumnsSample,
    'url',
  );

  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Should mount with valid props', () => {
    fetch.mockResponseOnce(JSON.stringify(simpleRecordsExpected));

    const component = shallow(<TestComponent />);
    expect(component.props()).toBeDefined();
  });

  test('Should contain data with valid url', async (done) => {
    fetch.mockResponse(JSON.stringify(simpleRecordsExpected));

    const component = shallow(<TestComponent />);
    await (component.instance() as any).processRequest({});
    expect(component.state('data')).toEqual(simpleRecordsExpected.Payload);
    done();
  });

  test('Should have error with invalid url', (done) => {
    fetch.mockReject(new Error('Bad Request'));

    const component = shallow(<TestComponent />);
    (component.instance() as any).retrieveData().then(() => {
      expect(component.state('data')).toEqual([]);
      expect(component.state('error')).toBeDefined();
      done();
    });
  });

  test('Should contain state columns equals to props columns', () => {
    fetch.mockResponseOnce(JSON.stringify(simpleRecordsExpected));

    const component = shallow(<TestComponent />);
    expect(component.state('columns')).toEqual(validColumnsSample);
  });
});
