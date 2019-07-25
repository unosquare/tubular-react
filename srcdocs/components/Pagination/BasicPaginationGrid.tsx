import * as React from 'react';
import { DataGrid } from '../../../src';
import { ToolbarOptions } from '../../../src/Toolbar/ToolbarOptions';
import columns from '../../utils/columns';

export default () => {
    const toolbarOptions = new ToolbarOptions({
        advancePagination: false,
        bottomPager: true,
        exportButton: false,
        printButton: false,
        searchText: false,
        topPager: true,
    });

    return (
        <DataGrid
            columns={columns}
            dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
            gridName='Basic Grid'
            toolbarOptions={toolbarOptions}
        />
    );
};
