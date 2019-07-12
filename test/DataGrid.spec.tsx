import { Table, TableBody, TableFooter, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createMount } from '@material-ui/core/test-utils';

import * as React from 'react';
import { DataSourceContext } from '../src';
import DataGrid from '../src/DataGrid/DataGrid';
import MockContext from './utils/mockContext';

const wrappedGrid = () => (
  (
    <DataSourceContext.Provider value={MockContext}>
      <DataGrid />
    </DataSourceContext.Provider>
  )
);

describe('<DataGrid />', () => {
  let mount: any;

  beforeEach(() => {
    jest.resetModules();

    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('should exists', () => {
    expect(mount(wrappedGrid()).exists()).toBeTruthy();
  });

  test('should render a Paper', () => {
    const wrapper = mount(wrappedGrid());
    expect(wrapper.find(Paper)).toHaveLength(1);
  });

  test('should render a Table', () => {
    const wrapper = mount(wrappedGrid()).find(Table);
    expect(wrapper).toHaveLength(1);
  });

  test('should render TableBody', () => {
    const wrapper = mount(wrappedGrid()).find(TableBody);
    expect(wrapper).toHaveLength(1);
  });

  test('should render TableBody default ten rows', () => {
    const wrapper = mount(wrappedGrid())
      .find(TableBody)
      .find(TableRow);
    expect(wrapper).toHaveLength(10);
  });

  test('should render TableFooter', () => {
    const wrapper = mount(wrappedGrid()).find(TableFooter);
    expect(wrapper).toHaveLength(1);
  });

  test('should render TableFooter one row', () => {
    const wrapper = mount(wrappedGrid())
      .find(TableFooter)
      .find(TableRow);
    expect(wrapper).toHaveLength(1);
  });
});
