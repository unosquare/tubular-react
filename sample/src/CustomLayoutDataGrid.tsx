import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { ColumnModel, formatDate } from 'tubular-common';
import { ITbRow } from '../../src/BareBones/TbRow';
import { DataGridTable } from '../../src/DataGrid';
import useDataGrid from '../../src/Hooks/useDataGrid';
import { Paginator } from '../../src/Pagination';
import sampleColumns from './data/columns';
import localData from './data/localData';

const CustomTbRow: React.FunctionComponent<ITbRow> = ({ row, onRowClick }) => (
  <TableRow hover={true} key={row.OrderID}>
    <TableCell padding='default'>{row.OrderID} --</TableCell>
    <TableCell padding='default'>{row.CustomerName} ---</TableCell>
    <TableCell padding='default'>
      {formatDate(row.ShippedDate, 'M/d/yyyy h:mm a')} ---
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

const tbFooter = ({ aggregates }: any) => (
  <TableRow>
    <TableCell>Total: ddddddddddd</TableCell>
    <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
    <TableCell />
    <TableCell />
    <TableCell />
    <TableCell />
  </TableRow>
);

const CustomLayoutDataGrid: React.FunctionComponent = () => {

  const [getErrorMessage, setErrorMessage] = React.useState(null as string);
  const grid = useDataGrid(sampleColumns, {}, localData);

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
        rowComponent={CustomTbRow}
        footerComponent={tbFooter}
      />
    </>
  );
};

export default CustomLayoutDataGrid;
