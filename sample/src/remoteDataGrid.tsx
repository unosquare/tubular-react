import * as React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

import { format } from 'date-fns';
import DataGrid, {
  IDataGridProps,
  IDataGridState,
  ToolbarOptions,
  withRemoteDataSource,
} from '../../src';
import columns from './data/columns';

const toolbarOptions = new ToolbarOptions();

class RemoteDataGrid extends React.Component<IDataGridProps, IDataGridState> {
  public static getDerivedStateFromProps(
    props: IDataGridProps,
    state: IDataGridState,
  ) {
    if (props.error !== state.errorMessage) {
      return { errorMessage: props.error };
    }

    return null;
  }

  public state = {
    errorMessage: null as string,
  };

  public render() {
    const { errorMessage } = this.state;

    return (
      <div className='root'>
        {errorMessage && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            style={{ paddingTop: '10px' }}
            open={true}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id='message-id'>{errorMessage}</span>}
          />
        )}
        <DataGrid
          gridName='Tubular-React'
          bodyRenderer={(row: any) => (
            <TableRow hover={true} key={row.OrderID}>
              <TableCell padding='default'>{row.OrderID}</TableCell>
              <TableCell padding='default'>{row.CustomerName}</TableCell>
              <TableCell padding='default'>
                {format(row.ShippedDate, 'MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
              <TableCell padding='default'>{row.ShipperCity}</TableCell>
              <TableCell padding='default' align={'right'}>
                {row.Amount || 0}
              </TableCell>
              <TableCell padding='default'>
                {row.IsShipped ? <CheckBox /> : <CheckBoxOutlineBlank />}
              </TableCell>
            </TableRow>
          )}
          toolbarOptions={toolbarOptions}
          footerRenderer={(aggregates: any) => (
            <TableRow>
              <TableCell>Total: </TableCell>
              <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          )}
        />
      </div>
    );
  }
}

export default withRemoteDataSource(
  RemoteDataGrid,
  columns,
  'https://tubular.azurewebsites.net/api/orders/paged',
);
