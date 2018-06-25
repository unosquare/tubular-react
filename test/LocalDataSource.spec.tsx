import { shallow } from 'enzyme';
import * as React from 'react';

import LocalDataSource from '../src/DataGrid/DataSource/LocalDataSource';
import { validColumnsSample } from './utils/columns';
import { localData, expectedLocalData } from './utils/localData';

describe('<LocalDataSource />', () => {
  test('Should mount with valid props', () => {
    const component = shallow(
      <LocalDataSource
        source={localData}
        columns={validColumnsSample}
      />
    );

    expect(component.props()).toBeDefined();
  });

  test('Should contain state columns equals to props columns', () => {
    const component = shallow(
      <LocalDataSource
        source={localData}
        columns={validColumnsSample}
      />
    );

    expect(component.state('columns')).toEqual(validColumnsSample);
  });

  test('Should contain data', (done) => {
    const component = shallow(
      <LocalDataSource
        source={localData}
        columns={validColumnsSample}
      />
    );

    (component.instance() as any).retrieveData()
    .then(() => {
      expect(component.state().data).toEqual(expectedLocalData);
      done();
    });
  });

  test('Should throw error with invalid source', (done) => {
    const component = shallow(
      <LocalDataSource
        source={[]}
        columns={validColumnsSample}
      />
    );

    (component.instance() as any).retrieveData()
    .then(() => {
      expect(component.state().error).toBeDefined();
      done();
    });
  });
});
