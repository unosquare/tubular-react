import { Dialog, DialogTitle, TableCell, TableRow, TableSortLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { StyleRules, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';
import ColumnModel from './ColumnModel';
import DialogContent from './DialogContent';
import DialogDropdown from './DialogDropdown';

import * as moment from 'moment';
import * as React from 'react';

const styleClasses  = {
  applyButton: '',
  arrowStyle: '',
  clearButton: '',
  dialog: '',
  dropdown: '',
  mainDialogStyle: '',
  textField: '',
};

const styles = (theme: Theme): StyleRules<keyof typeof styleClasses> => (
  {
  applyButton: {
    background: '#28b62c',
    color: 'white',
    marginRight: '30px'
  },
  arrowStyle: {
    marginLeft: '5px',
    width: '15px'
  },
  clearButton: {
    background: '#ff4136',
    color: 'white'
  },
  dialog: {
    background: 'black',
    minWidth: '400px'
  },
  dropdown: {
    width: '100%'
  },
  mainDialogStyle: {
    padding: '25px 25px 25px 25px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

interface IState {
  activeColumn:any;
  sorting:boolean;
}
interface IProps {
  dataSource: any;
  gridName: string;
  page?: number;
  rowsPerPage: number;
  refreshGrid(): void;
}

class GridHeader extends React.Component <IProps & WithStyles<keyof typeof styleClasses>, IState> {
  public state = {
    activeColumn: null as any,
    sorting:true
  };

  public handleClose = () => {
    this.setState({activeColumn:null});
  }

  public handleOpen = (column: any) => {
    this.setState({
      activeColumn: column,
     },
      () => {        
        document.getElementById(column.name).blur();
      }
    );
  }

  public handleClear = () => {
    let firstValue = '';
    let secondValue = '';

    switch (this.state.activeColumn.DataType) {
    case ColumnDataType.DATE:
    case ColumnDataType.DATE_TIME:
    case ColumnDataType.DATE_TIME_UTC:
      firstValue = moment().format();
      secondValue = moment().format();
      break;
    default:
    }

    this.setState(prevState =>({
      activeColumn:{
      Filter:{
        operator: CompareOperators.NONE,
        ...prevState.activeColumn.operator
      },
      firstFilterValue: '',
      secondFilterValue: '',
      ...prevState.activeColumn
      }
    }), () => {
      this.filterHandler(firstValue, secondValue, false);
    });
  }

  public handleApply = () => {
    const firstValue = this.state.activeColumn.firstFilterValue;
    const secondValue = this.state.activeColumn.secondFilterValue;

    switch (this.state.activeColumn.columnType) {
    case ColumnDataType.NUMERIC:
      this.filterHandler(parseFloat(firstValue), parseFloat(secondValue), true);
      break;
    case ColumnDataType.BOOLEAN:
      this.filterHandler(firstValue === 'true', '', true);
      break;
    default:
      this.filterHandler(firstValue, secondValue, true);
    }
  }

  public handleKeyDown(event: any) {
    if (event.key === 'Control' && this.state.sorting === true) {
      this.setState(prevState=>({ 
        activeColumn:{
          sorting: false,
          ...prevState.activeColumn
        }
      }));
    }
  }

  public handleKeyUp(event: any) {
    if (event.key === 'Control' && this.state.sorting === false) {
      this.setState(prevState=>({ 
        activeColumn:{
          sorting: true,
          ...prevState.activeColumn
        }
      }));
    }
  }

  public componentDidMount() {
    if (localStorage.getItem(`tubular.${this.props.gridName}`)) {
      const storage = JSON.parse(localStorage.getItem(`tubular.${this.props.gridName}`));
      const dataSource = this.props.dataSource;

      storage.forEach( (element: any, i: number) => {
        if (dataSource.columns[i] !== undefined) {
          dataSource.columns[i].SortDirection = element.SortDirection;
          dataSource.columns[i].SortOrder = element.SortOrder;
          if (dataSource.columns[i].Filter && element.Filter) {
            dataSource.columns[i].Filter.HasFilter = element.Filter.HasFilter;
            dataSource.columns[i].Filter.Operator = element.Filter.Operator;
            dataSource.columns[i].Filter.Text =
              dataSource.columns[i].DataType === ColumnDataType.BOOLEAN ?
                element.Filter.Text :
                element.Filter.Text || '';
            dataSource.columns[i].Filter.Argument[0] = element.Filter.Argument[0] || '';
          }
        }
      });
    }

    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  public filterHandler = (firstValue: any, secondValue: any, hasFilter: boolean) => {
    this.props.dataSource.columns.forEach( (column: any) => {
      if (column.Name === this.state.activeColumn.activeFilterColumn) {
        column.Filter.Text = firstValue;
        column.Filter.Operator = this.state.activeColumn.activeFilter;
        column.Filter.HasFilter = hasFilter;
        if (secondValue !== undefined) {
          column.Filter.Argument = [secondValue];
        }
      }
    });

    this.props.refreshGrid();
    this.handleClose();
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', (event) => this.handleKeyDown(event));
    document.removeEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  public sortHandler = (property: string) => {
    const array = Object.assign({}, this.props.dataSource);

    array.columns.forEach( (column: any) => {
      if (column.Name === property) {
        column.SortDirection = column.SortDirection === ColumnSortDirection.NONE
          ? ColumnSortDirection.ASCENDING
          : column.SortDirection === ColumnSortDirection.ASCENDING ?
            ColumnSortDirection.DESCENDING :
            ColumnSortDirection.NONE;

        if (column.SortDirection === ColumnSortDirection.NONE) {
          column.SortOrder = -1;
        } else {
          column.SortOrder = Number.MAX_VALUE;
        }

        if (this.state.sorting === true) {
          array.columns.filter((col: any) => col.Name !== property).forEach( ($column: any) => {
            $column.SortOrder = -1;
            $column.SortDirection = ColumnSortDirection.NONE;
          });
        }

        const currentlySortedColumns = array.columns.filter((col: ColumnModel) => col.SortOrder > 0)
          .sort((a: ColumnModel, b: ColumnModel) => a.SortOrder === b.SortOrder ? 0 : a.SortOrder > b.SortOrder );

        currentlySortedColumns.forEach( ($column: any, i: number) => {
          $column.SortOrder = i + 1;
        });
      }
    });

    this.props.refreshGrid();
  }

  public handleTextFieldChange = (event: any) => {
    this.setState(prevState=>({
      activeColumn:{
        firstFilterValue: event,
        ...prevState
      }      
    }));
  }

  public handleSecondTextFieldChange = (event: any) => {
    this.setState(prevState=>({
      activeColumn:{
        secondFilterValue: event,
        ...prevState
      }      
    }));
  }

  public handleChange = (event: any) => {
    this.setState(prevState=>({
      activeColumn:{
        activeFilter: event,
        ...prevState
      }      
    }));
  }

  public render() {
    const {  classes, dataSource} = this.props;
    console.log('dialogContent');
    console.log(this.state.activeColumn.firstFilterValue);
    console.log(this.state.activeColumn.secondFilterValue);
    return (
      <TableRow>
        <Dialog open={this.state.activeColumn.open} onClose={this.handleClose} >
          <DialogTitle
            style={{ minWidth: '300px', background: '#ececec', padding: '15px 20px 15px 20px' }}
            id='responsive-dialog-title'
          >{'Filter'}
          </DialogTitle>
          <DialogDropdown
            classes={classes}
            value={this.state.activeColumn.activeFilter}
            columnType={this.state.activeColumn.columnType}
            activeFilter={this.state.activeColumn.activeFilterColumn}
            handleChange={this.handleChange}
          />
          <DialogContent
            classes={classes}
            activeColumn={this.state.activeColumn}
            handleTextFieldChange={this.handleTextFieldChange}
            handleSecondTextFieldChange={this.handleSecondTextFieldChange}
            handleApply={this.handleApply}
            handleClear={this.handleClear}
          />
        </Dialog>
        {dataSource.columns.filter((col: any) => col.Visible).map((column: any) => {
          const render = column.Sortable ?
            (<Tooltip
              title='Click to sort. Press Ctrl to sort by multiple columns'
              placement='bottom-start'
              enterDelay={300}
            >
              <TableSortLabel onClick={(event: any) => this.sortHandler(column.Name)} >
                {column.Label}
                {column.SortDirection === ColumnSortDirection.ASCENDING ?
                  <ArrowUpward className={classes.arrowStyle} />
                  : column.SortDirection === ColumnSortDirection.DESCENDING ?
                    <ArrowDownward className={classes.arrowStyle} />
                    :
                    <div className={classes.arrowStyle} />
                }
              </TableSortLabel>
            </Tooltip>)
            : (column.Label);
          const filter = column.Filter &&
              (<IconButton id={column.Name} onClick={() => this.handleOpen(column)} >
                {column.Filter.HasFilter && column.Filter.Operator !== CompareOperators.NONE ?
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

export default withStyles(styles)(GridHeader);
