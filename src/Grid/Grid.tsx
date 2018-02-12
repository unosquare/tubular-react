import { WithStyles, withStyles } from 'material-ui';
import WarningIcon from 'material-ui-icons/Warning';
import Paper from 'material-ui/Paper';
import { StyleRules, Theme } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Rx from 'rx';
import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import Paginator from './Paginator';

const styleClasses  = {
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
  page: number;
  rowsPerPage: number;
  dataSource: any;
  searchText: string;
  data: any[];
  totalRecordCount: number;
  filteredRecordCount: number;
}

interface IProps {
  dataSource: any;
  gridName: string;
  page?: number;
  rowsPerPage: number;
  showBottomPager?: boolean;
  showTopPager?: boolean;
  showPrintButton?: boolean;
  showExportButton?: boolean;
  bodyRenderer?(column: any, index: number): any;
  footerRenderer?(aggregate: any): any;

}

class Grid extends React.Component <IProps & WithStyles<keyof typeof styleClasses>, IState> {
  public static defaultProps = {
    gridName: '',
    page: 0,
    rowsPerPage: 10
  };

  public state = {
    aggregate: {},
    data: [] as any,
    dataSource: this.props.dataSource,
    filteredRecordCount: 0,
    page: this.props.page,
    rowsPerPage: this.props.rowsPerPage,
    searchText: '',
    totalRecordCount: 0,
  };

  private search: Rx.Subject<{}>;

  public componentDidMount() {
    this.search = new Rx.Subject();
    const pageSize = parseInt(localStorage.getItem(`tubular.${this.props.gridName}_pageSize`), 10) || 10;
    const searchText = localStorage.getItem(`tubular.${this.props.gridName}_searchText`) || '';

    this.state.dataSource.connect(pageSize, this.state.page, searchText)
      .subscribe((tbResponse: any) => {
        this.setState({
          aggregate: tbResponse.aggregate,
          data: tbResponse.payload,
          filteredRecordCount: tbResponse.filteredRecordCount || 0,
          rowsPerPage: tbResponse.rowsPerPage || 10,
          searchText: tbResponse.searchText || '',
          totalRecordCount: tbResponse.totalRecordCount || 0
        });
      });

    this.search.debounce(600).subscribe(() => {
      this.refreshGrid();
    });
  }

  public handleTextSearch = (searchText: string) => {
    this.setState({ searchText }, () => this.search.onNext({}));
  }

  public handlePager = (rowsPerPage: number, page: number) => {
    this.setState({ rowsPerPage, page }, () => this.refreshGrid());
  }

  public refreshGrid = () => {
    const { dataSource, rowsPerPage, page, searchText } = this.state;

    dataSource.refresh(rowsPerPage, page, searchText);

    localStorage.setItem(`tubular.${this.props.gridName}`, JSON.stringify(dataSource.columns));
    localStorage.setItem(`tubular.${this.props.gridName}_pageSize`, String(rowsPerPage));
    localStorage.setItem(`tubular.${this.props.gridName}_searchText`, searchText);
  }

