import { ReactWrapper } from 'enzyme';
import { act } from './utils/utils';

import IBaseDataSourceState from '../src/DataSource/IBaseDataSourceState';
import LocalStorage from '../src/DataSource/LocalStorage';
import useDataGrid, { IDataGridApi } from '../src/Hooks/useDataGrid';
import useLocalDataSource from '../src/Hooks/useLocalDataSource';
import { validColumnsSample } from './utils/columns';
import { localData } from './utils/localData';
import { testHook } from './utils/testHook';

let grid: { api: IDataGridApi, state: IBaseDataSourceState };
let testComponent: ReactWrapper;
beforeEach(() => {
    act(() => {
        testComponent = testHook(() => {
            const [dataSource] = useLocalDataSource(localData);
            grid = useDataGrid(validColumnsSample, {
                gridName: 'test_useDataGrid',
                storage: new LocalStorage(),
            }, dataSource);
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

        test('should have proper column properties', () => {
            expect(grid.state.activeColumn).toBeNull();
            expect(grid.state.columns).toBeDefined();
            expect(grid.state.columns).toMatchObject(validColumnsSample);
        });

        test('should have proper data', () => {
            expect(grid.state.data).toBeDefined();
            expect(grid.state.data.length).toBe(10);
        });
    });

});
