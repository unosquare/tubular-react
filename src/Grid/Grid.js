import Button from 'material-ui/Button';
import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import Paginator from './Paginator';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { Subject } from 'rx';
import Typography from 'material-ui/Typography';
import WarningIcon from 'material-ui-icons/Warning';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
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
      aggregate: {},
      printError: false
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

    localStorage.setItem(`tubular.${this.props.gridName}`, JSON.stringify(dataSource.columns) );
    localStorage.setItem(`tubular.${this.props.gridName}_pageSize`, rowsPerPage );
    localStorage.setItem(`tubular.${this.props.gridName}_searchText`, searchText );
  }

  openPrintErrorHandler = () => {
    this.setState({ printError: true });
  }

  closePrintErrorHandler = () => {
    this.setState({ printError: false });
  }

  printTable = () => {
    const { dataSource, filteredRecordCount, searchText } = this.state;

    if(filteredRecordCount === 0){
      this.openPrintErrorHandler();
      return;
    }

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
            if(row instanceof Object){
              row = Object.keys(row).map(key => row[key]);
            }
            return `<tr>${row.map((cell, index) => {
              if(dataSource.columns[index] && !dataSource.columns[index].Visible){
                return '';
              }
              return `<td>${cell || ''}</td>`;
            }).join(' ')}</tr>`;
          }).join(' ')}</tbody></table>`;
        popup.document.write('<body onload="window.print();">');
        popup.document.write(`<h1>${this.props.gridName}</h1>`);
        popup.document.write(tableHtml);
        popup.document.write('</body>');
        popup.document.close();
      });
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
                  dataSource.columns.map((column, colIndex) =>
                    <TableCell key={colIndex} padding={column.label === '' ? 'none' : 'default'}>
                      {
                        column.Visible && row[column.Name]
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
                <WarningIcon/>
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

    const printErrorDialog = (
      <Dialog
        open={this.state.printError}
        onClose={this.closePrintErrorHandler}
      >
        <DialogTitle className={classes.dialogTitleStyle}>
          No records found
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentStyle}>
              There are no records to print
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={this.closePrintErrorHandler} 
            className={classes.dialogButtonStyle} 
            autoFocus
          >
              Ok
          </Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <Paper className={classes.root}>
        {printErrorDialog}
        <GridToolbar 
          gridName={this.props.gridName} 
          onSearchTextChange={this.handleTextSearch} 
          isPrintEnabled={showPrintButton} 
          isExportEnabled={showExportButton} 
          onPrint={this.printTable} 
        />
        <Table className={classes.table}>
          <TableHead>
            { showTopPager && paginator }

            <GridHeader
              gridName = {this.props.gridName}
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