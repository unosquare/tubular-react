import * as React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

import {
  DataGridTable,
  GridToolbar,
  Paginator,
  ToolbarOptions,
} from '../../src';
import useDataGrid from '../../src/Hooks/useDataGrid';
import useLocalDataSource from '../../src/Hooks/useLocalDatasource';
import columns from './data/columns';
import localData from './data/localData';

// tslint:disable-next-line: no-var-requires
const format = require('date-fns/format');
const toolbarOptions = new ToolbarOptions({
  advancePagination: false,
  bottomPager: false,
  rowsPerPageOptions: [5, 10],
  topPager: false,
});

const CustomLayoutDataGrid: React.FunctionComponent = () => {

  const [getErrorMessage, setErrorMessage] = React.useState(null as string);
  const [dataSource] = useLocalDataSource(localData);

  const grid = useDataGrid(columns, {}, dataSource);

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
      <TableCell />
    </TableRow>
  );

  return (
    <>
      {getErrorMessage && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          style={{ paddingTop: '10px' }}
          open={true}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id='message-id'>{getErrorMessage}</span>}
        />
      )}
      <Typography style={{ margin: '25px', marginBottom: '10px' }} variant='h4'>No card grid!</Typography>
      <Paginator
        component='div'
        grid={grid}
      />
      <DataGridTable
        grid={grid}
        bodyRenderer={bodyRenderer}
        footerRenderer={footerRenderer}
        toolbarOptions={toolbarOptions}
      />
    </>
  );
};

export default CustomLayoutDataGrid;
