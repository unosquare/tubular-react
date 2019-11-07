import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    ColumnModel, CompareOperators,
    GridRequest, GridResponse, IDataGridStorage,
    IFilterWrapper, ITubularHttpClient, LocalStorage,
    NullStorage,
} from 'tubular-common';
import { ITbOptions } from '../HookTypes';
import { ITbApi } from '../HookTypes/ITbApi';
import { ITbInstance } from '../HookTypes/ITbInstance';
import { getLocalDataSource, getRemoteDataSource, tbId } from '../utils/helpers';

const createTbOptions = (tubularOptions?: Partial<ITbOptions>): ITbOptions => {
    const temp = tubularOptions || {};
    return {
        callbacks: temp.callbacks || { onError: () => { return; } },
        componentName: temp.componentName || tbId(),
        deps: temp.deps || null,
        pagination: temp.pagination || {
            itemsPerPage: 10,
            page: 0,
        },
        searchText: temp.searchText || '',
        storage: temp.storage || new NullStorage(),
    };
};
export const useTubular = (
    initColumns: ColumnModel[],
    source: any[] | string | Request | ITubularHttpClient,
    tubularOptions?: Partial<ITbOptions>): ITbInstance => {
    const tbOptions = createTbOptions(tubularOptions);

    const {
        componentName,
        pagination,
        callbacks,
        storage,
        deps,
        searchText,
    } = tbOptions;

    const [isLoading, setIsLoading] = React.useState(false);
    const [getColumns, setColumns] = React.useState<ColumnModel[]>(initColumns);
    const [isStorageLoaded, setIsStorageLoaded] = React.useState(false);
    const [getActiveColumn, setActiveColumn] = React.useState<ColumnModel>(null);
    const [getItemsPerPage, setItemsPerPage] = React.useState<number>(pagination.itemsPerPage || 10);
    const [getStorage] = React.useState<IDataGridStorage>(storage || new NullStorage());
    const [getPage, setPage] = React.useState<number>(pagination.page || 0);
    const [getSearchText, setSearchText] = React.useState<string>(searchText || '');
    const [getError, setError] = React.useState(null);
    const getAllRecords = source instanceof Array ? getLocalDataSource(source) : getRemoteDataSource(source);

    const [getState, setState] = React.useState({
        aggregate: null,
        data: [],
        filteredRecordCount: 0,
        totalRecordCount: 0,
    });

    if (getStorage instanceof LocalStorage) {
        getStorage.setGridName(componentName);
    }

    const api: ITbApi = {
        exportTo: async (allRows: boolean, exportFunc: (payload: any[], columns: ColumnModel[]) => void) => {
            if (getState.filteredRecordCount === 0) {
                return;
            }

            let payload: any[] = getState.data;
            if (allRows) {
                const { Payload } =
                    await getAllRecords(new GridRequest(getColumns, -1, 0, getSearchText));
                payload = Payload;
            }

            exportFunc(payload, getColumns);
        },
        goToPage: (page: number) => {
            if (getPage !== page) {
                setPage(page);
            }
        },
        handleFilterChange: (value: IFilterWrapper) => {
            setActiveColumn({
                ...getActiveColumn,
                Filter: {
                    ...getActiveColumn.Filter,
                    ...value as any,
                },
            } as ColumnModel);
        },
        processRequest: async () => {
            setIsLoading(true);

            try {
                const request = new GridRequest(getColumns, getItemsPerPage, getPage, getSearchText);
                const response: GridResponse = await getAllRecords(request);
                // console.log("Response: ", response);

                const maxPage = Math.ceil(response.TotalRecordCount / getItemsPerPage);
                let currentPage = response.CurrentPage > maxPage ? maxPage : response.CurrentPage;
                currentPage = currentPage === 0 ? 0 : currentPage - 1;

                getStorage.setPage(currentPage);
                getStorage.setColumns(getColumns);
                getStorage.setTextSearch(getSearchText);

                // TODO: Check this won't case an issue
                ReactDom.unstable_batchedUpdates(() => {

                    setState({
                        aggregate: response.AggregationPayload,
                        data: response.Payload,
                        filteredRecordCount: response.FilteredRecordCount || 0,
                        totalRecordCount: response.TotalRecordCount || 0,
                    });

                    setIsLoading(false);
                    setIsStorageLoaded(true);
                    setError(null);
                    setPage(currentPage);
                });
            }
            catch (err) {
                if (callbacks.onError) {
                    callbacks.onError(err);
                }

                setIsLoading(false);
                setError(err);
            }
        },
        setActiveColumn,
        setFilter: (value: IFilterWrapper) => {

            const columns = [...getColumns];
            const column = columns.find(
                (c: ColumnModel) => c.Name === getActiveColumn.Name,
            );
            if (!column) {
                return;
            }

            column.Filter = {
                ...getActiveColumn.Filter,
                ...value,
            };

            setColumns([...columns]);
        },
        sortColumn: (property: string, multiSort: boolean = false) => {
            const columns = ColumnModel.sortColumnArray(
                property,
                [...getColumns],
                multiSort,
            );

            setColumns(columns);
        },
        updateItemPerPage: (itemsPerPage: number) => {
            if (getItemsPerPage !== itemsPerPage) {
                setItemsPerPage(itemsPerPage);
            }
        },
        updateSearchText: (value: string) => {
            if (getSearchText !== value) {
                setSearchText(value);
            }
        },
    };

    let dependencies = [getColumns, getPage, getSearchText, getItemsPerPage, source];

    if (deps) {
        dependencies = dependencies.concat(deps);
    }

    React.useEffect(() => {
        if (!isLoading) {
            api.processRequest();
        }
    }, dependencies);

    React.useEffect(() => {
        setColumns(initColumns);
    }, [initColumns]);

    const initGrid = () => {
        if (getStorage.getPage()) {
            setPage(getStorage.getPage());
        }

        const storedColumns = getStorage.getColumns();

        if (storedColumns) {
            const columns = [...getColumns];

            storedColumns.forEach((column) => {
                const currentColumn = columns.find((col: ColumnModel) => col.Name === column.Name);

                if (!currentColumn) {
                    return;
                }

                currentColumn.Visible = column.Visible;

                if (currentColumn.Filter !== null && currentColumn.Filter.Text !== null) {
                    return;
                }

                if (column.Filter != null &&
                    column.Filter.Text != null &&
                    column.Filter.Operator !== CompareOperators.NONE) {
                    currentColumn.Filter = column.Filter;
                }
            });

            setColumns(columns);
        }

        setIsStorageLoaded(true);
    };

    if (!isStorageLoaded) {
        initGrid();
    }

    const state = {
        ...getState,
        activeColumn: getActiveColumn,
        columns: getColumns,
        error: getError,
        initialized: isStorageLoaded,
        isLoading,
        itemsPerPage: getItemsPerPage,
        page: getPage,
        searchText: getSearchText,
        storage: getStorage,
    };

    return { state, api };
};
