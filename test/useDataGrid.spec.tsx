import { ReactWrapper } from 'enzyme';
import IDataGrid from '../src/DataGridInterfaces/IDataGrid';
import LocalStorage from '../src/Storage/LocalStorage';
import useDataGrid from '../src/Hooks/useDataGrid';
import { validColumnsSample } from './utils/columns';
import { localData } from './utils/localData';
import { testHook } from './utils/testHook';
import { act } from './utils/utils';

let grid: IDataGrid;
let testComponent: ReactWrapper;
beforeEach(() => {
    act(() => {
        testComponent = testHook(() => {
            grid = useDataGrid(validColumnsSample, {
                gridName: 'test_useDataGrid',
                storage: new LocalStorage(),
            }, localData);
        });
    });
});

describe('useDataGrid', () => {
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
    xdescribe('api interaction', () => {
        test('it should change page', () => {

            grid.api.goToPage(2);

            act(() => {
                testComponent.update();
            });

            // TODO: find a way to wait for processRequest to
            // finished because enzyme is not really waiting for it
            // to be completed

            expect(grid.state.page).toBe(2);
        });
    });
});
