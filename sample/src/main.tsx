import CheckBox from 'material-ui-icons/CheckBox';
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';
import { TableCell, TableRow } from 'material-ui/Table';
import * as moment from 'moment';
import * as React from 'react';
import DataGrid, {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection,
  RemoteDataSource
} from '../../src/DataGrid';

const columns = [
  new ColumnModel( 'OrderID',
    { DataType: ColumnDataType.NUMERIC,
      Filtering: true,
      IsKey: true,
      Label: 'ID',
      SortDirection: ColumnSortDirection.ASCENDING,
      SortOrder: 1,
      Sortable: true }
  ),
  new ColumnModel( 'CustomerName',
    { Aggregate: AggregateFunctions.COUNT,
      Filtering: true,
      Searchable: true,
      Sortable: true }
  ),
  new ColumnModel( 'ShippedDate',
    { DataType: ColumnDataType.DATE_TIME,
      Filtering: true,
      Sortable: true }
  ),
  new ColumnModel( 'ShipperCity' ),
  new ColumnModel( 'Amount',
    { DataType: ColumnDataType.NUMERIC,
      Sortable: true }
  ),
  new ColumnModel( 'IsShipped',
    { DataType: ColumnDataType.BOOLEAN,
      Filtering: true,
      Sortable: true }
  )
];

export default class Main extends React.Component {
  public render() {
    const dataSource = new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns);

    return (
      <DataGrid
        dataSource={dataSource}
        gridName='Tubular-React'
        bodyRenderer={
          (row: any, index: any) =>
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
              <TableCell padding={'default'}>
                {row.IsShipped === true ? <CheckBox />
                  : <CheckBoxOutlineBlank />}
              </TableCell>
            </TableRow>
        }
        rowsPerPage={10}
        rowsPerPageOptions={[10, 20, 50, 100]}
        showTopPager={true}
        showBottomPager={true}
        showPrintButton={true}
        showExportButton={true}
        showSearchText={true}
        footerRenderer={
          (aggregates: any) =>
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
