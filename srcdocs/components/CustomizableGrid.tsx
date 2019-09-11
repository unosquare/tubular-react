import * as React from 'react';
import { LocalStorage } from 'tubular-common';
import { DataGrid } from '../../src';
import columns from '../utils/columns';

export default ({
    toolbarOptions,
    storage = new LocalStorage(),
    gridColumns = columns,
    deps = [],
    onRowClick = () => null,
}) => (
        <DataGrid
            columns={gridColumns}
            dataSource='https://tubular.azurewebsites.net/api/orders/paged'
            gridName='Tubular Grid'
            toolbarOptions={toolbarOptions}
            storage={storage}
            deps={deps}
            onRowClick={onRowClick}
        />
    );
