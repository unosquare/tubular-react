import * as React from 'react';
import { DataGrid } from '../../src';
import columns from '../utils/columns';

export default ({ toolbarOptions }: any) => (
    <DataGrid
        columns={columns}
        dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
        gridName='Tubular Grid'
        toolbarOptions={toolbarOptions}
    />
);
