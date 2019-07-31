import { cleanup, Matcher, MatcherOptions, render } from '@testing-library/react';
import * as React from 'react';
import { DataGrid } from '../src/DataGrid';
import { LocalStorage } from '../src/Storage/LocalStorage';
import { ToolbarOptions } from '../src/Toolbar/ToolbarOptions';
import { validColumnsSample } from './utils/columns';
import { localData } from './utils/localData';

const SUPPRESSED_PREFIXES = [
  'Warning: Do not await the result of calling ReactTestUtils.act(...)',
  'Warning: An update to %s inside a test was not wrapped in act(...)',
];

function isSuppressedErrorMessage(message: string): boolean {
  return SUPPRESSED_PREFIXES.some((sp) => message.startsWith(sp));
}

const oldError = window.console.error;
window.console.error = (...args: any[]) => {
  if (!isSuppressedErrorMessage(args[0])) {
    oldError(...args);
  }
};

const setup = (toolbarOptions?: ToolbarOptions) => {

  const MyGrid = () => (
    <DataGrid
      columns={validColumnsSample}
      dataSource={localData}
      gridName='LocalDataGrid'
      storage={new LocalStorage()}
      toolbarOptions={toolbarOptions}
    />
  );

  return render(<MyGrid />);
};

afterEach(cleanup);

describe('DataGrid Component', () => {

  test('default render', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('top-paginator')).toBeDefined();
    expect(queryByTestId('bottom-paginator')).toBeDefined();
    expect(queryByTestId('linear-progress')).toBeDefined();

    expect(queryByTestId('grid-toolbar')).toBeDefined();
    expect(queryByTestId('export-button-csv')).toBeDefined();
    expect(queryByTestId('export-button-print')).toBeDefined();
    expect(queryByTestId('search-text-input')).toBeDefined();

    expect(queryByTestId('data-grid-table')).toBeDefined();
  });

  describe('ToolbarOptions', () => {
    test('when topPager is false, it should NOT render top paginator', () => {
      const { queryByTestId } = setup(new ToolbarOptions({ topPager: false }));
      expect(queryByTestId('top-paginator')).toBeNull();
      expect(queryByTestId('bottom-paginator')).toBeDefined();
    });

    test('when bottomPager is false, it should NOT render bottom paginator', () => {
      const { queryByTestId } = setup(new ToolbarOptions({ bottomPager: false }));
      expect(queryByTestId('top-paginator')).toBeDefined();
      expect(queryByTestId('bottom-paginator')).toBeNull();
    });

    test('when exportButton is false, it should NOT render export button', () => {
      const { queryByTestId } = setup(new ToolbarOptions({ exportButton: false }));
      expect(queryByTestId('export-button-csv')).toBeNull();
    });

    test('when printButton is false, it should NOT render print button', () => {
      const { queryByTestId } = setup(new ToolbarOptions({ printButton: false }));
      expect(queryByTestId('export-button-print')).toBeNull();
    });

    test('when searchText is false, it should NOT render search text input', () => {
      const { queryByTestId } = setup(new ToolbarOptions({ searchText: false }));
      expect(queryByTestId('search-text-input')).toBeNull();
    });

    test('when itemsPerPage is not set, it should defaults to 10 rows per page', () => {
      const { getByTestId } = setup();
      expect(getByTestId('top-paginator')
        .getElementsByClassName('MuiTablePagination-select MuiSelect-selectMenu')
        .item(0)
        .textContent).toBe('10');
    });

    test('when itemsPerPage is 50, it should have a default of 50 rows per page', () => {
      const { getByTestId } = setup(new ToolbarOptions({ itemsPerPage: 50 }));
      expect(getByTestId('top-paginator')
        .getElementsByClassName('MuiTablePagination-select MuiSelect-selectMenu')
        .item(0)
        .textContent).toBe('50');
    });
  });

  xdescribe('Behavior', () => {

    // TO DO
    // let TheGrid: any;

    // beforeEach(() => {
    //   TheGrid = () => (
    //     <DataGrid
    //       columns={validColumnsSample}
    //       dataSource={localData}
    //       gridName='LocalDataGrid'
    //       storage={new LocalStorage()}
    //     />
    //   );
    // });

    // test('it should navigate over pages properly', async () => {
    //   const { container } = render(<TheGrid />);
    //   const gridStructure = getGridStructure(container);

    //   expect(gridStructure.dataGrid.querySelector('tbody').querySelectorAll('tr').length).toBe(0);
    //   await waitForDomChange({ container: container.getElementsByTagName('tbody')[0] });
    //   expect(gridStructure.dataGrid.querySelector('tbody').querySelectorAll('tr').length).toBe(10);

    //   fireEvent.click(gridStructure.topPaginator.next);
    //   await waitForDomChange({ container: gridStructure.dataGrid });
    //   expect(gridStructure.dataGrid.querySelector('tbody').querySelectorAll('tr').length).toBe(10);

    //   fireEvent.click(gridStructure.topPaginator.next);
    //   await waitForDomChange({ container: gridStructure.dataGrid });
    //   expect(gridStructure.dataGrid.querySelector('tbody').querySelectorAll('tr').length).toBe(2);
    // });
  });
});
