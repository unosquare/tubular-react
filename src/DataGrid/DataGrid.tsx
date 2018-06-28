import {
  LinearProgress, Paper, Table, TableFooter,
  TableHead, TableRow
} from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

import GridBody from './GridBody';
import { GridProvider } from './GridContext';
import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import ColumnModel from './Models/ColumnModel';
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

interface IState {
  activeColumn: any;
  multiSort: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  gridName?: string;
  toolbarOptions?: ToolbarOptions;
  bodyRenderer?(column: any, index: number): any;
  footerRenderer?(aggregate: any): any;
}

class DataGrid extends React.Component<IProps, IState> {
  public state = {
    activeColumn: null as any,
    multiSort: false
  };

  public handleKeyDown(event: any) {
    if (event.key === 'Control' && !this.state.multiSort) {
      this.setState({ multiSort: true });
    }
  }

  public handleKeyUp(event: any) {
    if (event.key === 'Control' && this.state.multiSort) {
      this.setState({ multiSort: false });
    }
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', (event) => this.handleKeyDown(event));
    document.removeEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  public componentDidMount() {
    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  public render() {
    const { classes, bodyRenderer, footerRenderer } = this.props;
    const { activeColumn, multiSort } = this.state;
    const toolbarOptions = this.props.toolbarOptions || new ToolbarOptions();
    const gridName = this.props.gridName || 'Grid';

    return (
      <DataSourceContext.Consumer>
        {({ actions, dataSource }) =>
          <Paper className={classes.root}>
            <GridProvider
              value={{
                actions: {
                  handleFilterChange: (value: any) => {
                    this.setState((prevState) => ({
                      activeColumn: {
                        ...prevState.activeColumn,
                        Filter: {
                          ...prevState.activeColumn.Filter,
                          ...value
                        }
                      }
                    }));
                  },
                  setActiveColumn: (column: any) => {
                    this.setState({ activeColumn: column },
                      () => document.getElementById(column.Name).blur());
                  },
                  setFilter: (value: any) => {
                    const newColumns = [...dataSource.columns];
                    const column = newColumns.find((c: ColumnModel) => c.Name === activeColumn.Name);
                    if (!column) { return; }

                    column.Filter = {
                      ...activeColumn.Filter,
                      ...value
                    };

                    this.setState({ activeColumn: null }, () => actions.updateColumns(newColumns));
                  },
                  sortColumn: (property: string) => {
                    actions.updateColumns(ColumnModel.sortColumnArray(
                      property,
                      [...dataSource.columns],
                      multiSort));
                  }
                },
                state: {
                  ...dataSource,
                  activeColumn
                }
              }}
            >
              <GridToolbar
                toolbarOptions={toolbarOptions}
                gridName={gridName}
              />
              <div className={classes.progress}>
                {dataSource.isLoading && <LinearProgress />}
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
                  {footerRenderer && footerRenderer(dataSource.aggregate)}
                  {toolbarOptions.bottomPager &&
                    <TableRow>
                      <Paginator rowsPerPageOptions={toolbarOptions.rowsPerPageOptions} />
                    </TableRow>
                  }
                </TableFooter>
              </Table>
            </GridProvider>
          </Paper>}
      </DataSourceContext.Consumer>
    );
  }
}

export default withStyles(styles)(DataGrid);
