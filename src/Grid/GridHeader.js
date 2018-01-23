import BooleanDropdown from './BooleanDropdown.js';
import BooleanInput from './BooleanInput.js';
import Button from 'material-ui/Button';
import DateInput from './DateInput.js';
import Dialog from 'material-ui/Dialog';
import FilterListIcon from 'material-ui-icons/FilterList';
import IconButton from 'material-ui/IconButton';
import NumericDropdown from './NumericDropdown.js';
import React from 'react';
import StringDropdown from './StringDropdown.js';
import TextInput from './TextInput.js';
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFilter = column => {
    this.setState({ columnType: column.DataType, activeFilter: column.Name });

    this.handleClickOpen();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTextFieldChange = name => event => {
    this.setState({
      [this.state.activeFilter + name]: event.target.value
    });
  };

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
      this.filterHandler(value1, value2);
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
    
    this.filterHandler(value1, value2);
  }

  filterHandler = (value1, value2) => {
    const dataSource = Object.assign([{}], this.state.dataSource);

    for(let i = 0; i < dataSource.columns.length; i++){
      if(dataSource.columns[i].Name === this.state.activeFilter){
        dataSource.columns[i].Filter.Text = value1;
        dataSource.columns[i].Filter.Operator = this.state[this.state.activeFilter];
        if(value2 !== undefined){
          dataSource.columns[i].Filter.Argument = [value2];
        }
      }
    }

    this.state.dataSource.filter(this.state.rowsPerPage, this.state.page);
  }

  sortHandler = property => {
    const dataSource = Object.assign([{}], this.state.dataSource);

    for(let i = 0; i < dataSource.columns.length; i++){
      if(dataSource.columns[i].SortOrder === 1){
        dataSource.columns[i].SortOrder = -1;
      }

      if(dataSource.columns[i].Name === property){
        dataSource.columns[i].SortOrder = 1;
        this.state.dataSource.sort(this.state.rowsPerPage, this.state.page);
        dataSource.columns[i].SortDirection = dataSource.columns[i].SortDirection === 'Ascending' ? 'Descending' : 'Ascending';
      }
    }
  };

  handleDatePicker = name => event => {
    this.setState({
      [`${this.state.activeFilter}${name}`]: event.format()
    });
  };

  DialogContent = props => {
    let value = '';
    let value2 = '';
    
    if(this.state.columnType === 'datetime' || this.state.columnType === 'date' || this.state.columnType === 'datetimeutc'){
      value = this.state[`${this.state.activeFilter}Value`] === undefined ? moment().format() : this.state[`${this.state.activeFilter}Value`];
      value2 = this.state[`${this.state.activeFilter}Value2`] === undefined ? moment().format() : this.state[`${this.state.activeFilter}Value2`];
    }
    else if(this.state.columnType === 'boolean'){
      value = this.state[`${this.state.activeFilter}Value`] === undefined ? '' : this.state[`${this.state.activeFilter}Value`];
    }
    else{
      value = this.state[`${this.state.activeFilter}Value`] === undefined ? '' : this.state[`${this.state.activeFilter}Value`];
      value2 = this.state[`${this.state.activeFilter}Value2`] === undefined ? '' : this.state[`${this.state.activeFilter}Value2`];
    }

    return (
      <div >
        {
          this.state.columnType === 'datetime' || this.state.columnType === 'date' || this.state.columnType === 'datetimeutc' ? 
            <DateInput 
              value={value} 
              columnType={this.state.columnType}
              label={'Value'} 
              handleDatePicker={this.handleDatePicker.bind(this)}
              mod={'Value'} />
            : this.state.columnType === 'boolean' ? 
              <BooleanInput 
                classes={props.classes} 
                value={value} 
                handleBooleanDropDown={this.handleBooleanDropDown.bind(this)}
                activeFilter={this.state.activeFilter}/>
              :
              <TextInput 
                value={value} 
                label={'Value'} 
                mod={'Value'} 
                activeFilter={this.state.activeFilter}
                handleTextFieldChange={this.handleTextFieldChange.bind(this)}/>
        }

        {
          this.state[this.state.activeFilter] === 'Between' ? 
            this.state.columnType === 'datetime' || this.state.columnType === 'date' || this.state.columnType === 'datetimeutc' ? 
              <DateInput 
                value={value2} 
                columnType={this.state.columnType}
                label={'Value 2'} 
                handleDatePicker={this.handleDatePicker.bind(this)}
                mod={'Value2'} />
              : 
              <TextInput 
                value={value2} 
                label={'Value 2'} 
                mod={'Value2'} 
                activeFilter={this.state.activeFilter}
                handleTextFieldChange={this.handleTextFieldChange.bind(this)}/>
            : 
            null
        }
        
        <div style={{ padding: '20px 10px 15px 10px', textAlign: 'center' }}>
          <Button className={props.classes.applyButton} onClick={() => this.handleApply()}>Apply</Button>
          <Button className={props.classes.clearButton} onClick={() => this.handleClear()}>Clear</Button>
        </div>
      </div>
    );
  }

  handleBooleanDropDown = event => {
    this.setState({ [`${[this.state.activeFilter]}Value`]: event.target.value });
  };

  DialogDropdown = props => {
    const value = this.state[this.state.activeFilter] === undefined ? 'None' : this.state[this.state.activeFilter];
    
    if (this.state.columnType === 'string') {
      return (<StringDropdown classes={props.classes} value={value} activeFilter={this.state.activeFilter} handleChange={this.handleChange.bind(this)}/>);
    }
    else if (this.state.columnType === 'numeric' || this.state.columnType === 'datetime' || this.state.columnType === 'date' || this.state.columnType === 'datetimeutc') {
      return (<NumericDropdown classes={props.classes} value={value} activeFilter={this.state.activeFilter} handleChange={this.handleChange.bind(this)}/>);
    }
    else if(this.state.columnType === 'boolean'){
      return (<BooleanDropdown classes={props.classes} value={value} activeFilter={this.state.activeFilter} handleChange={this.handleChange.bind(this)}/>);
    }
    else {
      return (<div />);
    }
  }

  render() {
    const { dataSource, classes } = this.props;

    return (
      <TableHead>
        <Dialog open={this.state.open} onClose={this.handleClose} >
          <this.DialogDropdown classes={classes} />
          <this.DialogContent classes={classes} />
        </Dialog>
        <TableRow>
          {dataSource.columns.map(column => {
            const render = column.Sortable ?
              (<Tooltip title='Sort' placement='bottom-start' enterDelay={300}>
                <TableSortLabel
                  onClick={() => this.sortHandler(column.Name)}
                >
                  {column.Label}
                </TableSortLabel>
              </Tooltip>)
              : (column.Label);
            const filter = column.Filter ?
              (<IconButton onClick={() => this.handleFilter(column)} >
                <FilterListIcon/>
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
