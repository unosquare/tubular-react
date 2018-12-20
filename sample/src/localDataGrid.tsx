import * as React from 'react';

import { Snackbar } from '@material-ui/core';
import DataGrid, {
  IDataGridProps,
  IDataGridState,
  withLocalDataSource,
} from '../../src';
import columns from './data/columns';
import localData from './data/localData';

class LocalDataGrid extends React.Component<IDataGridProps, IDataGridState> {
  public state = {
    errorMessage: null as any,
  };

  static getDerivedStateFromProps(
    props: IDataGridProps,
    state: IDataGridState
  ) {
    if (props.error !== state.errorMessage) {
      return { errorMessage: props.error };
    }
    return null;
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
        <DataGrid />
      </div>
    );
  }
}

export default withLocalDataSource(LocalDataGrid, columns, localData);
