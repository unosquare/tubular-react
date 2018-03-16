import { debounce } from 'lodash';
import { WithStyles, withStyles } from 'material-ui';
import CheckBox from 'material-ui-icons/CheckBox';
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';
import WarningIcon from 'material-ui-icons/Warning';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { StyleRules, Theme } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import * as moment from 'moment';
import * as React from 'react';
import BaseDataSource from './BaseDataSource';
import { ColumnDataType } from './Column';
import ColumnModel from './ColumnModel';
import GridHeader from './GridHeader';
import GridResponse from './GridResponse';
import GridToolbar from './GridToolbar';
import Paginator from './Paginator';

const styleClasses = {
  dialogButtonStyle: '',
  dialogContentStyle: '',
  dialogTitleStyle: '',
  root: ''
};

const styles = (theme: Theme): StyleRules<keyof typeof styleClasses> => (
  {
    dialogButtonStyle: {
      background: '#28b62c',
      color: 'white',
      marginBottom: '5px',
      marginRight: '5px',
      minWidth: '90px'
    },
    dialogContentStyle: {
      color: 'black',
      paddingTop: '25px'
    },
    dialogTitleStyle: {
      background: '#ececec',
      minWidth: '300px'
    },
    root: {
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      width: '100%'
    }
  });

interface IState {
  aggregate: any;
  data: any[];
  dataSource: BaseDataSource;
  errorMessage: string;
  filteredRecordCount: number;
  open: boolean;
  page: number;
  rowsPerPage: number;
  searchText: string;
  totalRecordCount: number;
}

interface IProps {
  dataSource: BaseDataSource;
  gridName: string;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  showBottomPager?: boolean;
  showTopPager?: boolean;
  showPrintButton?: boolean;
  showExportButton?: boolean;
  showSearchText?: boolean;
  onError?(error: any): any;
  bodyRenderer?(column: any, index: number): any;
  footerRenderer?(aggregate: any): any;
}

class DataGrid extends React.Component<IProps & WithStyles<keyof typeof styleClasses>, IState> {
  public state = {
    aggregate: {},
    data: [] as any,
    dataSource: this.props.dataSource,
    errorMessage: '',
    filteredRecordCount: 0,
    open: false,
    page: 0,
    rowsPerPage: this.props.rowsPerPage,
    searchText: '',
    totalRecordCount: 0
  };

  public componentDidMount() {
    if (this.props.rowsPerPageOptions) {
      this.rowsPerPageChecker(this.props.rowsPerPageOptions);
    } else {
      this.rowsPerPageChecker([10, 20, 50, 100]);
    }

    const pageSize = parseInt(localStorage.getItem(`tubular.${this.props.gridName}_pageSize`), 10) ||
      this.props.rowsPerPage;
    const searchText = localStorage.getItem(`tubular.${this.props.gridName}_searchText`) || '';

    this.state.dataSource.retrieveData(pageSize, this.state.page, searchText)
      .subscribe((tbResponse: GridResponse) => {
        this.setState({
          aggregate: tbResponse.Aggregate,
          data: tbResponse.Payload,
          filteredRecordCount: tbResponse.FilteredRecordCount || 0,
          rowsPerPage: tbResponse.RowsPerPage || 10,
          searchText: tbResponse.SearchText || '',
          totalRecordCount: tbResponse.TotalRecordCount || 0
        });
      }, (error: any) => {
        if (!this.props.onError) {
          throw error;
        }

        this.props.onError(error);
      });
  }

  public componentWillMount() {
    this.handleTextSearch = debounce(this.handleTextSearch, 600);
  }

  public rowsPerPageChecker = (rowsPerPageOptions: number[]) => {
    const index = rowsPerPageOptions.indexOf(this.props.rowsPerPage);

    if (index === -1) {
      this.setState({
        errorMessage: 'The rowsPerPage value should be: ' + rowsPerPageOptions.toString()
      },
        () => this.handleOpen()
      );
    }
  }

  public handleTextSearch = (searchText: string) => {
    this.setState({ searchText }, () => this.refreshGrid());
  }

  public handlePager = (rowsPerPage: number, page: number) => {
    this.setState({ rowsPerPage, page }, () => this.refreshGrid());
  }

  public refreshGrid = () => {
    const { dataSource, rowsPerPage, page, searchText } = this.state;

    dataSource.retrieveData(rowsPerPage, page, searchText);

    localStorage.setItem(`tubular.${this.props.gridName}`, JSON.stringify(dataSource.columns));
    localStorage.setItem(`tubular.${this.props.gridName}_pageSize`, String(rowsPerPage));
    localStorage.setItem(`tubular.${this.props.gridName}_searchText`, searchText);
  }

