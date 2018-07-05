import { Table, TableBody, TableFooter, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createMount } from '@material-ui/core/test-utils';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';
import { validColumnsSample } from './utils/columns';
import { data, expected, simpleRecordsExpected } from './utils/data';

const getDataGrid = (state = {}) => {
  jest.doMock('../src/DataSource/DataSourceContext', () => {
    return {
      DataSourceContext: {
        Consumer: (props) => props.children({
          actions: {},
          state: {
            aggregate: expected.aggregate,
            columns: validColumnsSample,
            data,
            filteredRecordCount: expected.filteredRecordCount,
            searchText: expected.searchText,
            isLoading: false
          }
        })
      }
    };
  });

  return require('../src/DataGrid/DataGrid').default;
};

describe('<DataGrid />', () => {
  let mount;
  const DataGrid = getDataGrid();
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    jest.resetModules();

    mock.onPost('url').reply(200, {
      ...simpleRecordsExpected
    });

    mount = createMount();
  });

  afterEach(() => {
    mock.reset();
    mount.cleanUp();
  });

  test('should render a Paper', () => {
    const wrapper = mount(<DataGrid />).find(Paper);
    expect(wrapper).toHaveLength(1);
  });

  test('should render a Table', () => {
    const wrapper = mount(<DataGrid />).find(Table);
    expect(wrapper).toHaveLength(1);
  });

  test('should render TableBody', () => {
    const wrapper =  mount(<DataGrid />).find(TableBody);
    expect(wrapper).toHaveLength(1);
  });

  test('should render TableBody default ten rows', () => {
    const wrapper =  mount(<DataGrid />).find(TableBody).find(TableRow);
    expect(wrapper).toHaveLength(10);
  });

  test('should render TableFooter', () => {
    const wrapper =  mount(<DataGrid />).find(TableFooter);
    expect(wrapper).toHaveLength(1);
  });

  test('should render TableFooter one row', () => {
    const wrapper =  mount(<DataGrid />).find(TableFooter).find(TableRow);
    expect(wrapper).toHaveLength(1);
  });
});
