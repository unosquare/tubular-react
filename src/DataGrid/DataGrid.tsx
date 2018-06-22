import {
  LinearProgress, Paper, Table, TableFooter,
  TableHead, TableRow
} from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

import GridBody from './GridBody';
import { GridProvider } from './GridContext';
import GridHeader from './GridHeader';
import GridSnackbar from './GridSnackbar';
import GridToolbar from './GridToolbar';
import { exportGrid } from './GridToolbarFunctions';
import { ColumnDataType, CompareOperators } from './Models/Column';
import ColumnModel from './Models/ColumnModel';
import GridRequest from './Models/GridRequest';
import Paginator from './Paginator';

import { DataSourceConsumer } from './DataSource/BaseDataSource';

const styles = (theme: Theme) => createStyles(
  {
    root: {
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      width: '100%'
    }
  });

interface IState {
  errorMessage: string;
  activeColumn: any;
  multiSort: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  gridName: string;
  toolbarOptions: any;
  onError?(error: any): any;
  bodyRenderer?(column: any, index: number): any;
  footerRenderer?(aggregate: any): any;
}

class DataGrid extends React.Component<IProps, IState> {
  public state = {
    activeColumn: null as any,
    errorMessage: null as any,
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
    const { classes, bodyRenderer, footerRenderer, toolbarOptions } = this.props;
    const { errorMessage, activeColumn } = this.state;

    return (
      <DataSourceConsumer>
        {({ actions, columns, data, filteredRecordCount, aggregate, searchText, isLoading }) =>
          <Paper className={classes.root}>
            <GridProvider
              value={{
                state: {
                  activeColumn,
                  columns,
                  filteredRecordCount,
                  searchText
                },
                actions: {
                  setFilterOperator: (value: string) => {
                    this.setState((prevState) => ({
                      activeColumn: {
                        ...prevState.activeColumn,
                        Filter: {
                          ...prevState.activeColumn.Filter,
                          Operator: value
                        }
                      }
                    }));
                  },
                  setActiveColumn: (column: any) => {
                    this.setState({ activeColumn: column },
                      () => document.getElementById(column.Name).blur());
                  },
                  clearActiveColumn: () => {
                    const newColumns = [...columns];
                    const columnIdx = columns.findIndex((c: ColumnModel) => c.Name === activeColumn.Name);

                    if (columnIdx !== -1) {
                      (newColumns[columnIdx]).Filter = {
                        Text: '',
                        Operator: CompareOperators.NONE,
                        HasFilter: false,
                        Argument: ['']
                      };
                    }

                    this.setState({ activeColumn: null }, () => actions.updateColumns(newColumns));
                  },
                  filterActiveColumn: () => {
                    const newColumns = [...columns];
                    const column = columns.find((c: ColumnModel) => c.Name === activeColumn.Name);
                    if (!column) { return; }

                    let filterText = activeColumn.Filter.Text;
                    let filterArgument = activeColumn.Filter.Argument[0];
                    if (activeColumn.DataType === ColumnDataType.NUMERIC) {
                      filterText = parseFloat(filterText);
                      filterArgument = parseFloat(filterArgument);
                    } else if (activeColumn.DataType == ColumnDataType.BOOLEAN) {
                      filterText = filterText === 'true';
                      filterArgument = '';
                    }

                    column.Filter = {
                      ...activeColumn.Filter,
                      HasFilter: true,
                      Text: filterText,
                      Argument: [filterArgument]
                    };

                    this.setState({ activeColumn: null }, () => actions.updateColumns(newColumns));
                  },
                  sortColumn: (property: string) => {
                    actions.updateColumns(ColumnModel.SortColumnArray(property, [...columns], this.state.multiSort));
                  },
                  handleTextFieldChange: (value: string) => {
                    this.setState((prevState) => ({
                      activeColumn: {
                        ...prevState.activeColumn,
                        Filter: {
                          ...prevState.activeColumn.Filter,
                          Text: value
                        }
                      }
                    }));
                  },
                  handleSecondTextFieldChange: (value: string) => {
                    this.setState((prevState) => ({
                      activeColumn: {
                        ...prevState.activeColumn,
                        Filter: {
                          ...prevState.activeColumn.Filter,
                          Argument: [value]
                        }
                      }
                    }));
                  },
                  textSearchChange: actions.updateSearchText,
                  clearSearchText: () => actions.updateSearchText(''),
                  export: (allRows: boolean, format: string) => {
                    if (filteredRecordCount === 0) { return; }

                    if (allRows) {
                      actions.request(new GridRequest(columns, -1, 0, searchText))
                        .then(({ Payload }: any) =>
                        exportGrid(format, Payload, columns, this.props.gridName));
                    } else {
                      exportGrid(format, data, columns, this.props.gridName)
                    }
                  }
                }
              }}
            >
              {errorMessage && <GridSnackbar errorMessage={errorMessage} />}
              <GridToolbar
                toolbarOptions={toolbarOptions}
              />
              {isLoading && <LinearProgress />}
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
                  {footerRenderer(aggregate)}
                  {toolbarOptions.bottomPager &&
                    <TableRow>
                      <Paginator rowsPerPageOptions={toolbarOptions.rowsPerPageOptions} />
                    </TableRow>
                  }
                </TableFooter>
              </Table>
            </GridProvider>
          </Paper>
        }
      </DataSourceConsumer>
    );
  }
}

export default withStyles(styles)(DataGrid);
