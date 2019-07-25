import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks';
import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import { DataGrid } from '../src/DataGrid';
import { IDataGrid } from '../src/DataGridInterfaces/IDataGrid';
import useDataGrid from '../src/Hooks/useDataGrid';
import { LocalStorage } from '../src/Storage/LocalStorage';
import { validColumnsSample } from './utils/columns';
import { localData } from './utils/localData';
import { testHook } from './utils/testHook';
import { act } from './utils/utils';

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

describe('useDataGrid', () => {
    let grid: IDataGrid;
    beforeEach(() => {
        act(() => {
            testHook(() => {
                grid = useDataGrid(validColumnsSample, {
                    gridName: 'test_useDataGrid',
                    storage: new LocalStorage(),
                }, localData);
            });
        });
    });

    describe('initialization', () => {
        test('should have an api and state', () => {
            expect(grid.api).toBeInstanceOf(Object);
            expect(grid.state).toBeInstanceOf(Object);
        });

        test('should have a valid aggregate', () => {
            expect(grid.state.aggregate).toBeDefined();
            expect(grid.state.aggregate).toMatchObject({ CustomerName: 22 });
        });

        test('should have proper anchorFilter', () => {
            expect(grid.state.anchorFilter).toBeNull();
        });

        test('should have proper column properties', () => {
            expect(grid.state.activeColumn).toBeNull();
            expect(grid.state.columns).toBeDefined();
            expect(grid.state.columns).toMatchObject(validColumnsSample);
        });

        test('should have proper data', () => {
            expect(grid.state.data).toBeDefined();
            expect(grid.state.data.length).toBe(10);
        });

        test('should have null error', () => {
            expect(grid.state.error).toBeNull();
        });

        test('should have proper filteredRecordCount', () => {
            expect(grid.state.filteredRecordCount).toBe(22);
        });

        test('should have proper isLoading', () => {
            expect(grid.state.isLoading).toBe(false);
        });

        test('should have proper itemsPerPage', () => {
            expect(grid.state.itemsPerPage).toBe(10);
        });

        test('should have proper multiSort', () => {
            expect(grid.state.multiSort).toBe(false);
        });

        test('should have proper page', () => {
            expect(grid.state.page).toBe(0);
        });

        test('should have proper searchText', () => {
            expect(grid.state.searchText).toBe('');
        });

        test('should have proper storage', () => {
            expect(grid.state.storage).toBeInstanceOf(LocalStorage);
        });

        test('should have proper totalRecordCount', () => {
            expect(grid.state.totalRecordCount).toBe(22);
        });
    });

    // TODO: complete this suite
    describe('api interaction directly (no DOM)', () => {
        test('it should navigate over pages properly', async () => {

            // NOTE: Using renderHook() from https://react-hooks-testing-library.com/
            // simply focus on the hook itself, meaning that side effects are not triggered
            // that's why I need to update page manually and then call processRequest
            const { result } = renderHook(() => useDataGrid(validColumnsSample, {
                gridName: 'test_useDataGrid',
                storage: new LocalStorage(),
            }, localData));

            expect(result.current).toBeDefined();
            await result.current.api.processRequest();

            expect(result.current.state.data.length).toBe(10);

            result.current.api.goToPage(1);
            await result.current.api.processRequest();

            expect(result.current.state.data.length).toBe(10);

            result.current.api.goToPage(2);
            await result.current.api.processRequest();

            expect(result.current.state.data.length).toBe(2);
            // expect(grid.state.page).toBe(2);
        });
    });

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
