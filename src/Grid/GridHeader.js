import Button from 'material-ui/Button';
import DateRangeIcon from 'material-ui-icons/DateRange';
import Dialog from 'material-ui/Dialog';
import FilterListIcon from 'material-ui-icons/FilterList';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import LeftArrowIcon from 'material-ui-icons/ChevronLeft';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React from 'react';
import RightArrowIcon from 'material-ui-icons/ChevronRight';
import Select from 'material-ui/Select';
import TimeIcon from 'material-ui-icons/Schedule';
import Tooltip from 'material-ui/Tooltip';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createPalette from 'material-ui/styles/createPalette';
import moment from 'moment';
import { DateTimePicker } from 'material-ui-pickers';
import { MenuItem } from 'material-ui/Menu';
import { deepPurple } from 'material-ui/colors';
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

const muiTheme = createMuiTheme({
  palette: createPalette({
    primary: deepPurple,
    type: 'light'
  })
});

class GridHeader extends React.Component {
  static propTypes = {
    /* columns: PropTypes.arrayOf( */
    /* dataSource: PropTypes.object(
      PropTypes.shape({
        Label: PropTypes.string.isRequired
      })).isRequired */
  };

  state = {
    dataSource: this.props.dataSource,
    page: this.props.page,
    rowsPerPage: this.props.rowsPerPage,
    open: false,
    columnType: '',
    activeFilter: ''
  }

  sortHandler = (property, dataType) => {
    /* this.props.onRequestSort(property, dataType); */
  };

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

    if(this.state.columnType === 'datetime') {
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

  handleDatePicker = name => event => {
    this.setState({
      [`${this.state.activeFilter}${name}`]: event.format()
    });
  };

  DialogContent = props => {
    let value = '';
    let value2 = '';
    
    if(this.state.columnType === 'datetime'){
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
          this.state.columnType === 'datetime' ? 
            <this.DateTimeInput value={value} label={'Value'} mod={'Value'} />
            : this.state.columnType === 'boolean' ? 
              <this.BooleanInput classes={props.classes} value={value}/> 
              :
              <this.TextInput value={value} label={'Value'} mod={'Value'} />
        }

        {
          this.state[this.state.activeFilter] === 'Between' ? 
            this.state.columnType === 'datetime' ? 
              <this.DateTimeInput value={value2} label={'Value 2'} mod={'Value2'} /> 
              : 
              <this.TextInput value={value2} label={'Value 2'} mod={'Value2'} />
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

  BooleanInput = props => (
    <div style={{ padding: '13px 15px 6px 10px' }}>
      <Select
        style={{ minWidth: '300px' }}
        className={props.classes.dropdown}
        value={props.value}
        onChange={this.handleBooleanDropDown}
        input={<Input name={this.state.activeFilter} />}
      >
        <MenuItem value={''}></MenuItem>
        <MenuItem value={'true'}>True</MenuItem>
        <MenuItem value={'false'}>False</MenuItem>
      </Select>
    </div>
  )

  TextInput = props => (
    <div style={{ padding: '13px 15px 6px 10px' }}>
      <Input style={{ minWidth: '300px' }} id={this.state.activeFilter} placeholder={props.label} value={props.value} onChange={this.handleTextFieldChange(props.mod)} />
      <br />
    </div>
  )

  DateTimeInput = props => (
    <div style={{ padding: '13px 15px 6px 10px' }}>
      <MuiThemeProvider theme={muiTheme}>
        <DateTimePicker
          style={{ minWidth: '300px' }}
          value={this.state[`${this.state.activeFilter}${props.mod}`]}
          onChange={this.handleDatePicker(props.mod)}
          leftArrowIcon={<LeftArrowIcon />}
          rightArrowIcon={<RightArrowIcon />}
          dateRangeIcon={<DateRangeIcon/>}
          timeIcon={<TimeIcon/>}
        />
      </MuiThemeProvider>
      <br />
    </div>
  )

  BooleanDropDown = props => (
    <div style={{ padding: '13px 15px 6px 10px' }}>
      <Select
        className={props.classes.dropdown}
        value={props.value}
        onChange={this.handleChange}
        input={<Input name={this.state.activeFilter} />}
      >
        <MenuItem value={'None'}>None</MenuItem>
        <MenuItem value={'Equals'}>Equals</MenuItem>
        <MenuItem value={'NotEquals'}>Not Equals</MenuItem>
      </Select>
    </div>
  )

  StringDropDown = props => (
    <div style={{ padding: '13px 15px 6px 10px' }}>
      <Select
        className={props.classes.dropdown}
        value={props.value}
        onChange={this.handleChange}
        input={<Input name={this.state.activeFilter} />}
      >
        <MenuItem value={'None'}>None</MenuItem>
        <MenuItem value={'Equals'}>Equals</MenuItem>
        <MenuItem value={'NotEquals'}>Not Equals</MenuItem>
        <MenuItem value={'Contains'}>Contains</MenuItem>
        <MenuItem value={'NotContains'}>Not Contains</MenuItem>
        <MenuItem value={'StartsWith'}>Starts With</MenuItem>
        <MenuItem value={'NotStartsWith'}>Not Starts With</MenuItem>
        <MenuItem value={'EndsWith'}>Ends With</MenuItem>
        <MenuItem value={'NotEndsWith'}>Not Ends With</MenuItem>
      </Select>
    </div>
  )

  NumericDropdown = props => (
    <div style={{ padding: '13px 15px 6px 10px' }}>
      <Select
        className={props.classes.dropdown}
        value={props.value}
        onChange={this.handleChange}
        input={<Input name={this.state.activeFilter} />}
      >
        <MenuItem value={'None'}>None</MenuItem>
        <MenuItem value={'Equals'}>Equals</MenuItem>
        <MenuItem value={'Between'}>Between</MenuItem>
        <MenuItem value={'Gte'}>>=</MenuItem>
        <MenuItem value={'Gt'}>></MenuItem>
        <MenuItem value={'Lte'}>&#60;=</MenuItem>
        <MenuItem value={'Lt'}>&#60;</MenuItem>
      </Select>
    </div>
  )

  DialogDropDown = props => {
    const value = this.state[this.state.activeFilter] === undefined ? 'None' : this.state[this.state.activeFilter];

    if (this.state.columnType === 'string') {
      return (<this.StringDropDown classes={props.classes} value={value} />);
    }
    else if (this.state.columnType === 'numeric' || this.state.columnType === 'datetime') {
      return (<this.NumericDropdown classes={props.classes} value={value} />);
    }
    else if(this.state.columnType === 'boolean'){
      return (<this.BooleanDropDown classes={props.classes} value={value} />);
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
          <this.DialogDropDown classes={classes} />
          <this.DialogContent classes={classes} />
        </Dialog>
        <TableRow>
          {dataSource.columns.map(column => {
            const render = column.Sortable ?
              (<Tooltip title='Sort' placement='bottom-start' enterDelay={300}>
                <TableSortLabel
                  onClick={() => this.sortHandler(column.Label, column.DataType)}
                >
                  {column.Label}
                </TableSortLabel>
              </Tooltip>)
              : (column.Label);
            const filter = column.Filter ?
              (<IconButton >
                <FilterListIcon onClick={() => this.handleFilter(column)} />
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
