import * as React from 'react';

import { IconButton, Snackbar, TableCell, TableRow } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank, InsertEmoticon } from '@material-ui/icons';

import { format } from 'date-fns';
import DataGrid, {
  ToolbarOptions,
  withLocalDataSource
} from '../../src';
import columns from './data/columns';
import localData from './data/localData';
import IGridState from './IGridState';

const toolbarOptions = new ToolbarOptions();

class CustomLayoutDataGrid extends React.Component<{}, IGridState> {
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
          toolbarOptions={toolbarOptions}
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
        >
        <IconButton>
            <InsertEmoticon />
        </IconButton>
        </DataGrid>
      </div>
    );
  }
}

export default withLocalDataSource(CustomLayoutDataGrid, columns, localData);
