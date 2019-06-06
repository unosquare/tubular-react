import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';

import { IDataGridStorage } from '../DataGridInterfaces';
import { DataSourceContext } from '../DataSource';
import { DataGridTable, GridToolbar } from './';
import { DataGridProvider, IDataGridContext } from './DataGridContext';

const useStyles = makeStyles({
  root: {
    overflowX: 'auto',
    width: '100%',
  },
});

interface IProps extends IDataGridContext {
  storage?: IDataGridStorage;

  bodyRenderer?(row: any, index: number, columns: ColumnModel[]): void;
  footerRenderer?(aggregate: any): void;
  onRowClick?(ev: any): any;
}

const DataGrid: React.FunctionComponent<IProps> = (props, {
  bodyRenderer,
  footerRenderer,
  toolbarOptions,
  gridName,
  children,
  onRowClick,
  storage,
}) => {
  const classes = useStyles(props);
  const { state } = React.useContext(DataSourceContext);

  return (
    <DataGridProvider
      toolbarOptions={toolbarOptions}
      gridName={gridName}
      storage={storage}
    >
      <Paper className={classes.root}>
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
