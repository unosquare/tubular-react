import ArrowDownward from 'material-ui-icons/ArrowDownward';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
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
    let firstValue = '';
    let secondValue = '';

    switch (this.state.columnType){
    case 'datetime':
    case 'date':
    case 'datetimeutc':
      firstValue = moment().format();
      secondValue = moment().format();
      break;
    default:
    }

    this.setState({
      [this.state.activeFilter]: 'None',
      [`${this.state.activeFilter}Value`]: firstValue,
      [`${this.state.activeFilter}Value2`]: secondValue
    }, () => {
      this.filterHandler(firstValue, secondValue, false);
    });
  }

  handleApply = () => {
    let firstValue = this.state[`${this.state.activeFilter}Value`];
    let secondValue = secondValue !== null && this.state[`${this.state.activeFilter}Value2`];

    switch (this.state.columnType){
    case 'numeric':
      firstValue = parseFloat(firstValue);
      secondValue = parseFloat(secondValue);
      break;
    case 'boolean':
      firstValue = (firstValue === 'true');
      secondValue = 1;
      break;
    default:
    }
    
    this.filterHandler(firstValue, secondValue, true);
  }

  filterHandler = (firstValue, secondValue, hasFilter) => {
    this.state.dataSource.columns.forEach( (row, i) => {
      if(row.Name === this.state.activeFilter){
        row.Filter.Text = firstValue;
        row.Filter.Operator = this.state[this.state.activeFilter];
        row.Filter.HasFilter = hasFilter;
        if(secondValue !== undefined){
          row.Filter.Argument = [secondValue];
        }
      }
    });

    this.state.dataSource.filter(this.state.rowsPerPage, this.state.page);
  }

  sortHandler = (event, property) => {
    let sortOrder = 1;

    this.state.dataSource.columns.forEach( row => {
      if(row.Name === property){
        if(row.SortDirection === 'Descending') {
          sortOrder = -1;
        }

        row.SortOrder = sortOrder;
        this.state.dataSource.sort(this.state.rowsPerPage, this.state.page);
        row.SortDirection = row.SortDirection === 'Ascending' ? 
          'Descending' 
          : 
          row.SortDirection === 'Descending' ? 
            'None' 
            :
            'Ascending';
      }
      else{
        row.SortOrder = -1;
        row.SortDirection = 'None';
      }
    });
  }

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
                <TableSortLabel onClick={() => this.sortHandler(event, column.Name)} >
                  {column.Label}
                  {column.SortDirection === 'Ascending' ? 
                    <ArrowUpward className={classes.arrowStyle} />
                    : column.SortDirection === 'Descending' ? 
                      <ArrowDownward className={classes.arrowStyle} />
                      :
                      <div className={classes.arrowStyle} />
                  }
                </TableSortLabel>
              </Tooltip>)
              : (column.Label);
            const filter = column.Filter &&
              (<IconButton onClick={() => this.handleOpen(column)} >
                {column.Filter.HasFilter ? 
                  <FilterListIcon style={{ background: '#28b62c', color: 'white', borderRadius: '50%' }}/> 
                  : 
                  <FilterListIcon/>}
              </IconButton>);
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
