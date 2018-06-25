import { Table, TableBody, TableCell, TableFooter, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { mount } from 'enzyme';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';
import { ColumnDataType, CompareOperators } from '../src/DataGrid/Models/Column';
import ColumnModel from '../src/DataGrid/Models/ColumnModel';
import { simpleColumnsSample, validColumnsSample } from './utils/columns';
import { data, expected, onlyMicrosoftExpected, page2Expected, simpleRecordsExpected } from './utils/data';
import { microsoftSearchRequest, page2Request, simpleRequest } from './utils/requests';

beforeEach(() => {
  jest.resetModules();
});

const getRemoteDataSourceWithContext = (context = {
  actions: {},
  aggregate: expected.aggregate,
  columns: validColumnsSample,
  data,
  filteredRecordCount: expected.filteredRecordCount,
  searchText: expected.searchText
}) => {
  jest.doMock('../src/DataGrid/DataSource/BaseDataSource', () => {
    return {
      DataSourceContext: {
        Consumer: (props) => props.children(context)
      }
    };
  });

  return require('../src/DataGrid/DataSource/RemoteDataSource').default;
};
const getGridWithContext = (context = {
  actions: {},
  state: {
    aggregate: expected.aggregate,
    columns: validColumnsSample,
    data,
    filteredRecordCount: expected.filteredRecordCount,
    searchText: expected.searchText
  }
}) => {
  jest.doMock('../src/DataGrid/GridContext', () => {
    return {
      GridContext: {
        Consumer: (props) => props.children(context)
      }
    };
  });

  return require('../src/DataGrid/DataGrid').default;
};

describe('<DataGrid />', () => {
  const RemoteDataSource = getRemoteDataSourceWithContext();
  const DataGrid = getGridWithContext();
  const mock = new MockAdapter(axios);
  const grid = (
    <RemoteDataSource
      source='url'
      columns={validColumnsSample}
    >
      <DataGrid
        gridName='Tubular-React'
      />
    </RemoteDataSource>);

  beforeEach(() => {
    mock.onPost('url').reply(200, {
      ...simpleRecordsExpected
    });
  });

  afterEach(() => {
    mock.reset();
  });

  test('should render a Paper', () => {
    const wrapper = mount(grid).find(Paper);

    expect(wrapper).toHaveLength(1);
  });

  test('should render a Table', () => {
    const wrapper = mount(grid).find(Table);
    expect(wrapper).toHaveLength(1);
  });

  test('should have 1 rows at first', () => {
    const wrapper = mount(grid).find(Table).find(TableBody);
    expect(wrapper).toHaveLength(1);
  });

  test('should render all rows', () => {
    const wrapper = mount(grid);
    wrapper.setState({ data });
    expect(wrapper.find(TableBody).find(TableRow)).toHaveLength(11);
  });

  test('should render the default body', () => {
    const wrapper = mount(grid);

    const body = wrapper.find(Table).find(TableBody);
    expect(body).toHaveLength(1);
  });

  test('should only render not rows found row', () => {
    const wrapper = mount(grid);
    const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

    expect(rowFooter).toHaveLength(1);
  });

  test('Should filter using search text', (done) => {
    mock.onPost('url', { ...microsoftSearchRequest }).reply(200, {
      ...onlyMicrosoftExpected
    });

    const component = mount(grid);
    (component.instance() as any).retrieveData()
    .then(() => {
      expect(component.state().data).toEqual(onlyMicrosoftExpected.Payload);
      done();
    });
  });
});
