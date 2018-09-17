import {
  LinearProgress,
  Paper,
  Table,
  TableFooter,
  TableHead,
  TableRow
} from '@material-ui/core';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';

import GridBody from './GridBody';
import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import Paginator from './Paginator';

import { DataSourceContext } from '../DataSource';
import { ToolbarOptions } from '../Models';

const styles = ({ spacing }) => createStyles({
  progress: {
    height: spacing.unit * 2
  },
  root: {
    marginTop: spacing.unit * 3,
    overflowX: 'auto',
    width: '100%'
  }
});

interface IProps extends WithStyles<typeof styles> {
  gridName?: string;
  toolbarOptions?: ToolbarOptions;
  bodyRenderer?(row: any, index: number, columns: ColumnModel[]): any;
  footerRenderer?(aggregate: any): any;
}

const DataGrid: React.SFC<IProps> = ({
  classes,
  bodyRenderer,
  footerRenderer,
  toolbarOptions,
  gridName,
  children
}) => {
  toolbarOptions = toolbarOptions || new ToolbarOptions();

  return (
    <DataSourceContext.Consumer>
      {({ state }) => (
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
            <GridBody bodyRenderer={bodyRenderer} />
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
        </Paper>
      )}
    </DataSourceContext.Consumer>
  );
};

export default withStyles(styles)(DataGrid);
