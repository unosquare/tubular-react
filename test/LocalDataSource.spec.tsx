import { shallow } from 'enzyme';
import * as React from 'react';

import LocalDataSource from '../src/DataGrid/DataSource/LocalDataSource';
import { validColumnsSample } from './utils/columns';
import localData from './utils/localData';

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

  test('Should contain data', () => {
    const component = shallow(
      <LocalDataSource
        source={localData}
        columns={validColumnsSample}
      />
    );
    console.log(component.state('data'));
    expect(component.state('data')).toEqual(localData);
  });
});
