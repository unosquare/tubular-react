import * as React from 'react';
import { DataGrid } from '../../src';
import { LocalStorage } from '../../src/Storage';
import columns from '../utils/columns';

export default () => (
    <div className='root'>
        <DataGrid
            columns={columns}
            dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
            gridName='LocalDataGrid'
            storage={new LocalStorage()}
        />
    </div>
);
