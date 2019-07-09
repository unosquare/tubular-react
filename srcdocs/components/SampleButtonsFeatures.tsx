import * as React from 'react';

import { Snackbar, TableCell, TableRow } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Rounded from '@material-ui/icons/Brightness7Rounded';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import Mood from '@material-ui/icons/Mood';
import format from 'date-fns/format';
import DataGrid, { withRemoteDataSource } from '../../src';
import columns from '../utils/columns';

class SampleFeatures extends React.Component {
  public state = {
    errorMessage: null as any,
  };

  public componentWillReceiveProps(nextProps: any) {
    this.setState({ errorMessage: nextProps.error });
  }

  public render() {
    const { errorMessage } = this.state;
    return (
      <div className='root'>
        {errorMessage && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            style={{ paddingTop: '10px' }}
            open={true}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id='message-id'>{errorMessage}</span>}
          />
        )}
        <DataGrid
          bodyRenderer={(row: any) => (
            <TableRow hover={true} key={row.OrderID}>
              <TableCell padding='default'>{row.OrderID}</TableCell>
              <TableCell padding='default'>{row.CustomerName}</TableCell>
              <TableCell padding='default'>
                {format(row.ShippedDate, 'MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
              <TableCell padding='default'>{row.ShipperCity}</TableCell>
              <TableCell padding='default' align={'right'}>
                {row.Amount || 0}
              </TableCell>
              <TableCell padding='default'>
                {row.IsShipped ? <CheckBox /> : <CheckBoxOutlineBlank />}
              </TableCell>
            </TableRow>
          )}
          footerRenderer={(aggregates: any) => (
            <TableRow>
              <TableCell>Total: </TableCell>
              <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          )}
          gridName='SampleButtons'
        >
          <React.Fragment>
              <IconButton color='default' onClick={() => alert('I can help you to add features to your datagrid.')}>
                <Mood />
              </IconButton>
              <IconButton color='default' onClick={() => alert('Happy codes, have a nice day')}>
                <Brightness7Rounded />
              </IconButton>
            </React.Fragment>
        </DataGrid>
      </div >
    );
  }
}

export default withRemoteDataSource(
  SampleFeatures,
  columns,
  'https://tubular.azurewebsites.net/api/orders/paged',
);
