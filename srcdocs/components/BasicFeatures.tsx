import * as React from 'react';
import { DataGrid } from '../../src';
import { LocalStorage } from 'tubular-common';
import columns from '../utils/columns';

export default () => (
    <DataGrid
        columns={columns}
        dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
        gridName='LocalDataGrid'
        storage={new LocalStorage()}
    />
);
