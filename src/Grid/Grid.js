import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import Paginator from './Paginator';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { Subject } from 'rx';
import Typography from 'material-ui/Typography';
import WarningIcon from 'material-ui-icons/Warning';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  dialogButtonStyle: {
    background: '#28b62c', 
    color: 'white', 
    marginRight: '5px', 
    marginBottom: '5px', 
    minWidth: '90px'
  },
  dialogTitleStyle: {
    minWidth: '300px', 
    background: '#ececec' 
  },
  dialogContentStyle: {
    color: 'black', 
    paddingTop: '25px'
  }
});

class Grid extends React.Component {
  static defaultProps = {
    rowsPerPage: 10,
    page: 0,
    gridName: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      rowsPerPage: this.props.rowsPerPage,
      gridFooterDefinition: this.props.gridFooterDefinition,
      dataSource: this.props.dataSource,
      searchText: '',
      data: [],
      totalRecordCount: 0,
      filteredRecordCount: 0,
      aggregate: {}
    };

    this.search = new Subject();
  }

  componentDidMount() {
    const pageSize = parseInt(localStorage.getItem(`tubular.${this.props.gridName}_pageSize`)) || 10;
    const searchText = localStorage.getItem(`tubular.${this.props.gridName}_searchText`) || '';
    
    this.state.dataSource.connect(pageSize, this.state.page, searchText)
      .subscribe(tbResponse => {
        this.setState({
          data: tbResponse.payload,
          totalRecordCount: tbResponse.totalRecordCount || 0,
          filteredRecordCount: tbResponse.filteredRecordCount || 0,
          aggregate: tbResponse.aggregate,
          searchText: tbResponse.searchText || '',
          rowsPerPage: tbResponse.rowsPerPage || 10
        });
      });

    this.search.debounce(600).subscribe(() => {
      this.refreshGrid();
    });
  }

  handleTextSearch = searchText => { 
    this.setState({ searchText }, () => this.search.onNext());
  }

  handlePager = (rowsPerPage, page) => {
    this.setState({ rowsPerPage, page }, () => this.refreshGrid());
  }

  refreshGrid = () => {
    const { dataSource, rowsPerPage, page, searchText } = this.state;

    dataSource.refresh(rowsPerPage, page, searchText);

    localStorage.setItem(`tubular.${this.props.gridName}`, JSON.stringify(dataSource.columns));
    localStorage.setItem(`tubular.${this.props.gridName}_pageSize`, rowsPerPage);
    localStorage.setItem(`tubular.${this.props.gridName}_searchText`, searchText);
  }
  printTable = () => {
    const { dataSource, filteredRecordCount, searchText } = this.state;

    if(filteredRecordCount === 0)
      return;

    dataSource.getAllRecords(filteredRecordCount, 0, searchText)
      .then(({ payload }) => {
        const popup = window.open('about:blank', 'Print', 'location=0,height=500,width=800');
        popup.document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        const tableHtml = `<table class="table table-bordered table-striped"><thead><tr>${
          dataSource.columns
            .filter(c => c.Visible)
            .reduce((prev, el) => `${prev}<th>${el.Label || el.Name}</th>`, '')
          }</tr></thead><tbody>${
          payload.map(row => {
            if (row instanceof Object) {
              row = Object.keys(row).map(key => row[key]);
            }
            return `<tr>${row.map((cell, index) => {
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
  
  exportTable = filtered => {
    const { dataSource, filteredRecordCount, totalRecordCount, searchText } = this.state;
    const header = dataSource.columns.map(x => x.Label);
    const visibility = dataSource.columns.map(x => x.Visible);
    let count, search;
    const processRow = row => {
      if (row instanceof Object) {
        row = Object.keys(row).map(key => row[key]);
      }

      let finalVal = '';

      for (let i = 0; i < row.length; i++) {
        if (visibility[i]) {
          let innerValue = row[i] === null ? '' : row[i].toString();

          if (row[i] instanceof Date) {
            innerValue = row[i].toLocaleString();
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
    if(filtered){
      count = filteredRecordCount;
      search = searchText;
    }
    else{
      count = totalRecordCount;
      search = '';
    }
    dataSource.getAllRecords(count, 0, search)
      .then(({ payload }) => {
        payload.forEach(row => {
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
      })
  }
  render() {
    const { classes, bodyRenderer, footerRenderer, showBottomPager, showTopPager, showPrintButton, showExportButton } = this.props;
    const { data, rowsPerPage, page, dataSource, aggregate, filteredRecordCount, totalRecordCount } = this.state;

    const body = (
      <TableBody>
        {
          data.map((row, rowIndex) => (
            bodyRenderer
              ? bodyRenderer(row, rowIndex)
              : <TableRow hover key={rowIndex}>
                {                
                  dataSource.columns.filter(col => col.Visible).map((column, colIndex) =>
                    <TableCell key={colIndex} padding={column.label === '' ? 'none' : 'default'}>
                      {
                        column.DataType === 'numeric' ? 
                          row[column.Name] || 0 : 
                          column.DataType === 'datetime' || column.DataType === 'date' || column.DataType === 'datetimeutc' ? 
                            moment(row[column.Name]).format('MMMM Do YYYY, h:mm:ss a') || '' : 
                            row[column.Name]
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
              <Typography style={{ paddingLeft: '15px' }} type='body2' gutterBottom>
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
          dataSource={dataSource}
          rowsPerPage={rowsPerPage}
          page={page}
          filteredRecordCount={filteredRecordCount}
          totalRecordCount={totalRecordCount}
          handlePager={this.handlePager.bind(this)}
          refreshGrid={this.refreshGrid.bind(this)}
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
              refreshGrid={this.refreshGrid.bind(this)}
            />
          </TableHead>
          { body }
          <TableFooter>
            { footerRenderer && footerRenderer(aggregate) }
            { showBottomPager && paginator }
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

Grid.propTypes = {
  bodyRenderer: PropTypes.func,
  classes: PropTypes.object.isRequired,
  dataSource: PropTypes.any.isRequired,
  footerRenderer: PropTypes.func,
  gridName: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number
};

export default withStyles(styles)(Grid);
