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

class Grid extends React.Component {
  static defaultProps = {
    rowsPerPage: 5,
    page: 0,
    title: ''
  }

  state = {
    page: this.props.page,
    rowsPerPage: this.props.rowsPerPage,
    dataSource: this.props.dataSource,
    data: [],
    columns: this.props.columns
  }

  componentDidMount() {
    this.state.dataSource.connect(this.state.columns, this.state.rowsPerPage, this.state.page)
      .subscribe(tbResponse => {
        this.setState({
          data: tbResponse.Payload
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page, columns } = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map(column =>
                <TableCell key={column.Name}>
                  {column.Label}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((row, rowIndex) => (
                <TableRow hover key={rowIndex}>
                  {columns.map((column, colIndex) =>
                    <TableCell key={colIndex} padding={column.label === '' ? 'none' : 'default'}>
                      {row[column.Name]}
                    </TableCell>
                  )}
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
      Name: PropTypes.string.isRequired,
      Label: PropTypes.string.isRequired,
      Sortable: PropTypes.bool,
      SortOrder: PropTypes.number,
      SortDirection: PropTypes.oneOf(['None', 'Asc', 'Desc']).isRequired,
      Searchable: PropTypes.bool.isRequired,
      Visible: PropTypes.bool.isRequired,
      IsKey: PropTypes.bool.isRequired,
      DataType: PropTypes.oneOf(['date', 'datetime', 'datetimeutc', 'numeric', 'boolean', 'string']).isRequired,
      Filter: PropTypes.any
    })).isRequired,
  dataSource: PropTypes.any.isRequired,
  rowsPerPage: PropTypes.number,
  title: PropTypes.string
};
export default withStyles(styles)(Grid);