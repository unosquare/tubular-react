import * as React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

import {
  DataGridTable,
  IDataGridProps,
  IDataGridState,
  ToolbarOptions,
  withLocalDataSource,
} from '../../src';
import columns from './data/columns';
import localData from './data/localData';

// tslint:disable-next-line: no-var-requires
const format = require('date-fns/format');
const toolbarOptions = new ToolbarOptions({ bottomPager: false });

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
    const bodyRenderer = (row: any) => (
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
    );

    const footerRenderer = (aggregates: any) => (
      <TableRow>
        <TableCell>Total: </TableCell>
        <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
      </TableRow>
    );

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
        <Typography variant='h4'>No card grid!</Typography>
        <DataGridTable
          bodyRenderer={bodyRenderer}
          toolbarOptions={toolbarOptions}
          footerRenderer={footerRenderer}
        />
      </div>
    );
  }
}

export default withLocalDataSource(CustomLayoutDataGrid, columns, localData);
