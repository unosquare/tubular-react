import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import GridHeader from './GridHeader.js';

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
    currentData: this.props.data, 
    functions : []
  }

  handleSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = order === 'desc' ?
      this.state.currentData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)) :
      this.state.currentData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, orderBy, order });
  }

  filterHandler = (functions) => {
    var data = Object.assign([], this.state.data);

    this.setState({ currentData: data, functions: functions }, () => {
      this.funtionHandler();
      /* for (var i = 0; i < functions.length; i++) {
        this[functions[i]['filter'] + "Filter"](functions[i]);
      } */
    });

  }

  funtionHandler = () => {
    var functions = Object.assign([], this.state.functions);

    if(functions[0] !== undefined){
      this[functions[0]['filter'] + "Filter"](functions[0]);
      functions.splice(0, 1);

      this.setState({functions: functions})
    }
  }

  equalsFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column] == props.value){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  notEqualsFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column] != props.value){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  startsWithFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column].startsWith(props.value)){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  notStartsWithFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(!data[i][props.column].startsWith(props.value)){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  endsWithFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column].endsWith(props.value)){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  notEndsWithFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(!data[i][props.column].endsWith(props.value)){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  containsFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column].indexOf(props.value) !=-1 ){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  notContainsFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column].indexOf(props.value) ==-1 ){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  betweenFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column] >= props.value && data[i][props.column] <= props.value2){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  gteFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column] >= props.value){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  gtFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column] > props.value){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  lteFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column] <= props.value){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  ltFilter = (props) => {
    var data = Object.assign([], this.state.currentData);
    var array = [];

    for (var i = 0; i < data.length; i++) {
      if(data[i][props.column] < props.value){
        array.push(data[i])
      }
    }

    this.setState({currentData: array}, () => {
      this.funtionHandler();
    })
  }

  render() {
    const { classes, columns } = this.props;
    const { currentData, rowsPerPage, page, order, orderBy } = this.state;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <GridHeader
            columns={columns}
            orderBy={orderBy}
            order={order}
            onRequestSort={this.handleSort}
            filterHandler={this.filterHandler.bind(this)}
          />
          <TableBody>
            {
              currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                <TableRow hover key={rowIndex}>
                  {columns.map((column, index) =>
                    <TableCell key={index} padding={column.label === '' ? 'none' : 'default'}>
                      {row[column.key] && row[column.key]}
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
  title: PropTypes.string
};
export default withStyles(styles)(Grid);