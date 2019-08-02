import * as React from 'react';
import { DataGrid } from '../../src';
import { LocalStorage } from '../../src/Storage';
import columns from '../utils/columns';

export default ({
    toolbarOptions,
    storage = new LocalStorage(),
}) => (
    <DataGrid
        columns={columns}
        dataSource='https://tubular.azurewebsites.net/api/orders/paged'
        gridName='Tubular Grid'
        toolbarOptions={toolbarOptions}
        storage={storage}
    />
);
