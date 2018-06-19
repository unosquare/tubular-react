import * as React from 'react';

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
}

interface IProps {
    source: any;
    columns: ColumnModel[];
    itemsPerPage: number;
}

interface IContext extends IState {
    actions?: any;
}

const DataSourceContext = React.createContext<IContext>({
    actions: null,
    aggregate: null,
    columns: null,
    data: null,
    filteredRecordCount: null,
    itemsPerPage: null,
    page: null,
    searchText: null,
    totalRecordCount: null
});

export const DataSourceConsumer = DataSourceContext.Consumer;

export default abstract class BaseDataSource extends React.Component<IProps, IState> {
    public state = {
        aggregate: {},
        columns: this.props.columns,
        data: [] as any,
        filteredRecordCount: 0,
        itemsPerPage: this.props.itemsPerPage,
        page: 0,
        searchText: '',
        totalRecordCount: 0
    };

    public abstract getAllRecords(request: GridRequest): Promise<object>;

    public retrieveData() {
        const { columns, itemsPerPage, page, searchText } = this.state;

        // TODO: handle error
        this.getAllRecords(new GridRequest(columns, itemsPerPage, page, searchText))
            .then((response: GridResponse) => {
                this.setState({
                    aggregate: response.Aggregate,
                    data: response.Payload,
                    filteredRecordCount: response.FilteredRecordCount || 0,
                    totalRecordCount: response.TotalRecordCount || 0
                });
        });
    }

    public componentDidMount() {
        this.retrieveData();
    }

    public render() {
        return (
            <DataSourceContext.Provider value={{
                ...this.state,
                actions: {
                    retrieveData: this.retrieveData,
                    updateColumns: (columns: ColumnModel[]) => {
                        this.setState({ columns: columns }, this.retrieveData);
                    },
                    updateSearchText: (searchText: string) => {
                        this.setState({ searchText: searchText }, this.retrieveData);
                    },
                    updatePage: (page: number) => {
                        this.setState({ page: page }, this.retrieveData);
                    },
                    updateItemPerPage: (itemsPerPage: number) => {
                        this.setState({ itemsPerPage: itemsPerPage }, this.retrieveData);
                    },
                    request: (gridRequest: GridRequest) => this.getAllRecords(gridRequest)
                }
            }}>
                {this.props.children}
            </DataSourceContext.Provider>
        );
    }
}
