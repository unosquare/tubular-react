import * as React from 'react';
import { ColumnModel, CompareOperators, GridRequest } from 'tubular-common';
import IBaseDataSourceState from '../DataSource/IBaseDataSourceState';
import NullStorage from '../DataSource/NullStorage';
import { LocalStorage } from '../DataSource';

const useDataGrid = (initColumns: ColumnModel[], config: any, getAllRecords) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [getAnchorFilter, setAnchorFilter] = React.useState(null);
    const [getColumns, setColumns] = React.useState(initColumns);
    const [initialized, setInitialized] = React.useState(false);
    const [getActiveColumn, setActiveColumn] = React.useState(null);
    const [getMultiSort, setMultiSort] = React.useState(false);
    const [getItemsPerPage, setItemsPerPage] = React.useState(config.itemsPerPage || 10);
    const [getStorage, setStorage] = React.useState(config.storage || new NullStorage());
    const [getPage, setPage] = React.useState(config.page || 0);

    const [getState, setState] = React.useState<any>({
        aggregate: null,
        data: [],
        error: null,
        filteredRecordCount: 0,
        totalRecordCount: 0,
    });

    if (getStorage instanceof LocalStorage) {
        getStorage.setGridName(config.gridName);
    }

    const processRequest = async () => {
        setIsLoading(true);

        try {
            try {
                // K2H: Check search text
                const request = new GridRequest(getColumns, getItemsPerPage, getPage, '');
                const response: any = await getAllRecords(request);

                const maxPage = Math.ceil(response.TotalRecordCount / getItemsPerPage);
                response.CurrentPage = response.CurrentPage > maxPage ? maxPage : response.CurrentPage;

                getStorage.setPage(response.CurrentPage - 1);
                getStorage.setColumns(getColumns);
                getStorage.setTextSearch('');

                setState({
                    aggregate: response.AggregationPayload,
                    data: response.Payload,
                    error: null,
                    filteredRecordCount: response.FilteredRecordCount || 0,
                    totalRecordCount: response.TotalRecordCount || 0,
                });

                setIsLoading(false);
                setInitialized(true);
                setPage(response.CurrentPage - 1);
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
        processRequest();
    };

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

    React.useEffect(() => {
        processRequest();
    }, [getColumns, getPage, getState.searchText, getItemsPerPage]);

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
            processRequest,
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
                retrieveData({ searchText });
            },
        },
        state: {
            ...getState,
            activeColumn: getActiveColumn,
            anchorFilter: getAnchorFilter,
            columns: getColumns,
            isLoading,
            itemsPerPage: getItemsPerPage,
            page: getPage,
        },
    };

};

export default useDataGrid;
