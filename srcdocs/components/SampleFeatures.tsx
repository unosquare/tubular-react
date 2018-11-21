import * as React from 'react';

import { Snackbar, TableCell, TableRow } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import { format } from 'date-fns';
import DataGrid, {
    ToolbarOptions,
    withRemoteDataSource
} from '../../src';
import columns from '../utils/columns';

class SampleFeatures extends React.Component {
    public state = {
        errorMessage: null as any
    };

    private toolbarOptions = {
        advancePagination: false,
        exportButton: false,
        printButton: false,
        searchText: false,
    };

    public componentWillReceiveProps(nextProps: any) {
        this.setState({ errorMessage: nextProps.error });
    }

    public render() {
        const { errorMessage } = this.state;
        return (
            <div className='root'>
                {errorMessage &&
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        style={{ paddingTop: '10px' }}
                        open={true}
                        ContentProps={{ 'aria-describedby': 'message-id' }}
                        message={<span id='message-id'>{errorMessage}</span>}
                    />
                }
                <DataGrid
                    gridName='Tubular-React'
                    bodyRenderer={
                        (row: any, index: any) =>
                            <TableRow hover={true} key={index}>
                                <TableCell padding='default'>
                                    {row.OrderID}
                                </TableCell>
                                <TableCell padding='default'>
                                    {row.CustomerName}
                                </TableCell>
                                <TableCell padding='default'>
                                    {format(row.ShippedDate, 'MMMM Do YYYY, h:mm:ss a')}
                                </TableCell>
                                <TableCell padding='default'>
                                    {row.ShipperCity}
                                </TableCell>
                                <TableCell padding='default' numeric={true}>
                                    {row.Amount || 0}
                                </TableCell>
                                <TableCell padding='default'>
                                    {row.IsShipped ? <CheckBox />
                                        : <CheckBoxOutlineBlank />}
                                </TableCell>
                            </TableRow>
                    }
                    toolbarOptions={new ToolbarOptions(this.toolbarOptions)}
                    footerRenderer={
                        (aggregates: any) =>
                            <TableRow>
                                <TableCell>Total: </TableCell>
                                <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
                                <TableCell />
                                <TableCell />
                                <TableCell />
                            </TableRow>
                    }
                />
            </div>
        );
    }
}

export default withRemoteDataSource(SampleFeatures, columns, 'https://tubular.azurewebsites.net/api/orders/paged');