  public printTable = (filtered: boolean) => {
    const { dataSource, filteredRecordCount, searchText } = this.state;
    let count;
    let page;

    if (filteredRecordCount === 0) {
      return;
    }

    if (filtered) {
      count = this.state.rowsPerPage;
      page = this.state.page;
    } else {
      count = filteredRecordCount;
      page = 0;
    }

    dataSource.getAllRecords(count, page, searchText)
      .then(({ Payload }: any) => {
        const popup = window.open('about:blank', 'Print', 'location=0,height=500,width=800');
        popup.document
          .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');

        const tableHtml = `<table class="table table-bordered table-striped"><thead><tr>${
          dataSource.columns
            .filter((c: any) => c.Visible)
            .reduce((prev: any, el: any) => `${prev}<th>${el.Label || el.Name}</th>`, '')
          }</tr></thead><tbody>${
          Payload.map((row: any) => {
            if (row instanceof Object) {
              row = Object.keys(row).map((key: any) => row[key]);
            }
            return `<tr>${row.map((cell: any, index: number) => {
              if (dataSource.columns[index] && !dataSource.columns[index].Visible) {
                return '';
              }
              return `<td>${
                dataSource.columns[index].DataType === ColumnDataType.DATE ||
                dataSource.columns[index].DataType === ColumnDataType.DATE_TIME ||
                dataSource.columns[index].DataType === ColumnDataType.DATE_TIME_UTC ?
                  moment(cell).format('MMMM Do YYYY, h:mm:ss a') :
                dataSource.columns[index].DataType === ColumnDataType.BOOLEAN ? (cell === true ? 'Yes' : 'No') :
                  cell || 0}</td>`;
            }).join(' ')}</tr>`;
          }).join(' ')}</tbody></table>`;
        popup.document.title = this.props.gridName;
        popup.document.write('<body onload="window.print();">');
        popup.document.write(`<h1>${this.props.gridName}</h1>`);
        popup.document.write(tableHtml);
        popup.document.write('</body>');
        popup.document.close();
      });
  }

  public exportTable = (filtered: boolean) => {
    const { dataSource, filteredRecordCount, totalRecordCount, searchText } = this.state;
    const header = dataSource.columns.map((x: any) => x.Label);
    const visibility = dataSource.columns.map((x: any) => x.Visible);
    let count;
    let page;

    const processRow = (row: any) => {
      if (row instanceof Object) {
        row = Object.keys(row).map((key: any) => row[key]);
      }

      let finalVal = '';

      for (let i = 0; i < row.length; i++) {
        if (visibility[i]) {
          let innerValue = row[i] === null || row[i] === undefined ? '' :
            (typeof(row[i]) === 'boolean') ? (row[i] === true && 'Yes') :
            row[i].toString();

          if (moment(row[i], moment.ISO_8601, true).isValid()) {
            innerValue = moment(row[i]).format('MMMM Do YYYY, h:mm:ss a');
          }

          let result = innerValue.replace(/"/g, '""');

          if (result.search(/("|,|\n)/g) >= 0) {
            result = `"${result}"`;
          }

          if (i > 0) {
            finalVal += ',';
          }

          finalVal += result;
        }
      }

      return `${finalVal}\n`;
    };

    let csvFile = '';
    if (header.length > 0) {
      csvFile += processRow(header);
    }
    if (filtered) {
      count = this.state.rowsPerPage;
      page = this.state.page;
    } else {
      count = filteredRecordCount;
      page = 0;
    }

    dataSource.getAllRecords(count, page, searchText)
      .then(({ Payload }: any) => {
        Payload.forEach((row: any) => {
          csvFile += processRow(row);
        });
      }).then(() => {
        const blob = new Blob([`\uFEFF${csvFile}`], {
          type: 'text/csv;charset=utf-8;'
        });

        const fileURL = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');

        downloadLink.setAttribute('href', fileURL);
        downloadLink.setAttribute('id', 'download');
        downloadLink.setAttribute('download', 'data.csv');
        document.body.appendChild(downloadLink);

        downloadLink.click();
        URL.revokeObjectURL(fileURL);
      });
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
    const { classes, bodyRenderer, footerRenderer, showBottomPager, rowsPerPageOptions,
      showTopPager, showPrintButton, showExportButton } = this.props;
    const { data, rowsPerPage, page, dataSource, aggregate, filteredRecordCount, totalRecordCount } = this.state;

    const body = (
      <TableBody>
        {data.map((row: any, rowIndex: number) => (
          bodyRenderer
            ? bodyRenderer(row, rowIndex)
            : <TableRow hover={true} key={rowIndex}>
              {
                dataSource.columns.filter((col: any) => col.Visible).map((column: ColumnModel, colIndex: number) =>
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
            <TableCell style={{ display: 'flex', padding: '10px' }}>
              <WarningIcon />
              <Typography style={{ paddingLeft: '15px' }} variant='body2' gutterBottom={true}>
                No records found
              </Typography>
            </TableCell>
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
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{this.state.errorMessage}</span>}
      />
    );

    return (
      <Paper className={classes.root}>
        {snackbar}
        <GridToolbar
          filteredRecordCount={filteredRecordCount}
          gridName={this.props.gridName}
          showSearchText={this.props.showSearchText}
          onSearchTextChange={this.handleTextSearch}
          isPrintEnabled={showPrintButton}
          isExportEnabled={showExportButton}
          onPrint={this.printTable}
          onExport={this.exportTable}
        />
        <Table>
          <TableHead>
            {showTopPager && paginator}
            <GridHeader
              gridName={this.props.gridName}
              dataSource={dataSource}
              page={page}
              rowsPerPage={rowsPerPage}
              refreshGrid={this.refreshGrid}
            />
          </TableHead>
          {body}
          <TableFooter>
            {footerRenderer && footerRenderer(aggregate)}
            {showBottomPager && paginator}
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(DataGrid);
