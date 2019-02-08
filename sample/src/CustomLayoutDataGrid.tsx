import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

import { format } from 'date-fns';
import DataGrid, {
  IDataGridProps,
  IDataGridState,
  ToolbarOptions,
  withLocalDataSource,
} from '../../src';
import columns from './data/columns';
import localData from './data/localData';

const toolbarOptions = new ToolbarOptions();

class CustomLayoutDataGrid extends React.Component<
  IDataGridProps,
  IDataGridState
  > {
  public static getDerivedStateFromProps(
    props: IDataGridProps,
    state: IDataGridState,
  ) {
    if (props.error !== state.errorMessage) {
      return { errorMessage: props.error };
    }
    return null;
  }
  private constructor(props: any) {
    super(props);
    this.state = { errorMessage: '' };
  }

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
              <TableCell />
            </TableRow>
          )}
        >
          <IconButton>
            <InsertEmoticon />
          </IconButton>
        </DataGrid>
      </div>
    );
  }
}

export default withLocalDataSource(CustomLayoutDataGrid, columns, localData);
