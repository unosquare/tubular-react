import Grid from '../../src/Grid/Grid';
import React from 'react';
import RemoteDataSource from '../../src/Grid/RemoteDataSource';
import { TableCell, TableFooter, TableRow } from 'material-ui/Table';

const columns = [
  {
    'Label': 'Order ID',
    'Name': 'OrderID',
    'Sortable': true,
    'SortOrder': 1,
    'SortDirection': 'Ascending',
    'IsKey': true,
    'Searchable': false,
    'Visible': true,
    'Filter': { 
      Argument: [],
      HasFilter: false,
      Name: 'OrderID',
      Operator: 'None',
      OptionsUrl: null,
      Text: null
    },
    'DataType': 'numeric',
    'Aggregate': 'None'
  },
  {
    'Label': 'Customer Name',
    'Name': 'CustomerName',
    'Sortable': true,
    'SortOrder': -1,
    'SortDirection': 'None',
    'IsKey': false,
    'Searchable': true,
    'Visible': true,
    'Filter': { 
      Argument: [],
      HasFilter: false,
      Name: 'CustomerName',
      Operator: 'None',
      OptionsUrl: null,
      Text: null
    },
    'DataType': 'string',
    'Aggregate': 'Count'
  },
  {
    'Label': 'Shipped Date',
    'Name': 'ShippedDate',
    'Sortable': true,
    'SortOrder': -1,
    'SortDirection': 'None',
    'IsKey': false,
    'Searchable': false,
    'Visible': true,
    'Filter': { 
      Argument: [],
      HasFilter: false,
      Name: 'ShippedDate',
      Operator: 'None',
      OptionsUrl: null,
      Text: null
    },
    'DataType': 'datetime',
    'Aggregate': 'None'
  },
  {
    'Label': 'Shipper City',
    'Name': 'ShipperCity',
    'Sortable': true,
    'SortOrder': -1,
    'SortDirection': 'None',
    'IsKey': false,
    'Searchable': false,
    'Visible': true,
    'Filter': { 
      Argument: [],
      HasFilter: false,
      Name: 'ShipperCity',
      Operator: 'None',
      OptionsUrl: null,
      Text: null
    },
    'DataType': 'string',
    'Aggregate': 'None'
  }
];

export default class Main extends React.Component {
  render() {
    const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns);

    return (
      <Grid dataSource={dataSource} 
        bodyRenderer = {
          (row, index) => 
            <TableRow hover key = { index }>
              <TableCell padding = { 'default' }>
                { row.OrderID}
              </TableCell>
              <TableCell padding = { 'default' }>
                { row.CustomerName}
              </TableCell>
              <TableCell padding = { 'default' }>
                { row.ShippedDate}
              </TableCell>
              <TableCell padding = { 'default' }>
                { row.ShipperCity}
              </TableCell>
            </TableRow>
        } 
        rowsPerPage = { 25 } 
        footerRenderer = {
          aggregates => 
            <TableFooter>
              <TableRow>
                <TableCell>Total: </TableCell>
                <TableCell> { aggregates.CustomerName } </TableCell>
                <TableCell> ~~~ </TableCell>
                <TableCell> ~~~ </TableCell>
              </TableRow>
            </TableFooter>
        }
      >
      </Grid>
    );
  }
}