import {
  Paper, Table, TableFooter,
  TableHead, TableRow
} from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

import GridBody from './GridBody';
import { GridProvider } from './GridContext';
import GridHeader from './GridHeader';
import GridSnackbar from './GridSnackbar';
import GridToolbar from './GridToolbar';
import GridToolbarFunctions = require('./GridToolbarFunctions');
import { ColumnDataType, ColumnSortDirection, CompareOperators } from './Models/Column';
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
  rowsPerPageOptions?: number[];
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
    const { classes, bodyRenderer, footerRenderer, rowsPerPageOptions, toolbarOptions } = this.props;
    const { errorMessage } = this.state;

    return (
      <DataSourceConsumer>
        {({ actions, columns, data, filteredRecordCount, totalRecordCount,
          aggregate, searchText, itemsPerPage, page }) =>
          <Paper className={classes.root}>
            <GridProvider value={{
              state: {
                activeColumn: this.state.activeColumn,
                searchText: searchText,
                columns: columns,
                data: data,
                filteredRecordCount: filteredRecordCount,
                itemsPerPage: itemsPerPage,
                totalRecordCount: totalRecordCount,
                page: page
              },
              actions: {
                bodyRenderer: bodyRenderer,
                handleChange: (event: any) => {
                  const value = event.target.value
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
                  this.setState({
                    activeColumn: column,
                  },
                    () => {
                      document.getElementById(column.Name).blur();
                    }
                  );
                },
                clearActiveColumn: () => {
                  const newColumns = [...columns];
                  const columnIdx = columns.findIndex((c: ColumnModel) => c.Name === this.state.activeColumn.Name);

                  if (columnIdx !== -1) {
                    (newColumns[columnIdx]).Filter = {
                      Text: '',
                      Operator: CompareOperators.NONE,
                      HasFilter: false,
                      Argument: ['']
                    };
                  }

                  this.setState(() => { activeColumn: null }, () => actions.updateColumns(newColumns));
                },
                filterActiveColumn: () => {
                  const { activeColumn } = this.state;
                  const newColumns = [...columns];
                  const columnIdx = columns.findIndex((c: ColumnModel) => c.Name === this.state.activeColumn.Name);

                  let FilterText;
                  let FilterArgument;
                  if (activeColumn.DataType == ColumnDataType.NUMERIC) {
                    FilterText = parseFloat(activeColumn.Filter.Text)
                    FilterArgument = parseFloat(activeColumn.Filter.Argument[0])
                  } else if (activeColumn.DataType == ColumnDataType.BOOLEAN) {
                    FilterText = activeColumn.Filter.Text === 'true';
                    FilterArgument = ''
                  } else {
                    FilterText = activeColumn.Filter.Text;
                    FilterArgument = activeColumn.Filter.Argument[0];
                  }


                  if (columnIdx !== -1) {
                    (newColumns[columnIdx]).Filter = {
                      ...activeColumn.Filter,
                      HasFilter: true,
                      Text: FilterText,
                      Argument: [FilterArgument],
                    };
                  }

                  this.setState(() => { activeColumn: null }, () => actions.updateColumns(newColumns));
                },
                sortColumn: (property: string) => {
                  const newColumns = [...columns];
                  const column = columns.find((c: ColumnModel) => c.Name === property);
                  if (!column) { return; }

                  column.SortDirection = column.SortDirection === ColumnSortDirection.NONE
                    ? ColumnSortDirection.ASCENDING
                    : column.SortDirection === ColumnSortDirection.ASCENDING ?
                      ColumnSortDirection.DESCENDING :
                      ColumnSortDirection.NONE;

                  column.SortOrder = column.SortDirection === ColumnSortDirection.NONE ? -1 : Number.MAX_VALUE;

                  if (!this.state.multiSort) {
                    newColumns.filter((col: any) => col.Name !== property).forEach((column: any) => {
                      column.SortOrder = -1;
                      column.SortDirection = ColumnSortDirection.NONE;
                    });
                  }

                  const currentlySortedColumns = newColumns
                    .filter((col: ColumnModel) => col.SortOrder > 0)
                    .sort((a: ColumnModel, b: ColumnModel) => a.SortOrder === b.SortOrder ? 0 : (a.SortOrder > b.SortOrder ? 1 : -1));

                  currentlySortedColumns.forEach((column: any, i: number) => {
                    column.SortOrder = i + 1;
                  });

                  actions.updateColumns(newColumns);
                },
                handleTextFieldChange: (event: any) => {
                  const value = event.target.value;
                  this.setState((prevState) => ({
                    activeColumn: {
                      ...prevState.activeColumn,
                      Filter: {
                        ...prevState.activeColumn.Filter,
                        Text: value,
                      }
                    }
                  }));
                },
                handleSecondTextFieldChange: (event: any) => {
                  const value = event.target.value;
                  this.setState((prevState) => ({
                    activeColumn: {
                      ...prevState.activeColumn,
                      Filter: {
                        ...prevState.activeColumn.Filter,
                        Argument: [value],
                      }
                    }
                  }));
                },
                textSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => actions.updateSearchText(event.target.value),
                clearSearchText: () => actions.updateSearchText(''),
                printDocument: (allRows: boolean) => {
                  if (filteredRecordCount == 0) { return; }

                  let gridRequest = new GridRequest(columns, itemsPerPage, page, searchText);

                  if (allRows) {
                    gridRequest.Take = -1;
                    actions.request(gridRequest)
                      .then(({ Payload }: any) => GridToolbarFunctions.printDocument(Payload, columns, this.props.gridName));
                  } else {
                    GridToolbarFunctions.printDocument(data, columns, this.props.gridName)
                  }
                },
                exportCSV: (allRows: boolean) => {
                  if (filteredRecordCount == 0) { return; }

                  let gridRequest = new GridRequest(columns, itemsPerPage, page, searchText);
                  if (allRows) {
                    gridRequest.Take = -1;
                    actions.request(gridRequest)
                      .then(({ Payload }: any) => GridToolbarFunctions.exportCSV(Payload, columns));
                  } else {
                    GridToolbarFunctions.exportCSV(data, columns);
                  }
                },
                updatePage: actions.updatePage,
                updateItemPerPage: actions.updateItemPerPage,
              }
            }}>
              {errorMessage && <GridSnackbar />}
              <GridToolbar
                toolbarOptions={toolbarOptions}
              />
              <Table>
                <TableHead>
                  {toolbarOptions.topPager &&
                    <TableRow>
                      <Paginator rowsPerPageOptions={rowsPerPageOptions} />
                    </TableRow>
                  }
                  <GridHeader />
                </TableHead>
                <GridBody />
                <TableFooter>
                  {footerRenderer(aggregate)}
                  {toolbarOptions.bottomPager &&
                    <TableRow>
                      <Paginator rowsPerPageOptions={rowsPerPageOptions} />
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
