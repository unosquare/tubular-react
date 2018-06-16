import {
  Paper, Snackbar, Table, TableBody, TableCell, TableFooter,
  TableHead, TableRow, Typography
} from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { CheckBox, CheckBoxOutlineBlank, Warning } from '@material-ui/icons';
import * as moment from 'moment';
import * as React from 'react';

import BaseDataSource from './DataSource/BaseDataSource';
import { GridProvider } from './GridContext';
import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import GridToolbarFunctions = require('./GridToolbarFunctions');
import { ColumnDataType, ColumnSortDirection, CompareOperators } from './Models/Column';
import ColumnModel from './Models/ColumnModel';
import GridRequest from './Models/GridRequest';
import GridResponse from './Models/GridResponse';
import Paginator from './Paginator';

const styles = (theme: Theme) => createStyles(
  {
    root: {
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      width: '100%'
    }
  });

interface IState {
  aggregate: any;
  data: any[];
  errorMessage: string;
  filteredRecordCount: number;
  gridResult: object;
  open: boolean;
  page: number;
  rowsPerPage: number;
  searchText: string;
  totalRecordCount: number;
  activeColumn: any;
  gridRequest: GridRequest;
  multiSort: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  dataSource: BaseDataSource;
  columns: ColumnModel[];
  gridName: string;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  toolbarOptions: any;
  onError?(error: any): any;
  bodyRenderer?(column: any, index: number): any;
  footerRenderer?(aggregate: any): any;
}

class DataGrid extends React.Component<IProps, IState> {
  public state = {
    activeColumn: null as any,
    aggregate: {},
    data: [] as any,
    dataSource: this.props.dataSource,
    errorMessage: '',
    filteredRecordCount: 0,
    gridRequest: new GridRequest(this.props.columns, this.props.rowsPerPage, 0),
    gridResult: {},
    multiSort: false,
    open: false,
    page: 0,
    rowsPerPage: parseInt(
      localStorage.getItem(`tubular.${this.props.gridName}_pageSize`), 10) || this.props.rowsPerPage,
    searchText: localStorage.getItem(`tubular.${this.props.gridName}_searchText`) || '',
    totalRecordCount: 0,
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

    this.rowsPerPageChecker(this.props.rowsPerPageOptions || [10, 20, 50, 100]);

    this.state.dataSource.retrieveData(this.state.gridRequest)
      .subscribe((tbResponse: GridResponse) => {
        this.setState({
          aggregate: tbResponse.Aggregate,
          data: tbResponse.Payload,
          filteredRecordCount: tbResponse.FilteredRecordCount || 0,
          totalRecordCount: tbResponse.TotalRecordCount || 0
        });
      }, (error: any) => {
        if (!this.props.onError) {
          throw error;
        }

        this.props.onError(error);
      });

    if (!localStorage.getItem(`tubular.${this.props.gridName}`)) { return; }

    // TODO: Fix, and change to update the state
    const storage = JSON.parse(localStorage.getItem(`tubular.${this.props.gridName}`));
    console.log(storage);
    // const dataSource = this.props.dataSource;

    // storage.forEach((element: any, i: number) => {
    //   if (gridRequest.Columns[i] === undefined) { return; }
    //   gridRequest.Columns[i].SortDirection = element.SortDirection;
    //   gridRequest.Columns[i].SortOrder = element.SortOrder;

    //   if (gridRequest.Columns[i].Filter && element.Filter) {
    //     gridRequest.Columns[i].Filter.HasFilter = element.Filter.HasFilter;
    //     gridRequest.Columns[i].Filter.Operator = element.Filter.Operator;
    //     gridRequest.Columns[i].Filter.Text =
    //       gridRequest.Columns[i].DataType === ColumnDataType.BOOLEAN ?
    //         element.Filter.Text :
    //         element.Filter.Text || '';
    //     gridRequest.Columns[i].Filter.Argument[0] = element.Filter.Argument[0] || '';
    //   }
    // });
  }

  public rowsPerPageChecker = (rowsPerPageOptions: number[]) => {
    const index = rowsPerPageOptions.indexOf(this.props.rowsPerPage);

    if (index === -1) {
      this.setState({
        errorMessage: `The rowsPerPage value should be: ${rowsPerPageOptions}`
      },
        () => this.handleOpen()
      );
    }
  }

