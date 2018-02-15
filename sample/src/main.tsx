
import { TableCell, TableRow } from 'material-ui/Table';
import * as moment from 'moment';
import * as React from 'react';
import Grid, {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection,
  RemoteDataSource
} from '../../src/Grid';

const columns = [
  new ColumnModel( 'OrderID',
    { DataType: ColumnDataType.NUMERIC,
      Filtering: true,
      IsKey: true,
      Label: 'ID',
      SortDirection: ColumnSortDirection.ASCENDING,
      SortOrder: 1 }
  ),
  new ColumnModel( 'CustomerName',
    { Aggregate: AggregateFunctions.COUNT,
      Filtering: true,
      Searchable: true,
      SortDirection: ColumnSortDirection.NONE }
  ),
  new ColumnModel( 'ShippedDate',
    { DataType: ColumnDataType.DATE_TIME,
      Filtering: true,
      SortDirection: ColumnSortDirection.NONE }
  ),
  new ColumnModel( 'ShipperCity' ),
  new ColumnModel( 'Amount',
    { DataType: ColumnDataType.NUMERIC,
      SortDirection: ColumnSortDirection.NONE }
  )
];

export default class Main extends React.Component {
  public render() {
    const dataSource =  new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns);

    return (
      <Grid
        dataSource={dataSource}
        gridName='Motorhead'
        bodyRenderer={
          (row, index) =>
            <TableRow hover={true} key={index}>
              <TableCell padding={'default'}>
                {row.OrderID}
              </TableCell>
              <TableCell padding={'default'}>
                {row.CustomerName}
              </TableCell>
              <TableCell padding={'default'}>
                {moment(row.ShippedDate).format('MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
              <TableCell padding={'default'}>
                {row.ShipperCity}
              </TableCell>
              <TableCell padding={'default'}>
                {row.Amount || 0}
              </TableCell>
            </TableRow>
        }
        rowsPerPage={10}
        showTopPager={true}
        showBottomPager={true}
        showPrintButton={true}
        showExportButton={true}
        footerRenderer={
          (aggregates) =>
            <TableRow>
              <TableCell>Total: </TableCell>
              <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
        }
      />
    );
  }
}
