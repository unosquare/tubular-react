import * as React from 'react';
import Transformer, {
    ColumnModel, CompareOperators,
    GridRequest, GridResponse, IDataGridStorage,
    IFilterWrapper, ITubularHttpClient, LocalStorage,
    NullStorage, parsePayload, TubularHttpClient,
} from 'tubular-common';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { IDataGridApi } from '../DataGridInterfaces/IDataGridApi';
import { IDataGridConfig } from '../DataGridInterfaces/IDataGridConfig';

const getRemoteDataSource = (request: string | Request | ITubularHttpClient) =>
    async (gridRequest: GridRequest): Promise<GridResponse> => {
        const httpCast = request as ITubularHttpClient;
        const httpClient: ITubularHttpClient = httpCast.request
            ? httpCast
            : new TubularHttpClient(request);

        const data = await httpClient.fetch(gridRequest);
        if (!TubularHttpClient.isValidResponse(data)) {
            throw new Error('Server response is a invalid Tubular object');
        }

        data.Payload = data.Payload
            .map((row: any) => parsePayload(row, gridRequest.Columns));

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
    (
        initColumns: ColumnModel[],
        config: Partial<IDataGridConfig>,
        source: any[] | string | Request | ITubularHttpClient,
        deps?: any[],
    ): IDataGrid => {

        const [isLoading, setIsLoading] = React.useState(false);
        const [getColumns, setColumns] = React.useState<ColumnModel[]>(initColumns);
        const [initialized, setInitialized] = React.useState(false);
        const [getActiveColumn, setActiveColumn] = React.useState<ColumnModel>(null);
        const [getMultiSort, setMultiSort] = React.useState(false);
        const [getItemsPerPage, setItemsPerPage] = React.useState<number>(config.itemsPerPage || 10);
        const [getStorage] = React.useState<IDataGridStorage>(config.storage || new NullStorage());
        const [getPage, setPage] = React.useState<number>(config.page || 0);
        const [getSearchText, setSearchText] = React.useState<string>(config.searchText || '');
        const [getError, setError] = React.useState(null);
        const getAllRecords = source instanceof Array ? getLocalDataSource(source) : getRemoteDataSource(source);

        const [getState, setState] = React.useState({
            aggregate: null,
            data: [],
            filteredRecordCount: 0,
            totalRecordCount: 0,
        });

        if (getStorage instanceof LocalStorage) {
            getStorage.setGridName(config.gridName);
        }

        const handleKeyDown = (event: any) => {
            if (event.key === 'Control' && !getMultiSort) {
                setMultiSort(true);
            }
        };

        const handleKeyUp = (event: any) => {
            if (event.key === 'Control' && getMultiSort) {
                setMultiSort(false);
            }
        };

        const api: IDataGridApi = {
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
            sortColumn: (property: string) => {
                const columns = ColumnModel.sortColumnArray(
                    property,
                    [...getColumns],
                    getMultiSort,
                );

                setColumns(columns);
            },
            updateItemPerPage: (itemsPerPage: number) => {
                if (getItemsPerPage !== itemsPerPage) {
                    setItemsPerPage(itemsPerPage);
                }
            },
            updateSearchText: (searchText: string) => {
                if (getSearchText !== searchText) {
                    setSearchText(searchText);
                }
            },
        };

        let dependencies = [getColumns, getPage, getSearchText, getItemsPerPage, source];

        if (deps) {
            dependencies = dependencies.concat(deps);
        }

        React.useEffect(() => {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);

            return (() => {
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('keyup', handleKeyUp);
            });
        }, [getMultiSort]);

        React.useEffect(() => {
            api.processRequest();
        }, dependencies);

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
