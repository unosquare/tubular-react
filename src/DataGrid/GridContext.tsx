import React, { createContext } from 'react';
import BaseDataSource from './DataSource/BaseDataSource';

const GridContext = React.createContext({});

class GridProvider extends React.Component {
    public state = {
        aggregate: {},
        data: [] as any,
        dataSource: BaseDataSource,
        errorMessage: '',
        filteredRecordCount: 0,
        gridName: '',
        open: false,
        page: 0,
        rowsPerPage: 0,
        rowsPerPageOptions: [] as any,
        searchText: '',
        showBottomPager: false,
        showExportButton: false,
        showPrintButton: false,
        showSearchText: false,
        showTopPager: false,
        totalRecordCount: 0,
    };

      public render() {
          return <GridContext.Provider value={this.state}/>;
        }
}

export default GridProvider;
