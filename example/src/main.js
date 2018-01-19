import Grid from '../../src/Grid/Grid';
import RemoteDataSource from '../../src/Grid/RemoteDataSource';
import React from 'react';

const columns = [
  {
    "Label": "Order ID",
    "Name": "OrderID",
    "SortOrder": -1,
    "SortDirection": "None",
    "IsKey": false,
    "Searchable": false,
    "Visible": true,
    "Filter": null,
    "DataType": "numeric",
    "Aggregate": "None"
  },
  {
    "Label": "Customer Name",
    "Name": "CustomerName",
    "SortOrder": -1,
    "SortDirection": "None",
    "IsKey": false,
    "Searchable": true,
    "Visible": true,
    "Filter": null,
    "DataType": "string",
    "Aggregate": "None"
  },
  {
    "Label": "Shipped Date",
    "Name": "ShippedDate",
    "SortOrder": -1,
    "SortDirection": "None",
    "IsKey": false,
    "Searchable": false,
    "Visible": true,
    "Filter": null,
    "DataType": "string",
    "Aggregate": "None"
  },
  {
    "Label": "Shipper City",
    "Name": "ShipperCity",
    "SortOrder": -1,
    "SortDirection": "None",
    "IsKey": false,
    "Searchable": false,
    "Visible": true,
    "Filter": null,
    "DataType": "string",
    "Aggregate": "None"
  }];
export default class Main extends React.Component {
  render() {
    const dataSource = new RemoteDataSource("http://tubular.azurewebsites.net/api/orders/paged")
    return (
      <Grid data={[{ key: 'data' }]} columns={columns} dataSource={dataSource} />
    );
  }
}