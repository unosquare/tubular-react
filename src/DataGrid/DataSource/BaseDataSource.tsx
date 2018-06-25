import * as React from 'react';
import { debounce } from 'lodash';

import ColumnModel from '../Models/ColumnModel';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';

interface IState {
    aggregate: any;
    data: any[];
    filteredRecordCount: any;
    totalRecordCount: any;
    itemsPerPage: number;
    page: number;
    searchText: any;
    columns: ColumnModel[];
    isLoading: boolean;
    error: any;
}

interface IProps {
    source: any;
    columns: ColumnModel[];
    itemsPerPage?: number;
}

export interface IDataSourceContext {
    dataSource?: IState;
    actions?: any;
}

const DataSourceContext = React.createContext<IDataSourceContext>({
    actions: null,
    dataSource: null
});

export const DataSourceConsumer = DataSourceContext.Consumer;

export default abstract class BaseDataSource extends React.Component<IProps, IState> {
    public state = {
        aggregate: {},
        columns: this.props.columns,
        data: [] as any,
        filteredRecordCount: 0,
        itemsPerPage: this.props.itemsPerPage || 10,
        page: 0,
        searchText: '',
        totalRecordCount: 0,
        isLoading: false,
        error: null as any
    };

    constructor(props: IProps) {
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

        // TODO: handle error
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
                    isLoading: false
                });
            })
            .catch(err => this.setState({ error: err }));
    }

    public componentDidMount() {
        this.retrieveData();
    }

    public render() {
        return (
            <DataSourceContext.Provider value={{
                dataSource: { ...this.state },
                actions: {
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
                    request: (gridRequest: GridRequest) =>
                        this.getAllRecords(gridRequest)
                }
            }}>
                {this.props.children}
            </DataSourceContext.Provider>
        );
    }

    private handleSearchText(searchText: string) {
        this.retrieveData({ searchText });
    }
}
