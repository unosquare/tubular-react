import * as React from 'react';

import { Snackbar } from '@material-ui/core';
import DataGrid, {
  ToolbarOptions,
  withLocalDataSource
} from '../../src';
import columns from './data/columns';
import localData from './data/localData';
import ICommonProps from './data/ICommonProps';
import IGridState from './IGridState';

class LocalDataGrid extends React.Component<ICommonProps, IGridState> {
  public state = {
    errorMessage: null as any
  };

  public componentWillReceiveProps(nextProps: ICommonProps) {
    this.setState({ errorMessage: nextProps.error });
  }

  public render() {
    const { errorMessage } = this.state;

    return (
      <div className='root'>
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
        />
      </div>
    );
  }
}

export default withLocalDataSource(LocalDataGrid, columns, localData);
