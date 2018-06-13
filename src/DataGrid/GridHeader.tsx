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

interface IProps extends WithStyles<typeof styles> {
  columns: ColumnModel[];
}

class GridHeader extends React.Component<IProps> {
  public render() {
    const { classes, columns } = this.props;

    return (
      <GridConsumer>
        {({ actions, state }) =>
          < TableRow >
          {state.activeColumn && <DialogModal />}
            {columns.filter((col: any) => col.Visible).map((column: any) => {
              const render = column.Sortable ?
                (<Tooltip
                  title='Click to sort. Press Ctrl to sort by multiple columns'
                  placement='bottom-start'
                  enterDelay={300}
                >
                  <TableSortLabel onClick={() => actions.sortColumn(column.Name)} >
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
                (<IconButton id={column.Name} onClick={() => actions.setActiveColumn(column)} >
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
