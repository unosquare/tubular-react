import Grid from '../../src/Grid/Grid';
import * as React from 'react';
import * as RemoteDataSource from '../../src/Grid/RemoteDataSource';
import * as moment from 'moment';
import { TableCell, TableRow } from 'material-ui/Table';

const columns = [
  {
    Label: 'Order ID',
    Name: 'OrderID',
    Sortable: true,
    SortOrder: 1,
    SortDirection: 'Ascending',
    IsKey: true,
    DataType: 'numeric',    
    Filtering: true,
    ssdasd: true
  },
  {
    Label: 'Customer Name',
    Name: 'CustomerName',
    Sortable: true,
    SortOrder: -1,
    SortDirection: 'None',
    Searchable: true,
    Aggregate: 'Count',
    Filtering: true
  },
  {
    Label: 'Shipped Date',
    Name: 'ShippedDate',
    Sortable: true,
    SortOrder: -1,
    SortDirection: 'None',
    DataType: 'datetime',
    Filtering: true
  },
  {
    Label: 'Shipper City',
    Name: 'ShipperCity'
  },
  {
    Label: 'Amount',
    Name: 'Amount',
    Sortable: true,
    SortOrder: -1,
    SortDirection: 'None',
    DataType: 'numeric'
  }
];

export default class Main extends React.Component {
  render() {
    const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns);
    
    return (
      <Grid dataSource={ dataSource } 
        gridName = 'Motorhead'
        bodyRenderer = {
          (row, index) => 
            <TableRow hover key = { index }>
              <TableCell padding = { 'default' }>
                { row.OrderID }
              </TableCell>
              <TableCell padding = { 'default' }>
                { row.CustomerName }
              </TableCell>
              <TableCell padding = { 'default' }>
                { moment(row.ShippedDate).format('MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
              <TableCell padding = { 'default' }>
                { row.ShipperCity }
              </TableCell>
              <TableCell padding = { 'default' }>
                { row.Amount || 0 }
              </TableCell>
            </TableRow>
        } 
        rowsPerPage = { 10 } 
        showTopPager
        showBottomPager
        showPrintButton
        showExportButton
        footerRenderer = {
          aggregates => 
            <TableRow>
              <TableCell>Total: </TableCell>
              <TableCell> { aggregates && aggregates.CustomerName } </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
        }
      >
      </Grid>
    );
  }
}