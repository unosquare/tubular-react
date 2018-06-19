import { TableCell, TableRow } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';

import * as moment from 'moment';
import * as React from 'react';
import DataGrid, {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection,
  RemoteDataSource,
  ToolbarOptions
} from '../../src';

const columns = [
  new ColumnModel('OrderID',
    {
      DataType: ColumnDataType.NUMERIC,
      Filtering: true,
      IsKey: true,
      Label: 'ID',
      SortDirection: ColumnSortDirection.ASCENDING,
      SortOrder: 1,
      Sortable: true
    }
  ),
  new ColumnModel('CustomerName',
    {
      Aggregate: AggregateFunctions.COUNT,
      Filtering: true,
      Searchable: true,
      Sortable: true
    }
  ),
  new ColumnModel('ShippedDate',
    {
      DataType: ColumnDataType.DATE_TIME,
      Filtering: true,
      Sortable: true
    }
  ),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount',
    {
      DataType: ColumnDataType.NUMERIC,
      Sortable: true
    }
  ),
  new ColumnModel('IsShipped',
    {
      DataType: ColumnDataType.BOOLEAN,
      Filtering: true,
      Sortable: true
    }
  )
];

export default class Main extends React.Component {
  public render() {
    return (
      <RemoteDataSource
        source='http://tubular.azurewebsites.net/api/orders/paged' 
        columns={columns}
        itemsPerPage={10}>
        <DataGrid
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
          rowsPerPageOptions={[10, 20, 50, 100]}
          toolbarOptions={ToolbarOptions}
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
      </RemoteDataSource>
    );
  }
}
