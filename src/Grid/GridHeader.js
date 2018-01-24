import ArrowDownward from 'material-ui-icons/ArrowDownward';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
import Button from 'material-ui/Button';
import DateInput from './DateInput.js';
import Dialog from 'material-ui/Dialog';
import DialogContent from './DialogContent.js';
import DialogDropdown from './DialogDropdown.js';
import FilterListIcon from 'material-ui-icons/FilterList';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

const styles = theme => ({
  dropdown: {
    minWidth: '300px'
  },
  dialog: {
    minWidth: '400px',
    background: 'black'
  },
  applyButton: {
    background: '#28b62c',
    color: 'white',
    marginRight: '30px'
  },
  clearButton: {
    background: '#ff4136',
    color: 'white'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  mainDialogStyle: {
    padding: '25px 25px 25px 25px'
  },
  arrowStyle: {
    width: '15px', 
    marginLeft: '5px'
  }
});

class GridHeader extends React.Component {
  state = {
    dataSource: this.props.dataSource,
    page: this.props.page,
    rowsPerPage: this.props.rowsPerPage,
    open: false,
    columnType: '',
    activeFilter: ''
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = column => {
    this.setState({ columnType: column.DataType, activeFilter: column.Name, open: true });
  }

  handleClear = () => {
    let value1 = '';
    let value2 = '';

    if(this.state.columnType === 'datetime' || this.state.columnType === 'date' || this.state.columnType === 'datetimeutc') {
      value1 = moment().format();
      value2 = moment().format();
    }

    this.setState({
      [this.state.activeFilter]: 'None',
      [`${this.state.activeFilter}Value`]: value1,
      [`${this.state.activeFilter}Value2`]: value2
    }, () => {
      this.filterHandler(value1, value2, false);
    });
  }

  handleApply = () => {
    let value1 = this.state[`${this.state.activeFilter}Value`];
    let value2 = value2 === null ? null : this.state[`${this.state.activeFilter}Value2`];

    if(this.state.columnType === 'numeric'){
      value1 = parseFloat(value1);
      value2 = parseFloat(value2);
    }
    else if(this.state.columnType === 'boolean'){
      value1 = (value1 === 'true');
      value2 = 1;
    }
    
    this.filterHandler(value1, value2, true);
  }

  filterHandler = (value1, value2, hasFilter) => {
    const dataSource = Object.assign([{}], this.state.dataSource);

    dataSource.columns.forEach( (row, i) => {
      if(row.Name === this.state.activeFilter){
        dataSource.columns[i].Filter.Text = value1;
        dataSource.columns[i].Filter.Operator = this.state[this.state.activeFilter];
        dataSource.columns[i].Filter.HasFilter = hasFilter;
        if(value2 !== undefined){
          dataSource.columns[i].Filter.Argument = [value2];
        }
      }
    });

    this.state.dataSource.filter(this.state.rowsPerPage, this.state.page);
  }

  sortHandler = property => {
    const dataSource = Object.assign([{}], this.state.dataSource);

    dataSource.columns.forEach( (row, i) => {
      if(row.SortOrder === 1){
        dataSource.columns[i].SortOrder = -1;
      }

      if(row.Name === property){
        dataSource.columns[i].SortOrder = 1;
        this.state.dataSource.sort(this.state.rowsPerPage, this.state.page);
        dataSource.columns[i].SortDirection = row.SortDirection === 'Ascending' ? 'Descending' : 'Ascending';
      }
    });
  };

  handleDatePicker = name => event => {
    this.setState({
      [`${this.state.activeFilter}${name}`]: event.format()
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTextFieldChange = name => event => {
    this.setState({
      [this.state.activeFilter + name]: event.target.value
    });
  };

  handleBooleanDropDown = event => {
    this.setState({ [`${[this.state.activeFilter]}Value`]: event.target.value });
  };

  render() {
    const { dataSource, classes } = this.props;

    return (
      <TableHead>
        <Dialog open={this.state.open} onClose={this.handleClose} >
          <DialogDropdown 
            classes={classes}
            value={this.state[this.state.activeFilter]}
            columnType={this.state.columnType}
            activeFilter={this.state.activeFilter}
            handleChange={this.handleChange.bind(this)} 
          /> 
          <DialogContent
            classes={classes}
            columnType={this.state.columnType}
            activeFilter={this.state.activeFilter}
            operator={this.state[this.state.activeFilter]}
            value={this.state[`${this.state.activeFilter}Value`]}
            value2={this.state[`${this.state.activeFilter}Value2`]}
            handleDatePicker={this.handleDatePicker.bind(this)}
            handleBooleanDropDown={this.handleBooleanDropDown.bind(this)}
            handleTextFieldChange={this.handleTextFieldChange.bind(this)}
            handleApply={this.handleApply.bind(this)}
            handleClear={this.handleClear.bind(this)} 
          />          
        </Dialog>
        <TableRow>
          {dataSource.columns.map(column => {
            const render = column.Sortable ?
              (<Tooltip title='Sort' placement='bottom-start' enterDelay={300}>
                <TableSortLabel onClick={() => this.sortHandler(column.Name)} >
                  {column.Label}
                  {column.SortOrder === 1 && column.SortDirection === 'Ascending' ? 
                    <ArrowUpward className={classes.arrowStyle} />
                    : column.SortOrder === 1 && column.SortDirection === 'Descending' ? 
                      <ArrowDownward className={classes.arrowStyle} />
                      :
                      <div className={classes.arrowStyle} />
                  }
                </TableSortLabel>
              </Tooltip>)
              : (column.Label);
            const filter = column.Filter ?
              (<IconButton onClick={() => this.handleOpen(column)} >
                {column.Filter.HasFilter ? 
                  <FilterListIcon style={{ background: '#28b62c', color: 'white', borderRadius: '50%' }}/> 
                  : 
                  <FilterListIcon/>}
              </IconButton>)
              : (null);
            return (
              <TableCell key={column.Label} padding={column.Label === '' ? 'none' : 'default'}>
                {render}
                {filter}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(styles)(GridHeader);
