import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Brightness7Rounded from '@material-ui/icons/Brightness7Rounded';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import Mood from '@material-ui/icons/Mood';
import format from 'date-fns/format';
import * as React from 'react';
import { DataGrid } from '../../src';
import columns from '../utils/columns';

export default () => {
  const body = (row: any) => (
    <TableRow hover={true} key={row.OrderID}>
      <TableCell padding='default'>{row.OrderID}</TableCell>
      <TableCell padding='default'>{row.CustomerName}</TableCell>
      <TableCell padding='default'>
        {format(row.ShippedDate, 'MMMM Do yyyy, h:mm:ss a')}
      </TableCell>
      <TableCell padding='default'>{row.ShipperCity}</TableCell>
      <TableCell padding='default' align={'right'}>
        {row.Amount || 0}
      </TableCell>
      <TableCell padding='default'>
        {row.IsShipped ? <CheckBox /> : <CheckBoxOutlineBlank />}
      </TableCell>
    </TableRow>
  );

  const footer = (aggregates: any) => (
    <TableRow>
      <TableCell>Total: </TableCell>
      <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
    </TableRow>
  );

  const moodAlert = () => alert('I can help you to add features to your datagrid.');
  const happyAlert = () => alert('Happy coding, have a nice day');

  return (
    <div className='root'>
      <DataGrid
        bodyRenderer={body}
        columns={columns}
        dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
        footerRenderer={footer}
        gridName='Additional Buttons'
      >
        <React.Fragment>
          <IconButton color='default' onClick={moodAlert}>
            <Mood />
          </IconButton>
          <IconButton color='default' onClick={happyAlert}>
            <Brightness7Rounded />
          </IconButton>
        </React.Fragment>
      </DataGrid>
    </div >
  );
};
