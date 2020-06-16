import Button from '@material-ui/core/Button';
import * as React from 'react';
import { LocalStorage } from 'tubular-common';
import { useGridRefresh } from 'tubular-react-common';
import { DataGrid, ToolbarOptions } from '../../src';
import columns from './data/columns';

const RemoteDataGrid: React.FunctionComponent = () => {
    const [refresh, forceRefresh] = useGridRefresh();
    const forceGridRefresh = () => forceRefresh();

    const rowClick = (row: any) => console.log('You clicked on a row: ', row);

    const toolbarButton = new ToolbarOptions({
        customItems: <Button onClick={forceGridRefresh}>Force refresh</Button>,
    });

    return (
        <DataGrid
            gridName="Tubular-React"
            columns={[...columns]}
            dataSource="https://tubular.azurewebsites.net/api/orders/paged"
            deps={[refresh]}
            onRowClick={rowClick}
            storage={new LocalStorage()}
            toolbarOptions={toolbarButton}
        />
    );
};

export default RemoteDataGrid;
