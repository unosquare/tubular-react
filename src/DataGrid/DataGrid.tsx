import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';

import DataGridTable from './DataGridTable';
import GridToolbar from './GridToolbar';

import { DataSourceContext } from '../DataSource';
import { ToolbarOptions } from '../Models';

const useStyles = makeStyles((theme) => ({
  progress: {
    height: theme.spacing.unit * 2,
  },
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    width: '100%',
  },
}));

interface IProps {
  gridName?: string;
  toolbarOptions?: ToolbarOptions;

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

  toolbarOptions = toolbarOptions || new ToolbarOptions();

  return (
    <Paper className={classes.root}>
      <GridToolbar
        toolbarOptions={toolbarOptions}
        gridName={gridName || 'Grid'}
      >
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
  );
};

export default DataGrid;
