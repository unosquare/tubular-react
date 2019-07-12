import {
  IconButton,
  Table,
  TableBody,
  TableSortLabel,
} from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import GridHeader from '../src/DataGrid/GridHeader';

import * as React from 'react';

import { DataSourceContext } from '../src';
import MockContext from './utils/mockContext';

const wrappedTable = () => (
  (
    <DataSourceContext.Provider value={MockContext}>
      <Table>
        <TableBody>
          <GridHeader />
        </TableBody>
      </Table>
    </DataSourceContext.Provider>
  ));

describe('<GridHeader />', () => {
  let mount: any;

  beforeEach(() => {
    jest.resetModules();

    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('When column name is clicked the column must be sorted', () => {
    const wrapper = mount(wrappedTable());

    const sortLabel = wrapper.find(TableSortLabel).at(0);

    sortLabel.simulate('click');
    expect(MockContext.actions.sortColumn.mock.results[0].value).toEqual('OrderID');
  });

  test('When column filtered icon is clicked the active column must be set', () => {
    const wrapper = mount(wrappedTable());
    const sortLabel = wrapper.find(IconButton).at(0);

    sortLabel.simulate('click');
    expect(MockContext.actions.setActiveColumn.mock.results[0].value).toEqual(
      'CustomerName',
    );
  });
});
