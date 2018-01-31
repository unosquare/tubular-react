import GridHeader from './GridHeader.js';
import GridToolbar from './GridToolbar';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from 'material-ui/Table';

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

  state = {
    page: this.props.page,
    rowsPerPage: this.props.rowsPerPage,
    gridFooterDefinition: this.props.gridFooterDefinition,
    dataSource: this.props.dataSource,
    data: [],
    currentData: [],
    aggregate: {}
  }

  componentDidMount() {
    this.state.dataSource.connect(this.state.rowsPerPage, this.state.page)
      .subscribe(tbResponse => {
        this.setState({
          data: tbResponse.Payload,
          aggregate: tbResponse.Aggregate
        });
      });
  }

  handleTextSearch = text => {
    this.state.dataSource.search(this.state.rowsPerPage, this.state.page, text);
  }

  printTable = () => {
    this.state.dataSource.getAllRecords(this.state.filteredRecordCount, this.state.searchText)
      .then(rows => {
        const popup = window.open('about:blank', 'Print', 'location=0,height=500,width=800');
        popup.document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        const tableHtml = `<table class="table table-bordered table-striped"><thead><tr>${
          this.state.dataSource.columns
            .filter(c => c.Visible)
            .reduce((prev, el) => `${prev}<th>${el.Label || el.Name}</th>`, '')
        }</tr></thead><tbody>${ 
          rows.map(row => {
            if(typeof(row) === 'object'){
              row = Object.keys(row).map(key => row[key]);
            }
            return `<tr>${row.map(cell => `<td>${cell}</td>`).join(' ')}</tr>`;
          }).join(' ')}</tbody></table>`;
        popup.document.write('<body onload="window.print();">');
        popup.document.write('<h1>Title</h1>');
        popup.document.write(tableHtml);
        popup.document.write('</body>');
        popup.document.close();
      });
  }

  render() {
    const { classes, bodyRenderer, footerRenderer } = this.props;
    const { data, rowsPerPage, page, columns, dataSource, gridFooterDefinition, aggregate } = this.state;
    
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
                        row[column.Name]
                      }
                    </TableCell>)
                }
              </TableRow>              
          ))
        }
      </TableBody>
    );

    return (
      <Paper className={classes.root}>
        <GridToolbar onSearchTextChange={this.handleTextSearch} />
        <Table className={classes.table}>
          <GridHeader
            dataSource={dataSource}
            page={page}
            rowsPerPage={rowsPerPage}
          />
          { body }
          {
            footerRenderer &&
              footerRenderer(aggregate)
          }
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