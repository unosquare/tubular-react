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
    activeFilter: '',
    keyState: 'Up',
    sortOrder: 1
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
    this.state.dataSource.columns.forEach( (column, i) => {
      if(column.Name === this.state.activeFilter){
        column.Filter.Text = firstValue;
        column.Filter.Operator = this.state[this.state.activeFilter];
        column.Filter.HasFilter = hasFilter;
        if(secondValue !== undefined){
          column.Filter.Argument = [secondValue];
        }
      }
    });

    this.state.dataSource.filter(this.state.rowsPerPage, this.state.page);
  }

  handleKeyDown(event) {
    if(this.state.keyState === 'Up' && event.ctrlKey) {
      this.setState({ keyState: 'Down' });
    } 
  }

  handleKeyUp(event) {
    if(this.state.keyState === 'Down') {
      this.setState({ keyState: 'Up' });
    } 
  }

  componentDidMount() {
    document.addEventListener('keydown', () => this.handleKeyDown(event));
    document.addEventListener('keyup', () => this.handleKeyUp(event));
  }

  sortHandler = (event, property) => {
    if(this.state.keyState === 'Down'){
      this.multiSort(event, property);
    }
    else{
      this.singleSort(event, property);
    }
  }

  /* multiSort = (event, property) => {
    let sortOrder = this.state.sortOrder;
    const array = Object.assign({}, this.state.dataSource);
    
    array.columns.forEach( (column, i) => {
      if(column.Name === property){
        if(column.SortOrder === -1) {
          column.SortOrder = sortOrder;
        }
        else if(column.SortOrder !== -1 && column.SortDirection === 'Descending'){
          column.SortOrder = -1;
        }

        const currentlySortedColumns = array.columns.filter(col => col.SortOrder > 0).sort((a, b) => a.SortOrder === b.SortOrder ? 0 : a.SortOrder > b.SortOrder );

        currentlySortedColumns.forEach( (column, i) => { 
          sortOrder = i + 2;

          array.columns.forEach( (arrayColumn, j) => {
            if(arrayColumn.Name === currentlySortedColumns[i].Name){
              array.columns[j].SortOrder = (i + 1);
            }
          }); 
        });

        column.SortDirection = column.SortDirection === 'Ascending' ? 
          'Descending' 
          : 
          column.SortDirection === 'Descending' ? 
            'None' 
            :
            'Ascending';
      }
    });

    this.setState({ sortOrder }, this.state.dataSource.sort(this.state.rowsPerPage, this.state.page) );
  } */

  multiSort = (event, property) => {
    const array = Object.assign({}, this.state.dataSource);
    
    array.columns.forEach( (column, i) => {
      if(column.Name === property){
        column.SortDirection = column.SortDirection === 'Ascending' ? 
          'Descending' 
          : 
          column.SortDirection === 'Descending' ? 
            'None' 
            :
            'Ascending';

        if(column.SortOrder === -1) {
          column.SortOrder = Number.MAX_VALUE;
        }
        else if(column.SortOrder !== -1 && column.SortDirection === 'None'){
          column.SortOrder = -1;
        }

        const currentlySortedColumns = array.columns.filter(col => col.SortOrder > 0).sort((a, b) => a.SortOrder === b.SortOrder ? 0 : a.SortOrder > b.SortOrder );

        currentlySortedColumns.forEach( (column, i) => { 
          array.columns.forEach( (arrayColumn, j) => {
            if(arrayColumn.Name === currentlySortedColumns[i].Name){
              array.columns[j].SortOrder = (i + 1);
            }
          }); 
        });
      }
    });

    this.state.dataSource.sort(this.state.rowsPerPage, this.state.page);
  }

  singleSort = (event, property) => {
    let sortOrder = 1;

    this.state.dataSource.columns.forEach( column => {
      if(column.Name === property){
        if(column.SortDirection === 'Descending') {
          sortOrder = -1;
        }

        column.SortOrder = sortOrder;
        this.state.dataSource.sort(this.state.rowsPerPage, this.state.page);
        column.SortDirection = column.SortDirection === 'Ascending' ? 
          'Descending' 
          : 
          column.SortDirection === 'Descending' ? 
            'None' 
            :
            'Ascending';
      }
      else{
        column.SortOrder = -1;
        column.SortDirection = 'None';
      }
    });

    this.setState({ sortOrder: 1 });
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
