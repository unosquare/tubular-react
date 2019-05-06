import * as React from 'react';
import { DataGridProvider, DataGridTable, ToolbarOptions, withRemoteDataSource } from '../../src';
import columns from '../utils/columns';

const toolbarOptions = new ToolbarOptions();
toolbarOptions.advancePagination = false;
toolbarOptions.exportButton = false;
toolbarOptions.printButton = false;
toolbarOptions.searchText = false;

const MyComponent = () => (
    <div className='root'>
        <DataGridProvider gridName='BasicFeatures' toolbarOptions={toolbarOptions}>
            <DataGridTable />
        </DataGridProvider>
    </div>
);

/*
 Use the component withRemoteDataSource to wrap your component
 and columns definition among the data obtained from the URL.

 withRemoteDataSource will set an initial context for your grid.
*/
export default withRemoteDataSource(MyComponent, columns, 'https://tubular.azurewebsites.net/api/orders/paged');
