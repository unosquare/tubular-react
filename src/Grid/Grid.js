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
    showFooter: this.props.showFooter,
    dataSource: this.props.dataSource,
    data: []
  }

  componentDidMount() {
    this.state.dataSource.connect(this.state.rowsPerPage, this.state.page)
      .subscribe(tbResponse => {
        this.setState({
          data: tbResponse.Payload
        });
      });
  }

  handleTextSearch = text => {
    this.state.dataSource.search(this.state.rowsPerPage, this.state.page, text);
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
    const { classes } = this.props;
    const { data, rowsPerPage, page, dataSource, showFooter } = this.state;
    
    const totalCount = data.length;

    return (
      <Paper className={classes.root}>
        <GridToolbar onSearchTextChange={this.handleTextSearch} />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {dataSource.columns.map(column =>
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
                  {dataSource.columns.map((column, colIndex) =>
                    <TableCell key={colIndex} padding={column.label === '' ? 'none' : 'default'}>
                      {row[column.Name]}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
          { 
            showFooter === true &&
              <TableFooter>
                <TableRow>
                  <TablePagination count = { totalCount } rowsPerPage = { rowsPerPage } page = { page } onChangePage = { this.handleChangePage } onChangeRowsPerPage = { this.handleChangeRowsPerPage } />
                </TableRow>
              </TableFooter>
          }
        </Table>
      </Paper>);
  }
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired,
  dataSource: PropTypes.any.isRequired,
  rowsPerPage: PropTypes.number,
  title: PropTypes.string
};
export default withStyles(styles)(Grid);