import * as React from 'react';
import DataGrid, {
    ToolbarOptions,
    withRemoteDataSource,
} from '../../src';

import columns from '../utils/columns';

const toolbarOptions = {
    advancePagination: false,
    exportButton: false,
    printButton: false,
    searchText: false,
};

const MyComponent = () => (
    <div className='root'>
        <DataGrid
            gridName='Tubular-React'
            toolbarOptions={new ToolbarOptions(toolbarOptions)}
        />
    </div>
);

/*
 Use the component withRemoteDataSource to wrap your component
 and columns definition among the data obtained from the URL.

 withRemoteDataSource will set an initial context for your grid.
*/
export default withRemoteDataSource(MyComponent, columns, 'https://tubular.azurewebsites.net/api/orders/paged');
