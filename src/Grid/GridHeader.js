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
import TextField from 'material-ui/TextField';

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
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        Label: PropTypes.string.isRequired
      })).isRequired
  };

  state = {
    open: false,
    columnType: '',
    datePickerValue: '',
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

  functionCleaner = () => {
    const array = Object.assign([], this.state.functions);

    for (let i = 0; i < array.length; i++) {
      if (array[i]['column'] === this.state.activeFilter) {
        array.splice(i, 1);
      }
    }

    return array;
  }

  handleClear = (value1, value2) => {
    const array = this.functionCleaner();

    this.setState({
      functions: array,
      [this.state.activeFilter + value1]: '',
      [this.state.activeFilter + value2]: ''
    }, () => {
      this.props.functionHandler(this.state.functions);
    });
  }

  handleApply = () => {
    const array = this.functionCleaner();
    let value1 = this.state[`${this.state.activeFilter}value`];
    let value2 = value2 === null ? null : this.state[`${this.state.activeFilter}value2`];

    if(this.state.columnType === 'numeric'){
      value1 = parseFloat(value1);
      value2 = parseFloat(value2);
    }

    this.setState({ functions: array }, () => {
      /* if(this.state[this.state.activeFilter + 'value'] == "")
        return; */

      this.setState({
        functions: this.state.functions.concat([{
          column: this.state.activeFilter,
          filter: this.state[this.state.activeFilter],
          value: value1,
          value2: value2,
          type: this.state.columnType
        }])
      }, () => {
        this.props.functionHandler(this.state.functions);
      });
    });
  }

  handleDatePicker = name => event => {
    this.setState({
      [`datePicker${name}`]: event.target.value
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
      [`${this.state.activeFilter}value`]: this.state.datePickerValue,
      [`${this.state.activeFilter}value2`]: this.state.datePickerValue2
    }, () => {
      this.handleDatePickerClose();
    });
  }

  DialogContent = props => {
    const value = this.state[`${this.state.activeFilter}value`] === undefined ? '' : this.state[`${this.state.activeFilter}value`];
    const value2 = this.state[`${this.state.activeFilter}value2`] === undefined ? '' : this.state[`${this.state.activeFilter}value2`];

    if (this.state[this.state.activeFilter] === 'Between') {
      return (
        <div >
          <TextField id={this.state.activeFilter} label={'Value'} value={value} onChange={this.handleTextFieldChange('value')} />
          {this.state.columnType === 'datetime' ?
            <div style={{ display: 'inline-flex' }}>
              <IconButton onClick={() => this.handleDatePickerOpen('Value')}>
                <DateRangeIcon />
              </IconButton>
            </div>
            :
            <div />
          }
          <br />
          <TextField id={this.state.activeFilter} label={'Value 2'} value={value2} onChange={this.handleTextFieldChange('value2')} />
          {this.state.columnType === 'datetime' ?
            <div style={{ display: 'inline-flex' }}>
              <IconButton onClick={() => this.handleDatePickerOpen('Value2')}>
                <DateRangeIcon />
              </IconButton>
              <Dialog open={this.state.openTextField} onClose={this.handleDatePickerClose}>
                <TextField
                  id='datetime-local'
                  label='Next appointment'
                  type='datetime-local'
                  defaultValue='2016-03-19T19:00'
                  className={props.classes.textField}
                  onChange={this.handleDatePicker(this.state.editingValue) }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                {/* <TextField
                  id='datetime-local'
                  label='Next appointment'
                  type='datetime-local'
                  defaultValue='2017-05-24T10:30'
                  className={props.classes.textField}
                  onChange={this.handleDatePicker('Value2')}
                  InputLabelProps={{
                    shrink: true
                  }}
                /> */}
                
                <Button onClick={this.handleDatePickerAccept}>Accept</Button>
              </Dialog>
            </div>
            :
            <div />
          }
          <br />
          <Button className={props.classes.applyButton} onClick={() => this.handleApply()} >Apply</Button>
          <Button className={props.classes.clearButton} onClick={() => this.handleClear('value', 'value2')}>Clear</Button>
        </div>
      );
    }

    return (
      <div >
        <TextField id={this.state.activeFilter} label={'Value'} value={value} onChange={this.handleTextFieldChange('value')} />
        {this.state.columnType === 'datetime' ?
          <div style={{ display: 'inline-flex' }}>
            <IconButton onClick={() => this.handleDatePickerOpen('Value')}>
              <DateRangeIcon />
            </IconButton>
            <Dialog open={this.state.openTextField} onClose={this.handleDatePickerClose}>
              <TextField
                id='datetime-local'
                label='Next appointment'
                type='datetime-local'
                defaultValue='2016-03-18T19:00'
                className={props.classes.textField}
                onChange={this.handleDatePicker('Value')}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Button onClick={this.handleDatePickerAccept}>Accept</Button>
            </Dialog>
          </div>
          :
          <div />
        }
        <br />
        <Button className={props.classes.applyButton} onClick={() => this.handleApply()}>Apply</Button>
        <Button className={props.classes.clearButton} onClick={() => this.handleClear('value', null)}>Clear</Button>
      </div>
    );
  }

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
    const { columns, classes } = this.props;

    return (
      <TableHead>
        <Dialog open={this.state.open} onClose={this.handleClose} >
          <this.DialogDropDown classes={classes} />
          <this.DialogContent classes={classes} />
        </Dialog>
        <TableRow>
          {columns.map(column => {
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
