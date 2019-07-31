import { fireEvent, render, waitForDomChange } from '@testing-library/react';
import * as React from 'react';
import { DataGrid } from '../src/DataGrid';
import { LocalStorage } from '../src/Storage/LocalStorage';
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

describe('DataGrid', () => {

  const getPaginatorButtons = (paginator) => {
    const paginatorButtons = paginator.querySelectorAll('div.MuiTablePagination-actions button');
    const back = paginatorButtons[0] as HTMLElement;
    const next = paginatorButtons[1] as HTMLElement;

    return {
      back,
      next,
    };
  };

  const getGridStructure = (container) => {

    const tables = container.getElementsByClassName('MuiTable-root');

    const topPaginator = tables[0] as HTMLElement;
    const dataGrid = tables[1] as HTMLElement;
    const bottomPaginator = tables[2] as HTMLElement;

    return {
      bottomPaginator: { ...getPaginatorButtons(bottomPaginator) },
      dataGrid,
      topPaginator: { ...getPaginatorButtons(topPaginator) },
    };
  };

  describe('api interactions with DOM', () => {
    test('it should navigate over pages properly', async () => {
      const FakeDataGrid = () => (
        <DataGrid
          columns={validColumnsSample}
          dataSource={localData}
          gridName='LocalDataGrid'
          storage={new LocalStorage()}
        />
      );

      const { container } = render(<FakeDataGrid />);
      const gridStructure = getGridStructure(container);

      expect(gridStructure.dataGrid.querySelector('tbody').querySelectorAll('tr').length).toBe(0);
      await waitForDomChange({ container: container.getElementsByTagName('tbody')[0] });
      expect(gridStructure.dataGrid.querySelector('tbody').querySelectorAll('tr').length).toBe(10);

      fireEvent.click(gridStructure.topPaginator.next);
      await waitForDomChange({ container: gridStructure.dataGrid });
      expect(gridStructure.dataGrid.querySelector('tbody').querySelectorAll('tr').length).toBe(10);

      fireEvent.click(gridStructure.topPaginator.next);
      await waitForDomChange({ container: gridStructure.dataGrid });
      expect(gridStructure.dataGrid.querySelector('tbody').querySelectorAll('tr').length).toBe(2);
    });
  });
});