  public handlePager = (rowsPerPage: number, page: number) => {
    this.setState({ rowsPerPage, page }, () => this.refreshGrid());
  }

  public refreshGrid = () => {
    const { gridRequest, rowsPerPage, searchText } = this.state;

    this.props.dataSource.retrieveData(gridRequest); 

    localStorage.setItem(`tubular.${this.props.gridName}`, JSON.stringify(gridRequest.Columns));
    localStorage.setItem(`tubular.${this.props.gridName}_pageSize`, String(rowsPerPage));
    localStorage.setItem(`tubular.${this.props.gridName}_searchText`, searchText);
  }

  public renderCell = (column: ColumnModel, row: any) => {
    let rows = null;

    switch (column.DataType) {
      case ColumnDataType.NUMERIC:
        rows = row[column.Name] || 0;
        break;
      case ColumnDataType.DATE:
        rows = moment(row[column.Name]).format('MMMM Do YYYY') || '';
        break;
      case ColumnDataType.DATE_TIME:
      case ColumnDataType.DATE_TIME_UTC:
        rows = moment(row[column.Name]).format('MMMM Do YYYY, h:mm:ss a') || '';
        break;
      case ColumnDataType.BOOLEAN:
        rows = row[column.Name] === true ? <CheckBox /> : <CheckBoxOutlineBlank />;
        break;
      default:
        rows = row[column.Name];
        break;
    }

    return rows;
  }

  public handleClose = () => {
    this.setState({ open: false });
  }

  public handleOpen = () => {
    this.setState({ open: true });
  }

  public render() {
    const { classes, bodyRenderer, footerRenderer, rowsPerPageOptions, toolbarOptions } = this.props;
    const { data, rowsPerPage, page, gridRequest, aggregate, filteredRecordCount, totalRecordCount } = this.state;
    const body = (
      <TableBody>
        {data.map((row: any, rowIndex: number) => (
          bodyRenderer
            ? bodyRenderer(row, rowIndex)
            : <TableRow hover={true} key={rowIndex}>
              {
                gridRequest.Columns.filter((col: any) => col.Visible).map((column: ColumnModel, colIndex: number) =>
                  <TableCell key={colIndex} padding={column.Label === '' ? 'none' : 'default'}>
                    {
                      this.renderCell(column, row)
                    }
                  </TableCell>)
              }
            </TableRow>
        ))}
        {filteredRecordCount === 0 &&
          (<TableRow>
            <Typography style={{ paddingLeft: '15px' }} variant='body2' gutterBottom={true}>
              <Warning /> No records found
              </Typography>
          </TableRow>)}
      </TableBody>
    );

    const paginator = (
      <TableRow>
        <Paginator
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          page={page}
          filteredRecordCount={filteredRecordCount}
          totalRecordCount={totalRecordCount}
          handlePager={this.handlePager}
        />
      </TableRow>
    );

    const snackbar = (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
        style={{ paddingTop: '10px' }}
        open={this.state.open}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{this.state.errorMessage}</span>}
      />
    );

