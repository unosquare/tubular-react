import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { DataGrid, LocalStorage, ToolbarOptions } from '../../src';
import useGridRefresh from '../../src/Hooks/useGridRefresh';
import columns from './data/columns';

const RemoteDataGrid: React.FunctionComponent = () => {
  const [refresh, forceRefresh] = useGridRefresh();
  const forceGridRefresh = () => forceRefresh();

  const rowClick = (row: any) => {
    console.log('You clicked on a row: ', row);
  };

  const bodyRenderer = (row: any, rowIndex: number, gridColumns: ColumnModel[], rowClickProxy: any) => (
    <TableRow hover={true} key={row.OrderID} onClick={rowClickProxy}>
      <TableCell padding='default'>{row.OrderID}</TableCell>
      <TableCell padding='default'>{row.CustomerName}</TableCell>
      <TableCell padding='default'>
        {format(parseISO(row.ShippedDate), 'M/d/yyyy h:mm a')}
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

  const toolbarButton = new ToolbarOptions({
    customItems: (
      <Button onClick={forceGridRefresh}>Force refresh</Button>
    ),
  });

  return (
      <DataGrid
        gridName='Tubular-React'
        columns={[...columns]}
        dataSource='https://tubular.azurewebsites.net/api/orders/paged'
        deps={[refresh]}
        bodyRenderer={bodyRenderer}
        onRowClick={rowClick}
        footerRenderer={footerRenderer}
        storage={new LocalStorage()}
        toolbarOptions={toolbarButton}
      />
  );
};

export default RemoteDataGrid;
