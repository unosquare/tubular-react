import GridHeader from './GridHeader.js';
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
    currentData: []
  }

  functionHandler = functions => {
    this.setState({ functions }, () => {
      this.filterHandler();
    });
  }

  filterHandler = () => {
    if (this.state.functions[0] !== undefined) {
      const filter = this.state.functions[0];
      const dataSource = Object.assign([{}], this.state.dataSource);
      const functions = Object.assign([], this.state.functions);
      functions.splice(0, 1);

      for(let i = 0; i < dataSource.columns.length; i++){
        if(dataSource.columns[i].Name === filter.column){
          dataSource.columns[i].Filter.Text = filter.value;
          dataSource.columns[i].Filter.Operator = filter.filter;
          if(filter.value2 !== undefined){
            dataSource.columns[i].Filter.Argument = [filter.value2];
          }
        }
      }

      this.state.dataSource.filter(this.state.rowsPerPage, this.state.page);
      
      this.setState({ functions }, () => this.filterHandler());
    }
  }

  componentDidMount() {
    this.state.dataSource.connect(this.state.rowsPerPage, this.state.page)
      .subscribe(tbResponse => {
        this.setState({
          data: tbResponse.Payload
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page, columns, dataSource } = this.state;
    
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <GridHeader
            columns={dataSource.columns}
            functionHandler={this.functionHandler.bind(this)}
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
              ))}
          </TableBody>
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