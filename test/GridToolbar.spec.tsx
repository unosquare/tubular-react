import IconButton from '@material-ui/core/IconButton';
import { createMount } from '@material-ui/core/test-utils';
import Toolbar from '@material-ui/core/Toolbar';
import CloudDownload from '@material-ui/icons/CloudDownload';
import PrintIcon from '@material-ui/icons/Print';
import * as React from 'react';
import { DataSourceContext, ToolbarOptions } from '../src';
import { DataGridProvider } from '../src/DataGrid/DataGridContext';
import { GridToolbar } from '../src/DataGrid/GridToolbar';
import MockContext from './utils/mockContext';

const toolbarOptions = new ToolbarOptions();
const wrappedToolbar = () => (
  <DataSourceContext.Provider value={MockContext}>
    <DataGridProvider toolbarOptions={toolbarOptions}>
      <GridToolbar />
    </DataGridProvider>
  </DataSourceContext.Provider>
);

describe('<GridToolbar/>', () => {
  let mount: any;

  beforeEach(() => {
    jest.resetModules();
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('should render a Toolbar', () => {
    const wrapper = mount(wrappedToolbar());
    expect(wrapper.find(Toolbar)).toHaveLength(1);
  });

  describe('isExportEnabled', () => {
    test('should render a export button when is set to true', () => {
      const wrapper = mount(wrappedToolbar());
      expect(wrapper.find(IconButton).find(CloudDownload)).toHaveLength(1);
    });

    test('should not render a export button when is set to false', () => {
      const mockToolbarOptions = new ToolbarOptions();
      mockToolbarOptions.exportButton = false;
      const wrapper = mount((
        <DataSourceContext.Provider value={MockContext}>
          <DataGridProvider toolbarOptions={mockToolbarOptions}>
            <GridToolbar />
          </DataGridProvider>
        </DataSourceContext.Provider>
      ),
      );
      expect(wrapper.find(IconButton).find(CloudDownload)).toHaveLength(0);
    });
  });

  describe('isPrintEnabled', () => {
    test('should render a print button when is set to true', () => {
      const wrapper = mount(wrappedToolbar());
      expect(wrapper.find(IconButton).find(PrintIcon)).toHaveLength(1);
    });

    test('should not render a print button when is set to false', () => {
      const mockToolbarOptions = new ToolbarOptions();
      mockToolbarOptions.printButton = false;
      const wrapper = mount((
        <DataSourceContext.Provider value={MockContext}>
          <DataGridProvider toolbarOptions={mockToolbarOptions}>
            <GridToolbar />
          </DataGridProvider>
        </DataSourceContext.Provider>
      ),
      );
      expect(wrapper.find(IconButton).find(PrintIcon)).toHaveLength(0);
    });
  });
});
