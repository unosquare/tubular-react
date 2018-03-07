import { WithStyles, withStyles } from 'material-ui';
import ArrowDownward from 'material-ui-icons/ArrowDownward';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
import FilterListIcon from 'material-ui-icons/FilterList';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import { StyleRules, Theme } from 'material-ui/styles';
import { TableCell, TableRow, TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { KeyboardEvent } from 'react';
import { ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';
import DialogContent from './DialogContent';
import DialogDropdown from './DialogDropdown';

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
  open: boolean;
  columnType: any;
  activeFilter: string;
  sorting: string;
  firstFilterValue: string;
  secondFilterValue: string;
  activeFilterColumn: string;
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
    activeFilter: '',
    activeFilterColumn: '',
    columnType: '',
    firstFilterValue: '',
    open: false,
    secondFilterValue: '',
    sorting: 'Single'
  };

  public handleClose = () => {
    this.setState({ open: false });
  }

  public handleOpen = (column: any) => {
    this.setState({
      activeFilter: column.Filter.Operator, activeFilterColumn: column.Name,
      columnType: column.DataType,
      firstFilterValue: column.Filter.Text,
      open: true,
      secondFilterValue: column.Filter.Argument[0]
     },
      () => {
        document.getElementById(this.state.activeFilterColumn).blur();
      }
    );
  }

  public handleClear = () => {
    let firstValue = '';
    let secondValue = '';

    switch (this.state.columnType) {
    case ColumnDataType.DATE:
    case ColumnDataType.DATE_TIME:
    case ColumnDataType.DATE_TIME_UTC:
      firstValue = moment().format();
      secondValue = moment().format();
      break;
    default:
    }

    this.setState({
      activeFilter: CompareOperators.NONE,
      firstFilterValue: '',
      secondFilterValue: ''
    }, () => {
      this.filterHandler(firstValue, secondValue, false);
    });
  }

  public handleApply = () => {
    const firstValue = this.state.firstFilterValue;
    const secondValue = this.state.secondFilterValue;

    switch (this.state.columnType) {
    case ColumnDataType.NUMERIC:
      this.filterHandler(parseFloat(firstValue), parseFloat(secondValue), true);
      break;
    case ColumnDataType.BOOLEAN:
      this.filterHandler((firstValue === 'true'), 1, true);
      break;
    default:
      this.filterHandler(firstValue, secondValue, true);
    }
  }

  public handleKeyDown(event: any) {
    if (event.key === 'Control' && this.state.sorting === 'Single') {
      this.setState({ sorting: 'Multiple' });
    }
  }

  public handleKeyUp(event: any) {
    if (event.key === 'Control' && this.state.sorting === 'Multiple') {
      this.setState({ sorting: 'Single' });
    }
  }

  public localStorageHandler = (count: number, dataSource: any) => {
    if (count >= dataSource.columns.length) {
      return;
    }

    let firstValue = '';
    let secondValue = '';

    switch (dataSource.columns[count].DataType ) {
    case ColumnDataType.DATE:
    case ColumnDataType.DATE_TIME:
    case ColumnDataType.DATE_TIME_UTC:
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
      activeFilter: dataSource.columns[count].Filter && dataSource.columns[count].Filter.Operator as string,
      activeFilterColumn: dataSource.columns[count].Name,
      columnType: dataSource.columns[count].DataType as any,
      firstFilterValue: firstValue,
      secondFilterValue: secondValue,
    }, () => {
      this.localStorageHandler(count + 1, dataSource);
    });
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
            dataSource.columns[i].Filter.Text = element.Filter.Text || '';
            dataSource.columns[i].Filter.Argument[0] = element.Filter.Argument[0] || '';
          }
        }
      });

      this.localStorageHandler(0, dataSource);
    }

    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  public filterHandler = (firstValue: any, secondValue: any, hasFilter: boolean) => {
    this.props.dataSource.columns.forEach( (column: any) => {
      if (column.Name === this.state.activeFilterColumn) {
        column.Filter.Text = firstValue;
        column.Filter.Operator = this.state.activeFilter;
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

  public sortHandler = (property: any) => {
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

        if (this.state.sorting === 'Single') {
          array.columns.filter((col: any) => col.Name !== property).forEach( ($column: any) => {
            $column.SortOrder = -1;
            $column.SortDirection = ColumnSortDirection.NONE;
          });
        }

        const currentlySortedColumns = array.columns.filter((col: any) => col.SortOrder > 0)
          .sort((a: any, b: any) => a.SortOrder === b.SortOrder ? 0 : a.SortOrder > b.SortOrder );

        currentlySortedColumns.forEach( ($column: any, i: number) => {
          $column.SortOrder = i + 1;
        });
      }
    });

    this.props.refreshGrid();
  }

  public handleDatePicker = (event: any, name: string) => {
    if (name === 'Value') {
      this.setState({
        firstFilterValue: event.format()
      });
    } else {
      this.setState({
        secondFilterValue: event.format()
      });
    }
  }

  public handleChange = (name: any, value: any) => {
    this.setState({activeFilter: value });
  }

  public handleTextFieldChange = (event: any, name: string) => {
    this.setState({
      firstFilterValue: event
    });
  }

  public handleSecondTextFieldChange = (event: any, name: string) => {
    this.setState({
      secondFilterValue: event
    });
  }

  public handleBooleanDropDown = (event: any) => {
    this.setState({ activeFilter: event.target.value });
  }

  public render() {
    const {  classes, dataSource} = this.props;
    return (
      <TableRow>
        <Dialog open={this.state.open} onClose={this.handleClose} >
          <DialogTitle
            style={{ minWidth: '300px', background: '#ececec', padding: '15px 20px 15px 20px' }}
            id='responsive-dialog-title'
          >{'Filter'}
          </DialogTitle>
          <DialogDropdown
            classes={classes}
            value={this.state.activeFilter}
            columnType={this.state.columnType}
            activeFilter={this.state.activeFilterColumn}
            handleChange={this.handleChange}
          />
          <DialogContent
            classes={classes}
            columnType={this.state.columnType}
            activeFilter={this.state.activeFilter}
            operator={this.state.activeFilter}
            value={this.state.firstFilterValue}
            value2={this.state.secondFilterValue}
            handleDatePicker={this.handleDatePicker}
            handleBooleanDropDown={this.handleBooleanDropDown}
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
