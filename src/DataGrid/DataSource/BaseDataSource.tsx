import * as React from 'react';
import { debounce } from '../utils/debounce';

import ColumnModel from '../Models/ColumnModel';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';

import { DataSourceContext } from './DataSourceContext';
import IBaseDataSourceState from './IBaseDataSourceState';

export default abstract class BaseDataSource extends React.Component<{}, IBaseDataSourceState> {
    public state = this.setInitialState({
        aggregate: {},
        data: [] as any,
        error: null as any,
        filteredRecordCount: 0,
        isLoading: false,
        page: 0,
        searchText: '',
        totalRecordCount: 0
    });

    constructor(props: any) {
        super(props);

        this.handleSearchText = debounce(this.handleSearchText);
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
                    columns,
                    data: response.Payload,
                    error: null,
                    filteredRecordCount: response.FilteredRecordCount || 0,
                    isLoading: false,
                    itemsPerPage,
                    page,
                    searchText,
                    totalRecordCount: response.TotalRecordCount || 0,
                });
            }, (reject: any) => this.setState({ isLoading: false, error: reject.message || reject }))
            .catch((err: any) => this.setState({ isLoading: false, error: err }));
    }

    public componentDidMount() {
        this.retrieveData();
    }

    public getActions() {
        return {
            exportTo: (allRows: boolean, exportFunc: any) => {
                if (this.state.filteredRecordCount === 0) { return; }

                if (allRows) {
                    this.getAllRecords(new GridRequest(this.state.columns, -1, 0, this.state.searchText))
                        .then(({ Payload }: any) => exportFunc(Payload, this.state.columns));
                } else {
                    exportFunc(this.state.data, this.state.columns);
                }
            },
            request: this.getAllRecords,
            updateColumns: (columns: ColumnModel[]) =>
                this.retrieveData({ columns }),
            updateItemPerPage: (itemsPerPage: number) =>
                this.retrieveData({ itemsPerPage }),
            updatePage: (page: number) =>
                this.retrieveData({ page }),
            updateSearchText: (searchText: string) => {
                if (!searchText) {
                    this.retrieveData({ searchText });
                } else {
                    this.setState({ searchText });
                    this.handleSearchText(searchText);
                }
            },
        };
    }

    public handleSearchText(searchText: string) {
        this.retrieveData({ searchText });
    }

    public abstract setInitialState(value: any): IBaseDataSourceState;

    public abstract getWrappedComponent(): any;

    public render() {
        const WrappedComponet = this.getWrappedComponent();

        return (
            <DataSourceContext.Provider
                value={{
                    actions: this.getActions(),
                    activeColumn: null,
                    dataSource: { ...this.state }
                }}
            >
                <WrappedComponet error={this.state.error} />
            </DataSourceContext.Provider>
        );
    }
}
