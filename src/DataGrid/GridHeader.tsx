import { IconButton, TableCell, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import { ArrowDownward, ArrowUpward, FilterList } from '@material-ui/icons';

import { ColumnDataType, ColumnSortDirection, CompareOperators } from './Column';
import ColumnModel from './ColumnModel';
import DialogModal from './DialogModal';
import * as React from 'react';

const styles = (theme: Theme) => createStyles(
  {
  arrowStyle: {
    marginLeft: '5px',
    width: '15px'
  }
}); 

interface IState {
  activeColumn: any;
  sorting: boolean;
}
interface IProps extends WithStyles<typeof styles> {
  dataSource: any;
  gridName: string;
  page?: number;
  rowsPerPage: number;
  refreshGrid(): void;
}

class GridHeader extends React.Component <IProps, IState> {
  public state = {
    activeColumn: null as any,
    sorting: true
  };

  public handleClose = () => {
    this.setState({ activeColumn: null });
  }

  public handleOpen = (column: any) => {
    this.setState({
      activeColumn: column,
    },
      () => {
        document.getElementById(column.Name).blur();
      }
    );
  }

  public handleClear = () => {
    this.setState(prevState => ({
      activeColumn: {
        ...prevState.activeColumn,
        Filter: {
          ...prevState.activeColumn.Filter,
          Operator: CompareOperators.NONE,
          Text: '',
          Argument: ['']
        }
      }
    }), () => {
      this.filterHandler(this.state.activeColumn.Filter.Text, this.state.activeColumn.Filter.Argument[0], false);
    });
  }

  public handleApply = () => {
    switch (this.state.activeColumn.DataType) {
      case ColumnDataType.NUMERIC:
        this.filterHandler(parseFloat(this.state.activeColumn.Filter.Text), parseFloat(this.state.activeColumn.Filter.Argument[0]), true);
        break;
      case ColumnDataType.BOOLEAN:
        this.filterHandler(this.state.activeColumn.Filter.Text === 'true', '', true);
        break;
      default:   
        this.filterHandler(this.state.activeColumn.Filter.Text, this.state.activeColumn.Filter.Argument[0], true);
    }
  }

  public handleKeyDown(event: any) {
    if (event.key === 'Control' && this.state.sorting === true) {
      this.setState(prevState => ({
        activeColumn: {
          ...prevState.activeColumn,
          sorting: false
        }
      }));
    }
  }

  public handleKeyUp(event: any) {
    if (event.key === 'Control' && this.state.sorting === false) {
      this.setState(prevState => ({
        activeColumn: {
          ...prevState.activeColumn,
          sorting: true

        }
      }));
    }
  }

  public componentDidMount() {
    if (localStorage.getItem(`tubular.${this.props.gridName}`)) {
      const storage = JSON.parse(localStorage.getItem(`tubular.${this.props.gridName}`));
      
      const dataSource = this.props.dataSource;

      storage.forEach((element: any, i: number) => {        
        if (dataSource.columns[i] === undefined) return;
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
      });
    }

    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  public filterHandler = (firstValue: any, secondValue: any, hasFilter: boolean) => {
    const column = this.props.dataSource.columns.find((column: any) => column.Name === this.state.activeColumn.Name);
    if (!column) return;

    column.Filter.Text = firstValue;
    column.Filter.Operator = this.state.activeColumn.Filter.Operator;
    column.Filter.HasFilter = hasFilter;
    
    if (secondValue !== undefined) {
      column.Filter.Argument = [secondValue];
    }
    
    this.props.refreshGrid();    
    this.handleClose();    
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', (event) => this.handleKeyDown(event));
    document.removeEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  public sortHandler = (property: string) => {
    const array = Object.assign({}, this.props.dataSource);

    array.columns.forEach((column: any) => {
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
          array.columns.filter((col: any) => col.Name !== property).forEach(($column: any) => {
            $column.SortOrder = -1;
            $column.SortDirection = ColumnSortDirection.NONE;
          });
        }

        const currentlySortedColumns = array.columns.filter((col: ColumnModel) => col.SortOrder > 0)
          .sort((a: ColumnModel, b: ColumnModel) => a.SortOrder === b.SortOrder ? 0 : a.SortOrder > b.SortOrder);

        currentlySortedColumns.forEach(($column: any, i: number) => {
          $column.SortOrder = i + 1;
        });
      }
    });

    this.props.refreshGrid();
  }

  public handleTextFieldChange = (event: any) => {
    let value = event.target.value;
    this.setState(prevState => ({
      activeColumn: {
        ...prevState.activeColumn,
        Filter: {
          ...prevState.activeColumn.Filter,
          Text: value,
        }
      }
    }));
  }

  public handleSecondTextFieldChange = (event: any) => {
    this.setState(prevState => ({
      activeColumn: {
        ...prevState.activeColumn,
        Filter: {
          ...prevState.activeColumn.Filter,
          Argument: [event],
        }
      }
    }));
  }

  public handleChange = (event: any) => {
    this.setState(prevState => ({
      activeColumn: {
        ...prevState.activeColumn,
        Filter: {
          ...prevState.activeColumn.Filter,
          Operator: event
        }
      }
    }));
  }
  
  public render() {
    const { classes, dataSource} = this.props;
    return (
      <TableRow>  
         <DialogModal
                activeColumn={this.state.activeColumn}
                handleChange={this.handleChange}
                handleClose={this.handleClose}
                handleTextFieldChange={this.handleTextFieldChange}
                handleSecondTextFieldChange={this.handleSecondTextFieldChange}
                handleApply={this.handleApply}
                handleClear={this.handleClear}
            />
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
                <FilterList color={(column.Filter.HasFilter && column.Filter.Operator !== CompareOperators.NONE) ?'action':'disabled'} />
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
