import {IconButton, Table, TableBody, TableSortLabel} from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import GridHeader from '../src/DataGrid/GridHeader';

import * as React from 'react';

import context from '../src/DataSource/__mocks__/testHelpers';
jest.mock('../src/DataSource/DataSourceContext');

describe('<GridHeader />', () => {
  let mount;

  beforeEach(() => {
    jest.resetModules();

    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('When column name is clicked the column must be sorted', () => {
    const wrapper = mount(<Table><TableBody><GridHeader /></TableBody></Table>);

    const sortLabel = wrapper.find(TableSortLabel).at(0);

    sortLabel.simulate('click');
    expect(context.actions.sortColumn.mock.results[0].value).toEqual('OrderID');
  });

  test('When column filtered icon is clicked the active column must be set', () => {
    const wrapper = mount(<Table><TableBody><GridHeader /></TableBody></Table>);
    const sortLabel = wrapper.find(IconButton).at(0);

    sortLabel.simulate('click');
    expect(context.actions.setActiveColumn.mock.results[0].value).toEqual('CustomerName');
  });
});
