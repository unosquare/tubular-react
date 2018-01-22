import Grid from '../../src/Grid/Grid';
import React from 'react';
import RemoteDataSource from '../../src/Grid/RemoteDataSource';

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
      HasFilter: true,
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
      HasFilter: true,
      Name: 'CustomerName',
      Operator: 'None',
      OptionsUrl: null,
      Text: null
    },
    'DataType': 'string',
    'Aggregate': 'None'
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
      HasFilter: true,
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
    'Filter': null,
    'DataType': 'string',
    'Aggregate': 'None'
  }
];

export default class Main extends React.Component {
  render() {
    const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns);
    return (
      <Grid dataSource={dataSource} rowsPerPage={10}/>
    );
  }
}