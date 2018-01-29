import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import Pager from './Pager';
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
    data: [],
    totalRecordCount: 0
  }

  componentDidMount() {
    this.state.dataSource.connect(this.state.rowsPerPage, this.state.page)
      .subscribe(tbResponse => {
        this.setState({
          data: tbResponse.Payload,
          totalRecordCount: tbResponse.TotalRecordCount !== undefined ? tbResponse.TotalRecordCount : 0
        });
      });
  }

  handleTextSearch = text => {
    this.state.dataSource.search(this.state.rowsPerPage, this.state.page, text);
  }

  handlePager = (rowsPerPage, page) => {
    this.setState({ rowsPerPage, page });
  }

  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page, dataSource, showFooter } = this.state;
    
    return (
      <Paper className={classes.root}>
        <GridToolbar onSearchTextChange={this.handleTextSearch} />
        <Table className={classes.table}>
          <GridHeader
            dataSource={dataSource}
            page={page}
            rowsPerPage={rowsPerPage}
          />
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
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <Pager
                dataSource={dataSource}
                rowsPerPage={rowsPerPage}
                page={page}
                totalRecordCount={this.state.totalRecordCount}
                handlePager={this.handlePager.bind(this)}
              />
            </TableRow> 
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired,
  dataSource: PropTypes.any.isRequired,
  rowsPerPage: PropTypes.number,
  title: PropTypes.string
};

export default withStyles(styles)(Grid);