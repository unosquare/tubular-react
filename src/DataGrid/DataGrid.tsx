import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';

import { DataSourceContext } from '../DataSource';
import { DataGridProvider, IDataGridContext } from './DataGridContext';
import DataGridTable from './DataGridTable';
import GridToolbar from './GridToolbar';

const useStyles = makeStyles(({ spacing }: any) => ({
  progress: {
    height: spacing.unit * 2,
  },
  root: {
    overflowX: 'auto',
    width: '100%',
  },
}));

interface IProps extends IDataGridContext {
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
}) => {
  const classes = useStyles();
  const { state } = React.useContext(DataSourceContext);

  return (
    <DataGridProvider
      toolbarOptions={toolbarOptions}
      gridName={gridName}
    >
      <Paper className={classes.root}>
        <GridToolbar>
          {children}
        </GridToolbar>
        <div className={classes.progress}>
          {state.isLoading && <LinearProgress />}
        </div>
        <DataGridTable
          toolbarOptions={toolbarOptions}
          bodyRenderer={bodyRenderer}
          footerRenderer={footerRenderer}
          onRowClick={onRowClick}
        />
      </Paper>
    </DataGridProvider>
  );
};

export default DataGrid;
