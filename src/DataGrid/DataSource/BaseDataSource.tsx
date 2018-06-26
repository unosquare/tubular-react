import * as React from 'react';
import { debounce } from 'lodash';

import ColumnModel from '../Models/ColumnModel';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';

import IBaseDataSourceState from "./IBaseDataSourceState";
import { DataSourceContext } from "./DataSourceContext";

export default abstract class BaseDataSource extends React.Component<{}, IBaseDataSourceState> {
    public state = this.setInitialState({
        aggregate: {},
        data: [] as any,
        filteredRecordCount: 0,
        page: 0,
        searchText: '',
        totalRecordCount: 0,
        isLoading: false,
        error: null as any
    });

    constructor(props: any) {
        super(props);

        this.handleSearchText = debounce(this.handleSearchText, 500);
    }

    public abstract getAllRecords(request: GridRequest): Promise<object>;

    public parsePayload(row: any, columns: any[]) {
        return columns.reduce((obj: any, column: any, key: any) => {
            obj[column.Name] = row[key] || row[column.Name];

            return obj;
        }, {});
    }

    public retrieveData(options: any = {}): Promise<any> {
        this.setState({ isLoading: true });
        const columns = options.columns || this.state.columns;
        const itemsPerPage = options.itemsPerPage || this.state.itemsPerPage;
        const page = typeof options.page === 'undefined' ? this.state.page : options.page;
        const searchText = typeof options.searchText === 'undefined' ? this.state.searchText : options.searchText;

        return this.getAllRecords(new GridRequest(columns, itemsPerPage, page, searchText))
            .then((response: GridResponse) => {
                this.setState({
                    aggregate: response.Aggregate,
                    data: response.Payload,
                    filteredRecordCount: response.FilteredRecordCount || 0,
                    totalRecordCount: response.TotalRecordCount || 0,
                    columns: columns,
                    itemsPerPage: itemsPerPage,
                    page: page,
                    searchText: searchText,
                    isLoading: false,
                    error: null
                });
            }, (reject: any) => this.setState({ isLoading: false, error: reject.message || reject }))
            .catch((err: any) => this.setState({ isLoading: false, error: err }));
    }

    public componentDidMount() {
        this.retrieveData();
    }

    public getActions() {
        return {
            updateColumns: (columns: ColumnModel[]) =>
                this.retrieveData({ columns }),
            updateSearchText: (searchText: string) => {
                if (!searchText) {
                    this.retrieveData({ searchText });
                } else {
                    this.setState({ searchText });
                    this.handleSearchText(searchText);
                }
            },
            updatePage: (page: number) =>
                this.retrieveData({ page }),
            updateItemPerPage: (itemsPerPage: number) =>
                this.retrieveData({ itemsPerPage }),
            export: (allRows: boolean, exportFunc: any) => {
                if (this.state.filteredRecordCount === 0) { return; }

                if (allRows) {
                    this.getAllRecords(new GridRequest(this.state.columns, -1, 0, this.state.searchText))
                        .then(({ Payload }: any) => exportFunc(Payload, this.state.columns));
                } else {
                    exportFunc(this.state.data, this.state.columns);
                }
            },
            request: (gridRequest: GridRequest) =>
                this.getAllRecords(gridRequest)
        };
    }

    public handleSearchText(searchText: string) {
        this.retrieveData({ searchText });
    }

    abstract setInitialState(value: any): IBaseDataSourceState;

    abstract getWrappedComponent(): any;

    public render() {
        const WrappedComponet = this.getWrappedComponent();

        return (
            <DataSourceContext.Provider value={{
                dataSource: { ...this.state },
                activeColumn: null,
                actions: this.getActions()
            }}>
                <WrappedComponet error={this.state.error} />
            </DataSourceContext.Provider>
        );
    }
}
