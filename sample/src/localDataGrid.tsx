import * as React from 'react';

import { Snackbar, TableCell, TableRow } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import { format } from 'date-fns';
import DataGrid, {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection,
  ToolbarOptions,
  withLocalDataSource
} from '../../src';
import localData from './local/localData';

const toolbarOptions = new ToolbarOptions();
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

class LocalDataGrid extends React.Component<any, any> {
  public state = {
    errorMessage: null as any
  };

  public componentWillReceiveProps(nextProps: any) {
    this.setState({ errorMessage: nextProps.error });
  }

  public render() {
    const { errorMessage } = this.state;

    return (
      <div className="root">
        {errorMessage &&
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            style={{ paddingTop: '10px' }}
            open={true}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id='message-id'>{errorMessage}</span>}
          />
        }
        <DataGrid
          gridName='Tubular-React'
          bodyRenderer={
            (row: any, index: any) =>
              <TableRow hover={true} key={index}>
                <TableCell padding='default'>
                  {row.OrderID}
                </TableCell>
                <TableCell padding='default'>
                  {row.CustomerName}
                </TableCell>
                <TableCell padding='default'>
                  {format(row.ShippedDate, 'MMMM Do YYYY, h:mm:ss a')}
                </TableCell>
                <TableCell padding='default'>
                  {row.ShipperCity}
                </TableCell>
                <TableCell padding='default' numeric={true}>
                  {row.Amount || 0}
                </TableCell>
                <TableCell padding='default'>
                  {row.IsShipped ? <CheckBox />
                    : <CheckBoxOutlineBlank />}
                </TableCell>
              </TableRow>
          }
          toolbarOptions={toolbarOptions}
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
      </div>
    );
  }
}

export default withLocalDataSource(LocalDataGrid, columns, localData);
