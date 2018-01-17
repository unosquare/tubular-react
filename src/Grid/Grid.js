import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }
});

class Grid extends React.Component{
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
    data: this.props.data
  }

  render() {
    const { classes, columns } = this.props;
    const { data, rowsPerPage, page, order, orderBy } = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              { columns.map(column => 
                <TableCell key={column.name}>
                  {column.label}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                <TableRow hover key={rowIndex}>
                  { columns.map((column, index) => 
                    <TableCell key={index} padding={column.label === '' ? 'none' : 'default'}>
                      { row[column.name] && row[column.name] }
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
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool.isRequired,
      sortOrder: PropTypes.number,
      sortDirection: PropTypes.oneOf(['none', 'asc', 'desc']).isRequired,
      searchable: PropTypes.bool.isRequired,
      visible: PropTypes.bool.isRequired,
      isKey: PropTypes.bool.isRequired,
      dataType: PropTypes.oneOf(['date', 'numeric', 'boolean', 'string']).isRequired
    })).isRequired,
  data: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number,    
  title: PropTypes.string
};
export default withStyles(styles)(Grid);