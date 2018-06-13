import { IconButton, TableCell, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import { ArrowDownward, ArrowUpward, FilterList } from '@material-ui/icons';

import * as React from 'react';
import DialogModal from './DialogModal';
import { ColumnSortDirection, CompareOperators } from './Models/Column';
import ColumnModel from './Models/ColumnModel';

import { GridConsumer } from './GridContext';

const styles = (theme: Theme) => createStyles(
  {
    arrowStyle: {
      marginLeft: '5px',
      width: '15px'
    }
  });

interface IState {
  sorting: boolean;
}

interface IProps extends WithStyles<typeof styles> {
  dataSource: any;
  page?: number;
  rowsPerPage: number;
  refreshGrid(): void;
}

class GridHeader extends React.Component<IProps, IState> {
  public state = {
    sorting: true
  };

  public handleKeyDown(event: any) {
    if (event.key === 'Control' && this.state.sorting) {
      // TODO: Rewrite
    }
  }

  public handleKeyUp(event: any) {
    if (event.key === 'Control' && !this.state.sorting) {
      // TODO: Rewrite
    }
  }

  public componentDidMount() {
    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));
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

  public render() {
    const { classes, dataSource } = this.props;

    return (
      <GridConsumer>
        {({ actions, state }) =>
          < TableRow >
            <DialogModal />
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
                </Tooltip>
                )
                : (column.Label);
              const filter = column.Filter &&
                (<IconButton id={column.Name} onClick={actions.setActiveColumn(column)} >
                  <FilterList
                    color={(column.Filter.HasFilter && column.Filter.Operator !== CompareOperators.NONE)
                      ? 'action' : 'disabled'}
                  />
                </IconButton>);

              return (
                <TableCell key={column.Label} padding={column.Label === '' ? 'none' : 'default'}>
                  {render}
                  {filter}
                </TableCell>
              );
            })}
          </TableRow>}
      </GridConsumer>
    );
  }
}

export default withStyles(styles)(GridHeader);
