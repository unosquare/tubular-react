import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';
import {
    DataGridWithRemoteDataSource,
    withRemoteDataSource,
} from '../../src';
import columns from '../utils/columns';

const RowDialog = ({ onClose, open, row }) => (
    <React.Fragment>
        <Dialog open={open} onClose={onClose}>
            {row ?
                <React.Fragment>
                    <DialogTitle>Customer: {row.CustomerName}</DialogTitle>
                    <DialogContent>This package comes from: {row.ShipperCity}</DialogContent>
                </React.Fragment>
                :
                <React.Fragment>
                    <DialogTitle>Add Entry</DialogTitle>
                    <DialogContent>Here you can add an entry!</DialogContent>
                </React.Fragment>
            }
        </Dialog>
    </React.Fragment>
);

const GridDialog = () => {
    const Grid = withRemoteDataSource(
        (prop: any) => (
            <DataGridWithRemoteDataSource
                openModalOnClick={true}
                addIcon={true}
                refresh={prop.refresh}
            >
                <RowDialog />
            </DataGridWithRemoteDataSource>
        ),
        columns,
        'https://tubular.azurewebsites.net/api/orders/paged');

    return (
        <div className='root'>
            <Grid />
        </div>
    );
};

export default GridDialog;
