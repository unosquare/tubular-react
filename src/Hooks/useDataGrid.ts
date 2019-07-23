import * as React from 'react';
import { ColumnModel, CompareOperators, GridRequest } from 'tubular-common';
import { LocalStorage } from '../DataSource';
import IBaseDataSourceState from '../DataSource/IBaseDataSourceState';
import NullStorage from '../DataSource/NullStorage';

export interface IDataGridApi {
    exportTo: (allRows: boolean, exportFunc: any) => void;
    goToPage: (page: number) => void;
    handleFilterChange: (value: any) => void;
    processRequest: () => void;
    setActiveColumn: (column: any, event: React.MouseEvent<HTMLElement>) => void;
    setAnchorFilter: (anchorEl) => void;
    setFilter: (value: any) => void;
    sortColumn: (property: string) => void;
    updateItemPerPage: (itemsPerPage: number) => void;
    updateSearchText: (searchText: string) => void;
}

const useDataGrid =
    (initColumns: ColumnModel[], config: any, getAllRecords): { api: IDataGridApi, state: IBaseDataSourceState } => {

        const [isLoading, setIsLoading] = React.useState(false);
        const [getAnchorFilter, setAnchorFilter] = React.useState(null);
        const [getColumns, setColumns] = React.useState(initColumns);
        const [initialized, setInitialized] = React.useState(false);
        const [getActiveColumn, setActiveColumn] = React.useState(null);
        const [getMultiSort, setMultiSort] = React.useState(false);
        const [getItemsPerPage, setItemsPerPage] = React.useState(config.itemsPerPage || 10);
        const [getStorage] = React.useState(config.storage || new NullStorage());
        const [getPage, setPage] = React.useState(config.page || 0);
        const [getSearchText, setSearchText] = React.useState(config.searchText || '');
        const [getError, setError] = React.useState(null);

        const [getState, setState] = React.useState<any>({
            aggregate: null,
            data: [],
            filteredRecordCount: 0,
            totalRecordCount: 0,
        });

        if (getStorage instanceof LocalStorage) {
            getStorage.setGridName(config.gridName);
        }

        const api: IDataGridApi = {
            exportTo: async (allRows: boolean, exportFunc: any) => {
                if (getState.filteredRecordCount === 0) {
                    return;
                }

                let payload: any[] = getState.data;
                if (allRows) {
                    const { Payload } =
                        await getAllRecords(new GridRequest(getState.columns, -1, 0, getState.searchText));
                    payload = Payload;
                }

                exportFunc(payload, getState.columns);
            },
            goToPage: (page: number) => {
                if (getState.page !== page) {
                    setPage(page);
                }
            },
            handleFilterChange: (value: any) => {
                setActiveColumn({
                    ...getActiveColumn,
                    Filter: {
                        ...getActiveColumn.Filter,
                        ...value,
                    },
                });
            },
            processRequest: async () => {
                setIsLoading(true);

                try {
                    const request = new GridRequest(getColumns, getItemsPerPage, getPage, getSearchText);
                    const response: any = await getAllRecords(request);

                    const maxPage = Math.ceil(response.TotalRecordCount / getItemsPerPage);
                    response.CurrentPage = response.CurrentPage > maxPage ? maxPage : response.CurrentPage;

                    getStorage.setPage(response.CurrentPage - 1);
                    getStorage.setColumns(getColumns);
                    getStorage.setTextSearch(getSearchText);


                    setState({
                        aggregate: response.AggregationPayload,
                        data: response.Payload,
                        filteredRecordCount: response.FilteredRecordCount || 0,
                        totalRecordCount: response.TotalRecordCount || 0,
                    });

                    setIsLoading(false);
                    setInitialized(true);
                    setError(null);
                    setPage(response.CurrentPage - 1);
                }
                catch (err) {
                    if (config.onError) {
                        config.onError(err);
                    }

                    setIsLoading(false);
                    setError(err);
                }
            },
            setActiveColumn: (column: any, event: React.MouseEvent<HTMLElement>) => {
                setActiveColumn(column);
                setAnchorFilter(event ? event.currentTarget : null);
            },
            setAnchorFilter: (anchorEl) => {
                setAnchorFilter(anchorEl);
            },
            setFilter: (value: any) => {

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

                setAnchorFilter(null);
                setColumns([...columns]);
            },
            sortColumn: (property: string) => {
                const columns = ColumnModel.sortColumnArray(
                    property,
                    [...getColumns],
                    getMultiSort,
                );

                setColumns(columns);
            },
            updateItemPerPage: (itemsPerPage: number) => {
                if (getState.itemsPerPage !== itemsPerPage) {
                    setItemsPerPage(itemsPerPage);
                }
            },
            updateSearchText: (searchText: string) => {
                if (getSearchText !== searchText) {
                    setSearchText(searchText);
                }
            },
        };

        React.useEffect(() => {
            api.processRequest();
        }, [getColumns, getPage, getSearchText, getItemsPerPage]);

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

            setInitialized(true);
        };

        if (!initialized) {
            initGrid();
        }

        const state = {
            ...getState,
            activeColumn: getActiveColumn,
            anchorFilter: getAnchorFilter,
            columns: getColumns,
            error: getError,
            initialized,
            isLoading,
            itemsPerPage: getItemsPerPage,
            multiSort: getMultiSort,
            page: getPage,
            searchText: getSearchText,
            storage: getStorage,
        };

        const result = {
            api,
            state,
        };

        return result;
    };

export default useDataGrid;
