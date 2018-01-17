import Axios from 'axios';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
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
        this.setState({ records: response.data });
      });
  }

  render() {

    const { classes, columns } = this.props;
    const { data, records, rowsPerPage, page, order, orderBy } = this.state;

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
  initialSort: PropTypes.shape({
    column: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired
  }),
  rowsPerPage: PropTypes.number,    
  title: PropTypes.string,
  serverUrl: PropTypes.string.isRequired
};

export default withStyles(styles)(Grid);