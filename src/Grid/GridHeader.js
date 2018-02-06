import ArrowDownward from 'material-ui-icons/ArrowDownward';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
import DialogContent from './DialogContent.js';
import DialogDropdown from './DialogDropdown.js';
import FilterListIcon from 'material-ui-icons/FilterList';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { TableCell, TableRow, TableSortLabel } from 'material-ui/Table';

const styles = theme => ({
  dropdown: {
    width: '100%'
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
    open: false,
    columnType: '',
    activeFilter: '',
    sorting: 'Single'
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = column => {
    this.setState({ columnType: column.DataType, activeFilter: column.Name, open: true }, 
      () => {
        document.getElementById(this.state.activeFilter).blur();
      }
    );
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
    
    switch (this.state.columnType) {
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

  handleKeyDown(event) {
    if(event.key === 'Control' && this.state.sorting === 'Single') {
      this.setState({ sorting: 'Multiple' });
    } 
  }

  handleKeyUp(event) {
    if(event.key === 'Control' && this.state.sorting === 'Multiple') {
      this.setState({ sorting: 'Single' });
    } 
  }

  localStorageHandler = (count, dataSource) => {
    if(count >= dataSource.columns.length) 
      return;
    
    let firstValue = '';
    let secondValue = '';
      
    switch(dataSource.columns[count].DataType ){
    case 'date':
    case 'datetime':
    case 'datetimeutc':
      firstValue = moment().format();
      secondValue = moment().format();
      break;
    default:
      firstValue = dataSource.columns[count].Filter && 
        dataSource.columns[count].Filter.Text && dataSource.columns[count].Filter.Text.toString();
      secondValue = dataSource.columns[count].Filter && 
        dataSource.columns[count].Filter.Argument[0] && dataSource.columns[count].Filter.Argument[0].toString();
    }

    this.setState({
      [dataSource.columns[count].Name]: dataSource.columns[count].Filter && dataSource.columns[count].Filter.Operator,
      [`${dataSource.columns[count].Name}Value`]: firstValue,
      [`${dataSource.columns[count].Name}Value2`]: secondValue,
      activeFilter: dataSource.columns[count].Name,
      columnType: dataSource.columns[count].DataType
    }, () => {
      this.localStorageHandler(count + 1, dataSource);
    });
  }

  componentDidMount() {
    if (localStorage.getItem(`tubular.${this.props.gridName}`)){
      const storage = JSON.parse(localStorage.getItem(`tubular.${this.props.gridName}`));
      const dataSource = this.props.dataSource;

      storage.forEach( (element, i) => {
        if(dataSource.columns[i] !== undefined){
          dataSource.columns[i].SortDirection = element.SortDirection;
          dataSource.columns[i].SortOrder = element.SortOrder;
          if(dataSource.columns[i].Filter && element.Filter){
            dataSource.columns[i].Filter.HasFilter = element.Filter.HasFilter;
            dataSource.columns[i].Filter.Operator = element.Filter.Operator;
            dataSource.columns[i].Filter.Text = element.Filter.Text || '';
            dataSource.columns[i].Filter.Argument[0] = element.Filter.Argument[0] || '';
          }
        }
      });

      this.localStorageHandler(0, dataSource);
    }

    document.addEventListener('keydown', event => this.handleKeyDown(event));
    document.addEventListener('keyup', event => this.handleKeyUp(event));
  }

  filterHandler = (firstValue, secondValue, hasFilter) => {
    this.props.dataSource.columns.forEach( column => {
      if(column.Name === this.state.activeFilter){
        column.Filter.Text = firstValue;
        column.Filter.Operator = this.state[this.state.activeFilter];
        column.Filter.HasFilter = hasFilter;
        if(secondValue !== undefined){
          column.Filter.Argument = [secondValue];
        }
      }
    });

    this.props.refreshGrid();
    this.handleClose();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', event => this.handleKeyDown(event));
    document.removeEventListener('keyup', event => this.handleKeyUp(event));
  }

  sortHandler = (event, property) => {
    const array = Object.assign({}, this.props.dataSource);
    
    array.columns.forEach( column => {
      if(column.Name === property){
        column.SortDirection = column.SortDirection === 'None' 
          ? 'Ascending' 
          : column.SortDirection === 'Ascending' ? 'Descending' : 'None';

        if(column.SortDirection === 'None'){
          column.SortOrder = -1;
        }
        else{
          column.SortOrder = Number.MAX_VALUE;
        }

        if (this.state.sorting === 'Single') {
          array.columns.filter(col => col.Name !== property).forEach( column => {
            column.SortOrder = -1;
            column.SortDirection = 'None';
          });
        }

        const currentlySortedColumns = array.columns.filter(col => col.SortOrder > 0).sort((a, b) => a.SortOrder === b.SortOrder ? 0 : a.SortOrder > b.SortOrder );

        currentlySortedColumns.forEach( (column, i) => { 
          column.SortOrder = i + 1; 
        });
      }
    });

    this.props.refreshGrid();
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
      <TableRow>
        <Dialog open={this.state.open} onClose={this.handleClose} >
          <DialogTitle style={{ minWidth: '300px', background: '#ececec', padding: '15px 20px 15px 20px' }} id='responsive-dialog-title'>{'Filter'}</DialogTitle>
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
        {dataSource.columns.filter(col => col.Visible).map(column => {
          const render = column.Sortable ?
            (<Tooltip 
              title='Click to sort. Press Ctrl to sort by multiple columns' 
              placement='bottom-start' 
              enterDelay={300}>
              <TableSortLabel onClick={event => this.sortHandler(event, column.Name)} >
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
              (<IconButton id={column.Name} onClick={() => this.handleOpen(column)} >
                {column.Filter.HasFilter && column.Filter.Operator !== 'None' ? 
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
    );
  }
}

GridHeader.propTypes = {
  dataSource: PropTypes.any.isRequired,
  gridName: PropTypes.string.isRequired,
  page: PropTypes.number,
  refreshGrid: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number
};

export default withStyles(styles)(GridHeader);
