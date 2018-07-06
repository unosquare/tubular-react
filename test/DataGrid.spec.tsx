import { Table, TableBody, TableFooter, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createMount } from '@material-ui/core/test-utils';

import * as React from 'react';
import { validColumnsSample } from './utils/columns';
import { data, expected, simpleRecordsExpected } from './utils/data';
import DataGrid from '../src/DataGrid/DataGrid';

jest.mock('../src/DataSource/DataSourceContext');

describe('<DataGrid />', () => {
  let mount;

  beforeEach(() => {
    jest.resetModules();

    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('should exists', () => {
    expect(mount(<DataGrid />).exists()).toBeTruthy();
  });

  test('should render a Paper', () => {
    const wrapper = mount(<DataGrid />);
    expect(wrapper.find(Paper)).toHaveLength(1);
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
