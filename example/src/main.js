import Grid from '../../src/Grid/Grid';
import React from 'react';
import RemoteDataSource from '../../src/Grid/RemoteDataSource';
import { TableCell, TableRow } from 'material-ui/Table';

const columns = [
  {
    Label: 'Order ID',
    Name: 'OrderID',
    Sortable: true,
    SortOrder: 1,
    SortDirection: 'Descending',
    IsKey: true,
    DataType: 'numeric',    
    Filtering: true
  },
  {
    Label: 'Customer Name',
    Name: 'CustomerName',
    Searchable: true,
    Aggregate: 'Count',
    Filtering: true
  },
  {
    Label: 'Shipped Date',
    Name: 'ShippedDate',
    DataType: 'datetime',
    Filtering: true
  },
  {
    Label: 'Shipper City',
    Name: 'ShipperCity',
  },
  {
    Label: 'Amount',
    Name: 'Amount',
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
                { row.ShippedDate }
              </TableCell>
              <TableCell padding = { 'default' }>
                { row.ShipperCity }
              </TableCell>
              <TableCell padding = { 'default' }>
                { row.Amount }
              </TableCell>
            </TableRow>
        } 
        rowsPerPage = { 10 } 
        showTopPager = { true }
        showBottomPager = { true }
        footerRenderer = {
          aggregates => 
            <TableRow>
              <TableCell>Total: </TableCell>
              <TableCell> { aggregates && aggregates.CustomerName } </TableCell>
              <TableCell> ~~~ </TableCell>
              <TableCell> ~~~ </TableCell>
            </TableRow>
        }
      >
      </Grid>
    );
  }
}