import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import * as React from 'react';
import { DataGridTable } from '../../src/DataGrid';
import useDataGrid from '../../src/Hooks/useDataGrid';
import { Paginator } from '../../src/Pagination';
import { renderDateTimeCell } from '../../src/utils';
import columns from './data/columns';
import localData from './data/localData';

const CustomLayoutDataGrid: React.FunctionComponent = () => { 

  const [getErrorMessage, setErrorMessage] = React.useState(null as string);
  const grid = useDataGrid(columns, {}, localData);

  const bodyRenderer = (row: any) => (
    <TableRow hover={true} key={row.OrderID}>
      <TableCell padding='default'>{row.OrderID}</TableCell>
      <TableCell padding='default'>{row.CustomerName}</TableCell>
      <TableCell padding='default'>
        {renderDateTimeCell(row.ShippedDate, 'MMMM Do yyyy, h:mm:ss a')}
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
      <Table>
        <TableHead>
          <TableRow>
            <Paginator
              component='div'
              grid={grid}
            />
          </TableRow>
        </TableHead>
      </Table>

      <DataGridTable
        grid={grid}
        bodyRenderer={bodyRenderer}
        footerRenderer={footerRenderer}
      />
    </>
  );
};

export default CustomLayoutDataGrid;
