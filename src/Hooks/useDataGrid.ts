import * as React from 'react';
import Transformer, { ColumnModel, CompareOperators, GridRequest, GridResponse } from 'tubular-common';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { IDataGridApi } from '../DataGridInterfaces/IDataGridApi';
import { LocalStorage } from '../Storage';
import { NullStorage } from '../Storage/NullStorage';
import ITubularHttpClient from '../utils/ITubularHttpClient';
import TubularHttpClient from '../utils/TubularHttpClient';

const getRemoteDataSource = (request: string | Request | ITubularHttpClient) =>
    async (gridRequest: GridRequest): Promise<GridResponse> => {
        const httpCast = request as ITubularHttpClient;
        let httpClient: ITubularHttpClient;

        if (httpCast.request) {
            httpClient = httpCast;
        } else {
            httpClient = new TubularHttpClient(request);
        }

        const data = await httpClient.fetch(gridRequest);
        if (!TubularHttpClient.isValidResponse(data)) {
            throw new Error('Server response is a invalid Tubular object');
        }

        data.Payload = data.Payload.map((row: any) => TubularHttpClient.parsePayload(row, gridRequest.Columns));

        return data;
    };

const getLocalDataSource = (source: any[]) =>
    (request: GridRequest): Promise<GridResponse> => {
        return new Promise((resolve, reject) => {
            try {
                resolve(Transformer.getResponse(request, source));
            } catch (error) {
                reject(error);
            }
        });
    };

const useDataGrid =
    (initColumns: ColumnModel[], config: any, source: any[] | string | Request | ITubularHttpClient)
        : IDataGrid => {

        const [isLoading, setIsLoading] = React.useState(false);
        const [getColumns, setColumns] = React.useState(initColumns);
        const [initialized, setInitialized] = React.useState(false);
        const [getActiveColumn, setActiveColumn] = React.useState(null);
        const [getMultiSort, setMultiSort] = React.useState(false);
        const [getItemsPerPage, setItemsPerPage] = React.useState(config.itemsPerPage || 10);
        const [getStorage] = React.useState(config.storage || new NullStorage());
        const [getPage, setPage] = React.useState(config.page || 0);
        const [getSearchText, setSearchText] = React.useState(config.searchText || '');
        const [getError, setError] = React.useState(null);
        const getAllRecords = source instanceof Array ? getLocalDataSource(source) : getRemoteDataSource(source);

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
                        await getAllRecords(new GridRequest(getColumns, -1, 0, getSearchText));
                    payload = Payload;
                }

                exportFunc(payload, getColumns);
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
                    const response: GridResponse = await getAllRecords(request);

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
            setActiveColumn,
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
