import Grid from '../../src/Grid/Grid';
import React from 'react';
import RemoteDataSource from '../../src/Grid/RemoteDataSource';
import Table, { TableCell, TableRow } from 'material-ui/Table';

const columns = [
  {
    'Label': 'Order ID',
    'Name': 'OrderID',
    'SortOrder': -1,
    'SortDirection': 'None',
    'IsKey': false,
    'Searchable': false,
    'Visible': true,
    'Filter': null,
    'DataType': 'numeric',
    'Aggregate': 'None'
  },
  {
    'Label': 'Customer Name',
    'Name': 'CustomerName',
    'SortOrder': -1,
    'SortDirection': 'None',
    'IsKey': false,
    'Searchable': true,
    'Visible': true,
    'Filter': null,
    'DataType': 'string',
    'Aggregate': 'None'
  },
  {
    'Label': 'Shipped Date',
    'Name': 'ShippedDate',
    'SortOrder': -1,
    'SortDirection': 'None',
    'IsKey': false,
    'Searchable': false,
    'Visible': true,
    'Filter': null,
    'DataType': 'string',
    'Aggregate': 'None'
  },
  {
    'Label': 'Shipper City',
    'Name': 'ShipperCity',
    'SortOrder': -1,
    'SortDirection': 'None',
    'IsKey': false,
    'Searchable': false,
    'Visible': true,
    'Filter': null,
    'DataType': 'string',
    'Aggregate': 'None'
  }];

export default class Main extends React.Component {
  render() {
    const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns);
    const gridFooterDefinition = (
      <TableRow>
        <TableCell>Totals:</TableCell>
        <TableCell>500</TableCell>
        <TableCell>...</TableCell>
        <TableCell>...</TableCell>
      </TableRow>
    );

    return (
      <Grid dataSource={dataSource} rowsPerPage = { 25 } showFooter = { true } gridFooterDefinition = { gridFooterDefinition } />
    );
  }
}