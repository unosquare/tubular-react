import * as React from 'react';
import { ColumnModel, GridRequest } from "tubular-common";
import IBaseDataSourceState from '../DataSource/IBaseDataSourceState';
import NullStorage from '../DataSource/NullStorage';

const useDataGrid = (initColumns: ColumnModel[], config: IBaseDataSourceState, getAllRecords) => {
    const [getState, setState] = React.useState<IBaseDataSourceState>({
        activeColumn: null,
        aggregate: null,
        anchorFilter: null,
        columns: initColumns,
        data: null as [],
        error: null,
        filteredRecordCount: 0,
        isLoading: false,
        itemsPerPage: config.itemsPerPage || 10,
        multiSort: false,
        page: config.page || 0,
        searchText: config.searchText || '',
        storage: config.storage || new NullStorage(),
        totalRecordCount: 0,
    });

    const processRequest = async (options: any) => {
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
                    isLoading: false,
                    itemsPerPage,
                    page: response.CurrentPage - 1,
                    totalRecordCount: response.TotalRecordCount || 0,
                });
            }
            catch (reject) {
                console.log("error first try")
            }
        }
        catch (err) {
            console.log("error second try")
        }
    };

    const retrieveData = (options: any) => {
        processRequest(options);
    };

    if (getState.data === null) {
        processRequest({});
    }

    return {
        api: {
            goToPage: (page: number) => {
                if (getState.page !== page) {
                    retrieveData({ page });
                }
            },
            processRequest,
            setActiveColumn: (column: any, event: React.MouseEvent<HTMLElement>) => {
                setState({
                    ...getState,
                    activeColumn: column,
                    anchorFilter: event ? event.currentTarget : null,
                },
                    // () => document.getElementById(column.Name).blur(),
                );
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
        },
        state: getState,
    };

};

export default useDataGrid;