    return (
      <Paper className={classes.root}>
        <GridProvider value={{
          state: {
            activeColumn: this.state.activeColumn,
            searchText: this.state.searchText,
            columns: this.props.columns
          },
          actions: {
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
              this.setState((prevState) => {
                const columns = [...prevState.gridRequest.Columns];
                const columnIdx = columns.findIndex((c: ColumnModel) => c.Name === prevState.activeColumn.Name);

                if (columnIdx !== -1) {
                  (columns[columnIdx]).Filter = {
                    Text: '',
                    Operator: CompareOperators.NONE,
                    HasFilter: false,
                    Argument: ['']
                  };
                }

                return {
                  activeColumn: null,
                  gridRequest: new GridRequest(columns, prevState.rowsPerPage, prevState.page, prevState.searchText)
                };
              });
            },
            filterActiveColumn: () => {
              this.setState((prevState) => {
                let FilterText;
                let FilterArgument;
                if (prevState.activeColumn.DataType == ColumnDataType.NUMERIC) {
                  FilterText = parseFloat(prevState.activeColumn.Filter.Text)
                  FilterArgument = parseFloat(prevState.activeColumn.Filter.Argument[0])
                } else if (prevState.activeColumn.DataType == ColumnDataType.BOOLEAN) {
                  FilterText = prevState.activeColumn.Filter.Text === 'true' ? true : false;
                  FilterArgument = ''
                } else {
                  FilterText = prevState.activeColumn.Filter.Text;
                  FilterArgument = prevState.activeColumn.Filter.Argument[0];
                }

                const columns = [...prevState.gridRequest.Columns];
                const columnIdx = columns.findIndex((c: ColumnModel) => c.Name === prevState.activeColumn.Name);

                if (columnIdx !== -1) {
                  (columns[columnIdx]).Filter = {
                    ...prevState.activeColumn.Filter,
                    HasFilter: true,
                    Text: FilterText,
                    Argument: [FilterArgument],
                  };
                }

                return {
                  activeColumn: null,
                  gridRequest: new GridRequest(columns, prevState.rowsPerPage, prevState.page, prevState.searchText)
                }
              }, () => this.refreshGrid());
            },
            sortColumn: (property: string) => {
              this.setState((prevState) => {
                const columns = [...prevState.gridRequest.Columns];

                columns.forEach((column: any) => {
                  if (column.Name === property) {
                    column.SortDirection = column.SortDirection === ColumnSortDirection.NONE
                      ? ColumnSortDirection.ASCENDING
                      : column.SortDirection === ColumnSortDirection.ASCENDING ?
                        ColumnSortDirection.DESCENDING :
                        ColumnSortDirection.NONE;

                    if (column.SortDirection === ColumnSortDirection.NONE) {
                      column.SortOrder = -1;
                    } else {
                      column.SortOrder = Number.MAX_VALUE;
                    }

                    if (!prevState.multiSort) {
                      columns.filter((col: any) => col.Name !== property).forEach(($column: any) => {
                        $column.SortOrder = -1;
                        $column.SortDirection = ColumnSortDirection.NONE;
                      });
                    }

                    const currentlySortedColumns = columns
                      .filter((col: ColumnModel) => col.SortOrder > 0)
                      .sort((a: ColumnModel, b: ColumnModel) => a.SortOrder === b.SortOrder ? 0 : (a.SortOrder > b.SortOrder ? 1 : -1));

                    currentlySortedColumns.forEach(($column: any, i: number) => {
                      $column.SortOrder = i + 1;
                    });
                  }
                });

                return {
                  activeColumn: null,
                  gridRequest: new GridRequest(columns, prevState.rowsPerPage, prevState.page, prevState.searchText)
                }
              }, () => this.refreshGrid());
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
            textSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => {            
              const text = event.target.value;
              gridRequest.Search={ Text: text, Operator: 'Auto' };
              this.setState({ searchText: text}, () => this.refreshGrid());
            },
            clearSearchText: () => {
              this.setState({
                searchText: ''
              }, () => this.refreshGrid());
            },
            printDocument: (allRows: boolean) => {
              if (filteredRecordCount == 0) return;

              let gridRequestColumns = gridRequest.Columns;

              if (allRows) {
                gridRequest.Take = -1;
                this.props.dataSource.getAllRecords(gridRequest)
                  .then(({ Payload }: any) => GridToolbarFunctions.printDocument(Payload, gridRequestColumns, this.props.gridName));
              } else {
                GridToolbarFunctions.printDocument(this.state.data, gridRequestColumns, this.props.gridName)
              }
            },
            exportCSV: (allRows: boolean) => {
              if (filteredRecordCount == 0) return;

              let gridRequestColumns = gridRequest.Columns;

              if (allRows) {
                gridRequest.Take = -1;
                this.props.dataSource.getAllRecords(gridRequest)
                  .then(({ Payload }: any) => GridToolbarFunctions.exportCSV(Payload, gridRequestColumns));
              } else {
                GridToolbarFunctions.exportCSV(this.state.data, gridRequestColumns);
              }
            }
          }
        }}>
          {snackbar}
          <GridToolbar
            toolbarOptions={toolbarOptions}
            filteredRecordCount={filteredRecordCount}
          />
          <Table>
            <TableHead>
              {paginator}
              <GridHeader />
            </TableHead>
            {body}
            <TableFooter>
              {footerRenderer(aggregate)}
              {paginator}
            </TableFooter>
          </Table>
        </GridProvider>
      </Paper>
    );
  }
}

export default withStyles(styles)(DataGrid);
