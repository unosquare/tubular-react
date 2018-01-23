import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FilterListIcon from 'material-ui-icons/FilterList';
import DateRangeIcon from 'material-ui-icons/DateRange';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import LeftArrowIcon from 'material-ui-icons/ChevronLeft';
import RightArrowIcon from 'material-ui-icons/ChevronRight';
import TimeIcon from 'material-ui-icons/Schedule';
import TextField from 'material-ui/TextField';
import { TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';

const styles = theme => ({
  dropdown: {
    minWidth: '200px'
  },
  dialog: {
    minWidth: '400px',
    background: 'black'
  },
  applyButton: {
    background: '#28b62c',
    color: 'white'
  },
  clearButton: {
    background: '#ff4136',
    color: 'white'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
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
    datePickerValue: moment().format(),
    datePickerValue2: moment().format(),
    activeFilter: '',
    functions: [],
    openTextField: false,
    editingValue: ''
  }

  sortHandler = (property, dataType) => {
    this.props.onRequestSort(property, dataType);
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
    const value1 = '';
    const value2 = '';

    this.setState({
      [this.state.activeFilter]: 'None',
      [`${this.state.activeFilter}Value`]: '',
      [`${this.state.activeFilter}Value2`]: ''
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
      [`datePicker${name}`]: event.format()
    });
  };

  handleDatePickerOpen = value => {
    this.setState({ editingValue: value, openTextField: true });
  }

  handleDatePickerClose = () => {
    this.setState({ openTextField: false });
  }

  handleDatePickerAccept = () => {
    this.setState({
      [`${this.state.activeFilter}Value`]: this.state.datePickerValue,
      [`${this.state.activeFilter}Value2`]: this.state.datePickerValue2
    }, () => {
      this.handleDatePickerClose();
    });
  }

  DialogContent = props => {
    let value = '';
    let value2 = '';
    
    
    if(this.state.columnType === 'datetime'){
      value = this.state.datePickerValue;
      value2 = this.state.datePickerValue2;
    }
    else{
      value = this.state[`${this.state.activeFilter}Value`] === undefined ? '' : this.state[`${this.state.activeFilter}Value`];
      value2 = this.state[`${this.state.activeFilter}Value2`] === undefined ? '' : this.state[`${this.state.activeFilter}Value2`];
    }

    return (
      <div >
        <this.DialogTextField value={value} label={'Value'} mod={'Value'} />
        {this.state[this.state.activeFilter] === 'Between' ? <this.DialogTextField value={value2} label={'Value 2'} mod={'Value2'} /> : null}
        <Button className={props.classes.applyButton} onClick={() => this.handleApply()}>Apply</Button>
        <Button className={props.classes.clearButton} onClick={() => this.handleClear()}>Clear</Button>
      </div>
    );
  }

  DialogTextField = props => (
    <div>
      <TextField id={this.state.activeFilter} label={props.label} value={props.value} onChange={this.handleTextFieldChange(props.mod)} />
      {this.state.columnType === 'datetime' ?
        <div style={{ display: 'inline-flex' }}>
          <IconButton onClick={() => this.handleDatePickerOpen(props.mod)}>
            <DateRangeIcon />
          </IconButton>
        </div>
        :
        <div />
      }
      <br />
    </div>
  )

  DateTimePickerDialog = () => (
    <Dialog open={this.state.openTextField} onClose={this.handleDatePickerClose}>
      <DateTimePicker
        value={this.state[`datePicker${this.state.editingValue}`]}
        onChange={this.handleDatePicker(this.state.editingValue)}
        leftArrowIcon={<LeftArrowIcon />}
        rightArrowIcon={<RightArrowIcon />}
        dateRangeIcon={<DateRangeIcon/>}
        timeIcon={<TimeIcon/>}
      />
      <Button onClick={this.handleDatePickerAccept}>Accept</Button>
    </Dialog>
  )

  StringDropDown = props => (
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
  )

  NumericDropdown = props => (
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
  )

  DialogDropDown = props => {
    const value = this.state[this.state.activeFilter] === undefined ? 'None' : this.state[this.state.activeFilter];

    if (this.state.columnType === 'string') {
      return (<this.StringDropDown classes={props.classes} value={value} />);
    }
    else if (this.state.columnType === 'numeric' || this.state.columnType === 'datetime') {
      return (<this.NumericDropdown classes={props.classes} value={value} />);
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
        <this.DateTimePickerDialog/>
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
