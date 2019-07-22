import * as React from 'react';
import { ColumnModel, CompareOperators, GridRequest } from 'tubular-common';
import IBaseDataSourceState from '../DataSource/IBaseDataSourceState';
import NullStorage from '../DataSource/NullStorage';
import { LocalStorage } from '../DataSource';

const useDataGrid = (initColumns: ColumnModel[], config: any, getAllRecords) => {

    const [getState, setState] = React.useState<IBaseDataSourceState>({
        activeColumn: null,
        aggregate: null,
        anchorFilter: null,
        columns: initColumns,
        data: [],
        error: null,
        filteredRecordCount: 0,
        initialized: false,
        isLoading: false,
        itemsPerPage: config.itemsPerPage || 10,
        multiSort: false,
        page: config.page || 0,
        searchText: config.searchText || '',
        storage: config.storage || new NullStorage(),
        totalRecordCount: 0,
    });

    if (getState.storage instanceof LocalStorage) {
        getState.storage.setGridName(config.gridName);
    }

    const processRequest = async (options: any) => {
        setState({
            ...getState,
            isLoading: true,
        });

        const columns = options.columns || getState.columns;
        const itemsPerPage = options.itemsPerPage || getState.itemsPerPage;
        const page =
            typeof options.page === 'undefined' ? getState.page : options.page;
        const searchText =
            typeof options.searchText === 'undefined'
                ? getState.searchText
                : options.searchText;

        try {
            try {
                const request = new GridRequest(columns, itemsPerPage, page, searchText);
                const response: any = await getAllRecords(request);

                const maxPage = Math.ceil(response.TotalRecordCount / itemsPerPage);
                response.CurrentPage = response.CurrentPage > maxPage ? maxPage : response.CurrentPage;

                getState.storage.setPage(response.CurrentPage - 1);
                getState.storage.setColumns(columns);
                getState.storage.setTextSearch(searchText);

                setState({
                    ...getState,
                    aggregate: response.AggregationPayload,
                    columns,
                    data: response.Payload,
                    error: null,
                    filteredRecordCount: response.FilteredRecordCount || 0,
                    initialized: true,
                    isLoading: false,
                    itemsPerPage,
                    page: response.CurrentPage - 1,
                    totalRecordCount: response.TotalRecordCount || 0,
                });
            }
            catch (reject) {
                console.log("error first try", reject)
            }
        }
        catch (err) {
            console.log("error second try")
        }
    };

    const retrieveData = (options: any) => {
        processRequest(options);
    };

    const initGrid = () => {
        const payload: any = {};

        if (getState.storage.getPage()) {
            payload.page = getState.storage.getPage();
        }

        const columns = getState.columns;
        const storedColumns = getState.storage.getColumns();

        if (storedColumns) {
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
        }

        payload.columns = columns;

        processRequest(payload);
    };

    if (!getState.initialized && !getState.isLoading) {
        initGrid();
    }

    return {
        api: {
            exportTo: (allRows: boolean, exportFunc: any) => {
                if (getState.filteredRecordCount === 0) {
                    return;
                }

                if (allRows) {
                    getAllRecords(
                        new GridRequest(getState.columns, -1, 0, getState.searchText),
                    ).then(({ Payload }: any) => exportFunc(Payload, getState.columns));
                } else {
                    exportFunc(getState.data, getState.columns);
                }
            },
            goToPage: (page: number) => {
                if (getState.page !== page) {
                    retrieveData({ page });
                }
            },
            handleFilterChange: (value: any) => {
                setState({
                    ...getState,
                    activeColumn: {
                        ...getState.activeColumn,
                        Filter: {
                            ...getState.activeColumn.Filter,
                            ...value,
                        },
                    },
                });
            },
            processRequest,
            setActiveColumn: (column: any, event: React.MouseEvent<HTMLElement>) => {
                setState({
                    ...getState,
                    activeColumn: column,
                    anchorFilter: event ? event.currentTarget : null,
                });
            },
            setFilter: (value: any) => {
                setState({ ...getState, anchorFilter: null });
                const columns = [...this.state.columns];
                const column = columns.find(
                    (c: ColumnModel) => c.Name === this.state.activeColumn.Name,
                );
                if (!column) {
                    return;
                }

                column.Filter = {
                    ...getState.activeColumn.Filter,
                    ...value,
                };

                this.retrieveData({ columns });
            },
            sortColumn: (property: string) => {
                const columns = ColumnModel.sortColumnArray(
                    property,
                    [...getState.columns],
                    getState.multiSort,
                );

                retrieveData({ columns });
            },
            updateItemPerPage: (itemsPerPage: number) => {
                if (getState.itemsPerPage !== itemsPerPage) {
                    retrieveData({ itemsPerPage });
                }
            },
            updateSearchText: (searchText: string) => {
                retrieveData({ searchText });
            },
        },
        state: getState,
    };

};

export default useDataGrid;
