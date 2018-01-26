import Grid from '../../src/Grid/Grid';
import GridBody from '../../src/Grid/GridBody';
import GridFooter from '../../src/Grid/GridFooter';
import React from 'react';
import RemoteDataSource from '../../src/Grid/RemoteDataSource';
import { TableCell, TableRow } from 'material-ui/Table';

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

    return (
      <Grid dataSource={dataSource} 
        renders={
          { ShipperCity: row => row.ShipperCity }
        } 
        rowsPerPage = { 25 } 
        showFooter = { true } 
      />
    );
  }
}