  public printTable = () => {
    const { dataSource, filteredRecordCount, searchText } = this.state;

    if (filteredRecordCount === 0) {
      return;
    }

    dataSource.getAllRecords(filteredRecordCount, 0, searchText)
      .then(({ payload }: any) => {
        const popup = window.open('about:blank', 'Print', 'location=0,height=500,width=800');
        popup.document
        .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        const tableHtml = `<table class="table table-bordered table-striped"><thead><tr>${
          dataSource.columns
            .filter((c: any) => c.Visible)
            .reduce((prev: any, el: any) => `${prev}<th>${el.Label || el.Name}</th>`, '')
        }</tr></thead><tbody>${
          payload.map((row: any) => {
            if (row instanceof Object) {
              row = Object.keys(row).map((key: any) => row[key]);
            }
            return `<tr>${row.map((cell: any, index: number) => {
              if (dataSource.columns[index] && !dataSource.columns[index].Visible) {
                return '';
              }
              return `<td>${ dataSource.columns[index].DataType === 'datetime' ||
              dataSource.columns[index].DataType === 'date' ||
              dataSource.columns[index].DataType === 'datetimeutc' ?
                moment(cell).format('MMMM Do YYYY, h:mm:ss a') :
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

  public exportTable = (filtered: any) => {
    const { dataSource, filteredRecordCount, totalRecordCount, searchText } = this.state;
    const header = dataSource.columns.map((x: any) => x.Label);
    const visibility = dataSource.columns.map((x: any) => x.Visible);
    let count;
    let search;
    const processRow = (row: any) => {
      if (row instanceof Object) {
        row = Object.keys(row).map((key: any) => row[key]);
      }

      let finalVal = '';

      for (let i = 0; i < row.length; i++) {
        if (visibility[i]) {
          let innerValue = row[i] === null || row[i] === undefined ? '' : row[i].toString();
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
      count = filteredRecordCount;
      search = searchText;
    } else {
      count = totalRecordCount;
      search = '';
    }
    dataSource.getAllRecords(count, 0, search)
      .then(({payload}: any) => {
        payload.forEach((row: any) => {
          csvFile += processRow(row);
        });
      }).then(() => {
        const blob = new Blob([`\uFEFF${csvFile}`], {
          type: 'text/csv;charset=utf-8;'
        });
        const fileURL = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', fileURL);
        downloadLink.setAttribute('download', 'data.csv');
        downloadLink.click();
        URL.revokeObjectURL(fileURL);
      });
  }

  public render() {
    const { classes, bodyRenderer, footerRenderer, showBottomPager,
      showTopPager, showPrintButton, showExportButton } = this.props;
    const { data, rowsPerPage, page, dataSource, aggregate, filteredRecordCount, totalRecordCount } = this.state;

    const body = (
      <TableBody>
        {
          data.map((row: any, rowIndex: number) => (
            bodyRenderer
              ? bodyRenderer(row, rowIndex)
              : <TableRow hover={true} key={rowIndex}>
                {
                  dataSource.columns.filter((col: any) => col.Visible).map((column: any, colIndex: number) =>
                    <TableCell key={colIndex} padding={column.label === '' ? 'none' : 'default'}>
                      {
                        column.DataType === 'numeric' ?
                          row[column.Name] || 0 :
                          column.DataType === 'datetime'
                          || column.DataType === 'date'
                          || column.DataType === 'datetimeutc'
                          ? moment(row[column.Name]).format('MMMM Do YYYY, h:mm:ss a') || ''
                          : row[column.Name]
                      }
                    </TableCell>)
                }
              </TableRow>
          ))
        }
        {
          filteredRecordCount === 0 &&
          (<TableRow>
            <TableCell style={{ display: 'flex', padding: '10px' }}>
              <WarningIcon />
              <Typography style={{ paddingLeft: '15px' }} type='body2' gutterBottom={true}>
                No records found
              </Typography>
            </TableCell>
          </TableRow>)
        }
      </TableBody>
    );

    const paginator = (
      <TableRow>
        <Paginator
          rowsPerPage={rowsPerPage}
          page={page}
          filteredRecordCount={filteredRecordCount}
          totalRecordCount={totalRecordCount}
          handlePager={this.handlePager}
        />
      </TableRow>
    );

    return (
      <Paper className={classes.root}>
        <GridToolbar
          filteredRecordCount={filteredRecordCount}
          gridName={this.props.gridName}
          onSearchTextChange={this.handleTextSearch}
          isPrintEnabled={showPrintButton}
          isExportEnabled={showExportButton}
          onPrint={this.printTable}
          onExport={this.exportTable}
        />
        <Table className={classes.table}>
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

export default withStyles(styles)(Grid);
