import * as React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableRow from '@material-ui/core/TableRow';
import { DataGridWithRemoteDataSource, renderCells, withRemoteDataSource } from '../../src';
import columns from './data/columns';

const Modal: React.FunctionComponent<any> = (
    { onClose, open, row = null }: any) => (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Sample Dialog</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {row && row.CustomerName}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );

export default () => {
    const bodyRenderer = (row, rowIndex, gridColumns, proxyClick) => (
        <TableRow hover={true} key={row.OrderID} onClick={proxyClick(row)}>
            {renderCells(gridColumns, row)}
        </TableRow>
    );

    const Grid = withRemoteDataSource(() => (
        <DataGridWithRemoteDataSource openModalOnClick={true} addIcon={true} bodyRenderer={bodyRenderer}>
            <Modal />
        </DataGridWithRemoteDataSource>
    ),
        columns,
        'https://tubular.azurewebsites.net/api/orders/paged',
    );

    return <Grid />;
};
