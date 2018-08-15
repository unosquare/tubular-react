import IconButton from '@material-ui/core/IconButton';
import { createMount } from '@material-ui/core/test-utils';
import Toolbar from '@material-ui/core/Toolbar';
import CloudDownload from '@material-ui/icons/CloudDownload';
import PrintIcon from '@material-ui/icons/Print';

import GridToolbar from '../src/DataGrid/GridToolbar';

import * as React from 'react';

import { ToolbarOptions } from '../src';
jest.mock('../src/DataSource/DataSourceContext');

describe('<GridToolbar/>', () => {
  let mount;
  let toolbarOptions;

  beforeEach(() => {
    jest.resetModules();
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('should render a Toolbar', () => {
    const wrapper = mount(
      <GridToolbar
        toolbarOptions={new ToolbarOptions()}
        gridName={'testGrid'}
      />
    );
    expect(wrapper.find(Toolbar)).toHaveLength(1);
  });

  describe('isExportEnabled', () => {
    test('should render a export button when is set to true', () => {
      const wrapper = mount(
        <GridToolbar
          toolbarOptions={new ToolbarOptions()}
          gridName={'testGrid'}
        />
      );
      expect(wrapper.find(IconButton).find(CloudDownload)).toHaveLength(1);
    });

    test('should not render a export button when is set to false', () => {
      toolbarOptions = new ToolbarOptions();
      toolbarOptions.exportButton = false;
      const wrapper = mount(
        <GridToolbar
          toolbarOptions={toolbarOptions}
          gridName={'testGrid'}
        />
      );
      expect(wrapper.find(IconButton).find(DownloadIcon)).toHaveLength(0);
    });
  });

  describe('isPrintEnabled', () => {
    test('should render a print button when is set to true', () => {
      const wrapper = mount(
        <GridToolbar
          toolbarOptions={new ToolbarOptions()}
          gridName={'testGrid'}
        />
      );
      expect(wrapper.find(IconButton).find(PrintIcon)).toHaveLength(1);
    });

    test('should not render a print button when is set to false', () => {
      toolbarOptions = new ToolbarOptions();
      toolbarOptions.printButton = false;
      const wrapper = mount(
        <GridToolbar
          toolbarOptions={toolbarOptions}
          gridName={'testGrid'}
        />
      );
      expect(wrapper.find(IconButton).find(PrintIcon)).toHaveLength(0);
    });
  });
});
