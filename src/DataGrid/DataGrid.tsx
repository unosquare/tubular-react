import {
  LinearProgress, Paper, Table, TableFooter,
  TableHead, TableRow
} from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

import GridBody from './GridBody';
import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import Paginator from './Paginator';

import { DataSourceContext } from './DataSource/DataSourceContext';
import ToolbarOptions from './Models/ToolbarOptions';

const styles = (theme: Theme) => createStyles(
  {
    progress: {
      height: theme.spacing.unit * 2
    },
    root: {
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      width: '100%'
    }
  });

interface IProps extends WithStyles<typeof styles> {
  gridName?: string;
  toolbarOptions?: ToolbarOptions;
  bodyRenderer?(column: any, index: number): any;
  footerRenderer?(aggregate: any): any;
}

const DataGrid: React.SFC<IProps> = () => {
  const { classes, bodyRenderer, footerRenderer } = this.props;
  const toolbarOptions = this.props.toolbarOptions || new ToolbarOptions();
  const gridName = this.props.gridName || 'Grid';

  return (
    <DataSourceContext.Consumer>
      {({ state }) =>
        <Paper className={classes.root}>
          <GridToolbar
            toolbarOptions={toolbarOptions}
            gridName={gridName}
          />
          <div className={classes.progress}>
            {state.isLoading && <LinearProgress />}
          </div>
          <Table>
            <TableHead>
              {toolbarOptions.topPager &&
                <TableRow>
                  <Paginator rowsPerPageOptions={toolbarOptions.rowsPerPageOptions} />
                </TableRow>
              }
              <GridHeader />
            </TableHead>
            <GridBody bodyRenderer={bodyRenderer} />
            <TableFooter>
              {footerRenderer && footerRenderer(state.aggregate)}
              {toolbarOptions.bottomPager &&
                <TableRow>
                  <Paginator rowsPerPageOptions={toolbarOptions.rowsPerPageOptions} />
                </TableRow>
              }
            </TableFooter>
          </Table>
        </Paper>}
    </DataSourceContext.Consumer>
  );
}

export default withStyles(styles)(DataGrid);
