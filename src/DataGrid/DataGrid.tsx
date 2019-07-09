import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';

import { IDataGridStorage } from '../DataGridInterfaces';
import { DataSourceContext } from '../DataSource';
import { DataGridTable, GridToolbar } from './';
import { DataGridProvider, IDataGridContext } from './DataGridContext';

interface IProps extends IDataGridContext {
  storage?: IDataGridStorage;

  bodyRenderer?(row: any, index: number, columns: ColumnModel[]): void;
  footerRenderer?(aggregate: any): void;
  onRowClick?(ev: any): any;
}

const DataGrid: React.FunctionComponent<IProps> = ({
  bodyRenderer,
  footerRenderer,
  toolbarOptions,
  gridName,
  children,
  onRowClick,
  storage,
}) => {
  const { state } = React.useContext(DataSourceContext);

  return (
    <DataGridProvider
      toolbarOptions={toolbarOptions}
      gridName={gridName}
      storage={storage}
    >
      <Paper style={{ overflowX: 'auto', width: '100%' }}>
        <GridToolbar>
          {children}
        </GridToolbar>
        <div>
          {state.isLoading && <LinearProgress />}
        </div>
        <DataGridTable
          bodyRenderer={bodyRenderer}
          footerRenderer={footerRenderer}
          onRowClick={onRowClick}
        />
      </Paper>
    </DataGridProvider>
  );
};

export default DataGrid;
