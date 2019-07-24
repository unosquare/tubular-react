import * as React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

import { DataGrid, LocalStorage } from '../../src';
import columns from './data/columns';

// tslint:disable-next-line: no-var-requires
const format = require('date-fns/format');

const RemoteDataGrid: React.FunctionComponent = () => {
  const [getErrorMessage, setErrorMessage] = React.useState(null as string);
  const bodyRenderer = (row: any) => (
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
  );

  const footerRenderer = (aggregates: any) => (
    <TableRow>
      <TableCell>Total: </TableCell>
      <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  );

  return (
    <div className='root'>
      <DataGrid
        gridName='Tubular-React'
        columns={[...columns]}
        dataSource='https://tubular.azurewebsites.net/api/orders/paged'
        bodyRenderer={bodyRenderer}
        footerRenderer={footerRenderer}
        storage={new LocalStorage()}
      />
    </div>
  );
};

export default RemoteDataGrid;
