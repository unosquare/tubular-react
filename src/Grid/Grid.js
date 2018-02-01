import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import Paginator from './Paginator';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { Subject } from 'rx';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
});

class Grid extends React.Component {
  static defaultProps = {
    rowsPerPage: 5,
    page: 0,
    title: ''
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
    this.state.dataSource.connect(this.state.rowsPerPage, this.state.page)
      .subscribe(tbResponse => {
        this.setState({
          data: tbResponse.payload,
          totalRecordCount: tbResponse.totalRecordCount || 0,
          filteredRecordCount: tbResponse.filteredRecordCount || 0,
          aggregate: tbResponse.aggregate
        });
      });

    this.search.debounce(600).subscribe(() => {
      this.refreshGrid();
    });

    const pageSize = parseInt(localStorage.getItem(`tubular.${this.props.gridName}_pageSize`)) || 10;
    const searchText = localStorage.getItem(`tubular.${this.props.gridName}_searchText`) || '';
    
    this.setState({ 
      rowsPerPage: pageSize,
      searchText: searchText
    }, () => this.refreshGrid() );
  }

  handleTextSearch = searchText => {   
    this.setState({ searchText }, () => this.search.onNext());
  }

  handlePager = (rowsPerPage, page) => {
    this.setState({ rowsPerPage, page }, this.refreshGrid );
  }

  refreshGrid = () => {
    const { dataSource, rowsPerPage, page, searchText } = this.state;
    dataSource.refresh(rowsPerPage, page, searchText);

    localStorage.setItem(`tubular.${this.props.gridName}`, JSON.stringify(dataSource.columns) );
    localStorage.setItem(`tubular.${this.props.gridName}_pageSize`, rowsPerPage );
    localStorage.setItem(`tubular.${this.props.gridName}_searchText`, searchText );
  }

  printTable = () => {
    const { dataSource, filteredRecordCount, searchText } = this.state;
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
        popup.document.write(tableHtml);
        popup.document.write('</body>');
        popup.document.close();
      });
  }

  render() {
    const { classes, bodyRenderer, footerRenderer, showBottomPager, showTopPager } = this.props;
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
        <GridToolbar gridName = {this.props.gridName} onSearchTextChange={this.handleTextSearch} isPrintEnabled onPrint={this.printTable} />
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
  rowsPerPage: PropTypes.number,
  title: PropTypes.string
};

export default withStyles(styles)(Grid);