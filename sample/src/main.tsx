import { TableCell, TableRow } from 'material-ui/Table';
import * as moment from 'moment';
import * as React from 'react';
import Grid from '../../src/Grid/Grid';
import LocalDataSource from '../../src/Grid/LocalDataSource';
import RemoteDataSource from '../../src/Grid/RemoteDataSource';
import localData from './localData';

const columns = [
  {
    DataType: 'numeric',
    Filtering: true,
    IsKey: true,
    Label: 'Order ID',
    Name: 'OrderID',
    SortDirection: 'Ascending',
    SortOrder: 1,
    Sortable: true,
  },
  {
    Aggregate: 'Count',
    Filtering: true,
    Label: 'Customer Name',
    Name: 'CustomerName',
    Searchable: true,
    SortDirection: 'None',
    SortOrder: -1,
    Sortable: true,
  },
  {
    DataType: 'datetime',
    Filtering: true,
    Label: 'Shipped Date',
    Name: 'ShippedDate',
    SortDirection: 'None',
    SortOrder: -1,
    Sortable: true,
  },
  {
    Label: 'Shipper City',
    Name: 'ShipperCity'
  },
  {
    DataType: 'numeric',
    Label: 'Amount',
    Name: 'Amount',
    SortDirection: 'None',
    SortOrder: -1,
    Sortable: true,
  }
];

export default class Main extends React.Component {
  public render() {
    // const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns);
    const dataSource =  new LocalDataSource(localData, columns);

    console.log(dataSource);
    return (
      <Grid
        dataSource={dataSource}
        gridName='Motorhead'
        // bodyRenderer={
        //   (row, index) =>
        //     <TableRow hover={true} key={index}>
        //       <TableCell padding={'default'}>
        //         {row.OrderID}
        //       </TableCell>
        //       <TableCell padding={'default'}>
        //         {row.CustomerName}
        //       </TableCell>
        //       <TableCell padding={'default'}>
        //         {moment(row.ShippedDate).format('MMMM Do YYYY, h:mm:ss a')}
        //       </TableCell>
        //       <TableCell padding={'default'}>
        //         {row.ShipperCity}
        //       </TableCell>
        //       <TableCell padding={'default'}>
        //         {row.Amount || 0}
        //       </TableCell>
        //     </TableRow>
        // }
        rowsPerPage={10}
        showTopPager={true}
        showBottomPager={true}
        showPrintButton={true}
        showExportButton={true}
        // footerRenderer={
        //   (aggregates) =>
        //     <TableRow>
        //       <TableCell>Total: </TableCell>
        //       <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
        //       <TableCell />
        //       <TableCell />
        //       <TableCell />
        //     </TableRow>
        // }
      />
    );
  }
}
