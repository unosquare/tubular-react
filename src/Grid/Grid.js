import GridHeader from './GridHeader';
import GridToolbar from './GridToolbar';
import Pager from './Pager';
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
      showFooter: this.props.showFooter,
      dataSource: this.props.dataSource,
      searchText: '',
      data: [],
      totalRecordCount: 0,
      filteredRecordCount: 0
    };

    this.search = new Subject();
  }

  componentDidMount() {
    this.state.dataSource.connect(this.state.rowsPerPage, this.state.page)
      .subscribe(tbResponse => {
        this.setState({
          data: tbResponse.Payload,
          totalRecordCount: tbResponse.TotalRecordCount || 0,
          filteredRecordCount: tbResponse.FilteredRecordCount || 0
        });
      });

    this.search.debounce(600).subscribe(() => {
      const { dataSource, rowsPerPage, page, searchText } = this.state;
      dataSource.refresh(rowsPerPage, page, searchText);
    });
  }

  handleTextSearch = searchText => {   
    this.setState({ searchText }, () => this.search.onNext());
  }

  handlePager = (rowsPerPage, page) => {
    this.setState({ rowsPerPage, page });
  }

  refreshGrid = () => {
    const { dataSource, rowsPerPage, page, searchText } = this.state;
    dataSource.refresh(rowsPerPage, page, searchText);
  }

  render() {
    const { classes, bodyRenderer, showBottomPager, showTopPager } = this.props;
    const { data, rowsPerPage, page, dataSource } = this.state;

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
                      {row[column.Name]}
                    </TableCell>)
                }
              </TableRow>              
          ))
        }
      </TableBody>
    );

    const pager = (
      <TableRow>
        <Pager
          dataSource={dataSource}
          rowsPerPage={rowsPerPage}
          page={page}
          filteredRecordCount={this.state.filteredRecordCount}
          totalRecordCount={this.state.totalRecordCount}
          handlePager={this.handlePager.bind(this)}
        />
      </TableRow>
    );

    return (
      <Paper className={classes.root}>
        <GridToolbar onSearchTextChange={this.handleTextSearch} />
        <Table className={classes.table}>
          <TableHead>

            { showTopPager && pager }

            <GridHeader
              dataSource={dataSource}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </TableHead>

          { body }
          
          <TableFooter>

            { showBottomPager && pager }

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
  rowsPerPage: PropTypes.number,
  title: PropTypes.string
};

export default withStyles(styles)(Grid);