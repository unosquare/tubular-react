import GridHeader from './GridHeader';
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
    gridFooterDefinition: this.props.gridFooterDefinition,
    dataSource: this.props.dataSource,
    data: [],
    currentData: []
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

  render() {
    const { classes, bodyRenderer } = this.props;
    const { data, rowsPerPage, page, columns, dataSource, showFooter, gridFooterDefinition } = this.state;

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
            showFooter === true && 
              this.props.children
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
  rowsPerPage: PropTypes.number,
  title: PropTypes.string
};

export default withStyles(styles)(Grid);
