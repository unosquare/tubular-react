import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';

import GridBody from './GridBody';
import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import Paginator from './Paginator';

import { DataSourceContext } from '../DataSource';
import { ToolbarOptions } from '../Models';

const styles = ({ spacing }: Theme) => createStyles({
  progress: {
    height: spacing.unit * 2,
  },
  root: {
    marginTop: spacing.unit * 3,
    overflowX: 'auto',
    width: '100%',
  },
});

interface IProps extends WithStyles<typeof styles> {
  gridName?: string;
  toolbarOptions?: ToolbarOptions;

  bodyRenderer?(row: any, index: number, columns: ColumnModel[]): void;
  footerRenderer?(aggregate: any): void;
  onRowClick?(ev: any): any;
}

export const DataGridTable: React.FunctionComponent<any> = ({
  bodyRenderer,
  footerRenderer,
  toolbarOptions,
  onRowClick,
}) => {
  const { state } = React.useContext(DataSourceContext);

  return (
    <Table>
      <TableHead>
        {toolbarOptions.topPager && (
          <TableRow>
            <Paginator
              rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
              advancePagination={toolbarOptions.advancePagination}
            />
          </TableRow>
        )}
        <GridHeader />
      </TableHead>
      <GridBody
        bodyRenderer={bodyRenderer}
        onRowClick={onRowClick}
      />
      <TableFooter>
        {footerRenderer && footerRenderer(state.aggregate)}
        {toolbarOptions.bottomPager && (
          <TableRow>
            <Paginator
              rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
              advancePagination={toolbarOptions.advancePagination}
            />
          </TableRow>
        )}
      </TableFooter>
    </Table>
  );
};

const DataGrid: React.FunctionComponent<IProps> = ({
  classes,
  bodyRenderer,
  footerRenderer,
  toolbarOptions,
  gridName,
  children,
  onRowClick,
}) => {
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

export default withStyles(styles, { withTheme: true })(DataGrid);
