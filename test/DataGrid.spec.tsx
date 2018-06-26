import { Table, TableBody, TableCell, TableFooter, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createMount } from '@material-ui/core/test-utils';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';
import { ColumnDataType, CompareOperators } from '../src/DataGrid/Models/Column';
import ColumnModel from '../src/DataGrid/Models/ColumnModel';
import { simpleColumnsSample, validColumnsSample } from './utils/columns';
import { data, expected, onlyMicrosoftExpected, page2Expected, simpleRecordsExpected } from './utils/data';
import { microsoftSearchRequest, page2Request, simpleRequest } from './utils/requests';

const getDataGrid = (dataSource = {}) => {
  jest.doMock('../src/DataGrid/DataSource/DataSourceContext', () => {
    return {
      DataSourceContext: {
        Consumer: (props) => props.children({
          actions: {},
          dataSource: {
            aggregate: expected.aggregate,
            columns: validColumnsSample,
            data,
            filteredRecordCount: expected.filteredRecordCount,
            searchText: expected.searchText,
            isLoading: false,
          }
        })
      }
    };
  });

  return require('../src/DataGrid/DataGrid').default;
};

const getGridElement = (dataSource: any = {}) => {
  return getDataGrid(dataSource);
}

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

  test.only('should render a Paper', () => {
    const wrapper = mount(<DataGrid />).find(Paper);

    expect(wrapper).toHaveLength(1);
  });

  test('should render a Table', () => {
    const wrapper = mount(getGridElement()).find(Table);

    expect(wrapper).toHaveLength(1);
  });

  test('should have 1 rows at first', () => {
    const wrapper = mount(getGridElement()).find(Table).find(TableBody);

    expect(wrapper).toHaveLength(1);
  });

  test('should render all rows', () => {
    const wrapper = mount(getGridElement());
    wrapper.setState({ data });

    expect(wrapper.find(TableBody).find(TableRow)).toHaveLength(11);
  });

  test('should render the default body', () => {
    const wrapper = mount(getGridElement());

    const body = wrapper.find(Table).find(TableBody);
    expect(body).toHaveLength(1);
  });

  test('should only render not rows found row', () => {
    const wrapper = mount(getGridElement());
    const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

    expect(rowFooter).toHaveLength(1);
  });

  test('Should filter using search text', () => {
    mock.onPost('url', { ...microsoftSearchRequest }).reply(200, {
      ...onlyMicrosoftExpected
    });

    const component = mount(getGridElement({ searchText: 'Microsoft' }));
  });
});
