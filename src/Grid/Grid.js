import Axios from 'axios';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
});

class Grid extends Component {
  
  static defaultProps = {
    rowsPerPage: 5,
    page: 0,
    initialSort: {
      column: '',
      order: 'asc'
    },
    showTableFooter: true,
    title: ''
  }

  state = {
    order: this.props.initialSort.order,
    orderBy: this.props.initialSort.column,
    page: this.props.page,
    rowsPerPage: this.props.rowsPerPage,
    data: this.props.data,

    serverUrl: this.props.serverUrl,
    records: []
  }

  componentWillMount = () => {
    Axios.get(this.state.serverUrl)
      .then(response => {
        console.log(response.data);
        this.setState({ records: response.data });
      });
  }

  handleChangePage = (event, page) => {
    const { onNextPageClick } = this.props;

    if (onNextPageClick) {
      onNextpageClick(event);
    }
    else {
      this.setState({ page });
    }
  };

  handleChangeRowsPerPage = event => {
    const { handleChangeRowsPerPage } = this.props;

    if (!handleChangeRowsPerPage) 
      this.setState({ rowsPerPage: event.target.value });
  };

  render() {

    const { classes, columns, showTableFooter } = this.props;
    const { data, records, rowsPerPage, page, order, orderBy } = this.state;
    
    const totalCount = records.length;
    let tableFooter;

    if(showTableFooter) {
      tableFooter = (
        <TableFooter>
          <TableRow>
            <TablePagination count = { totalCount } rowsPerPage = { rowsPerPage } page = { page } onChangePage = { this.handleChangePage } onChangeRowsPerPage = { this.handleChangeRowsPerPage } />
          </TableRow>
        </TableFooter>
      );
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              { columns.map(column => 
                <TableCell key={column.key}>
                  {column.label}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                <TableRow hover key={rowIndex}>
                  { columns.map((column, index) => 
                    <TableCell key={index} padding={column.label === '' ? 'none' : 'default'}>
                      { row[column.key] && row[column.key] }
                    </TableCell>
                  ) }
                </TableRow>
              ))}
          </TableBody>
          { tableFooter }
        </Table>
      </Paper>);
  }
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool.isRequired,
      render: PropTypes.func
    })).isRequired,
  data: PropTypes.array.isRequired,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  initialSort: PropTypes.shape({
    column: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired
  }),
  rowsPerPage: PropTypes.number,    
  serverUrl: PropTypes.string.isRequired,
  showTableFooter: PropTypes.bool,
  title: PropTypes.string
};

export default withStyles(styles)(Grid);