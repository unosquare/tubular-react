import * as React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { ColumnModel, LocalStorage } from 'tubular-common';
import { DataGrid } from '../../../src';
import { ToolbarOptions } from '../../../src/Toolbar/ToolbarOptions';
import columns from '../data/columns';
import localData from '../data/localData';

const ModifyingColumns: React.FunctionComponent = () => {
    const [getErrorMessage, setErrorMessage] = React.useState(null as string);
    const [data, setData] = React.useState(localData);
    const [gridColumns, setGridColumns] = React.useState(columns);
    const [columnCounter, setColumnCounter] = React.useState(0);

    const handleAddColumn = () => {
        setGridColumns([
            ...gridColumns,
            new ColumnModel(`Column ${columnCounter}`, {
                Filterable: true,
                Searchable: true,
                Sortable: true,
            }),
        ]);

        setColumnCounter(columnCounter + 1);
    };

    const handleDeleteLastColumn = () => {
        setGridColumns([...gridColumns.filter(c => c.Name !== gridColumns[gridColumns.length - 1].Name)]);
    };

    const toolbarOptions = new ToolbarOptions({
        customItems: (
            <div>
                <Button onClick={handleAddColumn}>Add new column</Button>
                <Button onClick={handleDeleteLastColumn}>Delete last column</Button>
            </div>
        ),
    });

    return (
        <div className="root">
            {getErrorMessage && (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    style={{ paddingTop: '10px' }}
                    open={true}
                    ContentProps={{ 'aria-describedby': 'message-id' }}
                    message={<span id="message-id">{getErrorMessage}</span>}
                />
            )}
            <DataGrid
                columns={gridColumns}
                dataSource={data}
                gridName="ModifyingColumns"
                storage={new LocalStorage()}
                onError={setErrorMessage}
                toolbarOptions={toolbarOptions}
            />
        </div>
    );
};

export default ModifyingColumns;
