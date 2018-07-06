import { Table, TableBody, TableFooter, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import * as React from 'react';
import { validColumnsSample } from './utils/columns';
import { data, expected, simpleRecordsExpected } from './utils/data';

import IBaseDataSourceState from '../src/DataSource/IBaseDataSourceState';

const getDataGrid = (state = {}) => {
  jest.doMock('../src/DataSource/DataSourceContext', () => {
    return {
      DataSourceContext: {
        Consumer: (props) => props.children({
          actions: {},
          state: {
            page: 0,
            itemsPerPage: 10,
            aggregate: expected.aggregate,
            columns: validColumnsSample,
            data,
            filteredRecordCount: expected.filteredRecordCount,
            searchText: expected.searchText,
            isLoading: false
          } as IBaseDataSourceState 
        })
      }
    };
  });

  return require('../src/DataGrid/DataGrid').default;
};

describe('<DataGrid />', () => {
  let mount;
  const shallow = createShallow({dive: true});
  beforeEach(() => {
    jest.resetModules();

    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('should exists', () => {
    const DataGrid = getDataGrid();
    const wrapper = shallow(<DataGrid />).exists();
    expect(wrapper).toBeTruthy();
  });

  test('should render a Paper', () => {
    const DataGrid = getDataGrid();
    const wrapper = shallow(<DataGrid />);
    console.log(wrapper.debug());
    expect(wrapper.find(Paper)).toHaveLength(1);
  });
/*
  test('should render a Table', () => {
    const DataGrid = getDataGrid();
    const wrapper = mount(<DataGrid />).find(Table);
    expect(wrapper).toHaveLength(1);
  });

  test('should render TableBody', () => {
    const DataGrid = getDataGrid();
    const wrapper =  mount(<DataGrid />).find(TableBody);
    expect(wrapper).toHaveLength(1);
  });

  test('should render TableBody default ten rows', () => {
    const DataGrid = getDataGrid();
    const wrapper =  mount(<DataGrid />).find(TableBody).find(TableRow);
    expect(wrapper).toHaveLength(10);
  });

  test('should render TableFooter', () => {
    const DataGrid = getDataGrid();
    const wrapper =  mount(<DataGrid />).find(TableFooter);
    expect(wrapper).toHaveLength(1);
  });

  test('should render TableFooter one row', () => {
    const DataGrid = getDataGrid();
    const wrapper =  mount(<DataGrid />).find(TableFooter).find(TableRow);
    expect(wrapper).toHaveLength(1);
  });*/
});
