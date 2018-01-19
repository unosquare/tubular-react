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
    functions: []
  }

  handleSort = (property, dataType) => {
    const orderBy = property;
    let order = 'desc';
    let data = '';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    if(dataType === 'datetime') {
      data = order === 'desc' ?
        this.state.currentData.sort((a, b) => new Date(b[orderBy]) - new Date(a[orderBy])) :
        this.state.currentData.sort((a, b) => ( new Date(a[orderBy]) - new Date(b[orderBy])));
    }
    else{
      data = order === 'desc' ?
        this.state.currentData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)) :
        this.state.currentData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    }

    

    this.setState({ data, orderBy, order });
  }

  filterHandler = functions => {
    const data = Object.assign([], this.state.data);

    this.setState({ currentData: data, functions: functions }, () => {
      this.funtionHandler();
    });
  }

  funtionHandler = () => {
    const functions = Object.assign([], this.state.functions);

    if (functions[0] !== undefined) {
      this[`${functions[0]['filter']}Filter`](functions[0]);
      functions.splice(0, 1);

      this.setState({ functions });
    }
  }

  equalsFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column] === props.value) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  notEqualsFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column] !== props.value) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  startsWithFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column].startsWith(props.value)) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  notStartsWithFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (!data[i][props.column].startsWith(props.value)) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  endsWithFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column].endsWith(props.value)) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  notEndsWithFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (!data[i][props.column].endsWith(props.value)) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  containsFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column].indexOf(props.value) !== -1) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  notContainsFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column].indexOf(props.value) === -1) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  betweenFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column] >= props.value && data[i][props.column] <= props.value2) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  gteFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column] >= props.value) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  gtFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column] > props.value) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  lteFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column] <= props.value) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
  }

  ltFilter = props => {
    const data = Object.assign([], this.state.currentData);
    const array = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][props.column] < props.value) {
        array.push(data[i]);
      }
    }

    this.setState({ currentData: array }, () => {
      this.funtionHandler();
    });
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
                  {columns.map((column, index) => (
                    <TableCell key={index} padding={column.label === '' ? 'none' : 'default'}>
                      {row[column.key] && row[column.key]}
                    </TableCell>
                  )
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