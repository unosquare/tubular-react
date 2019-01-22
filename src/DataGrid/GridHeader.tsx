import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import FilterList from '@material-ui/icons/FilterList';

import * as React from 'react';
import { ColumnSortDirection, CompareOperators } from 'tubular-common';
import { DataSourceContext } from '../DataSource';
import DialogModal from './DialogModal';

const arrowStyle = {
  marginLeft: '5px',
  width: '15px',
};

const sort = (callback: any, columnName: string) => () => callback(columnName);
const handleClick = (callback: any, column: string) => (e: any) => callback(column, e);

const GridHeader: React.SFC = () => {
  return (
    <DataSourceContext.Consumer>
      {({ actions, state }) => (
        <TableRow>
          {state.activeColumn && <DialogModal />}
          {state.columns
            .filter((col: any) => col.Visible)
            .map((column: any) => {
              const render = column.Sortable ? (
                <Tooltip
                  title='Click to sort. Press Ctrl to sort by multiple columns'
                  placement='bottom-start'
                  enterDelay={300}
                >
                  <TableSortLabel
                    onClick={sort(actions.sortColumn, column.Name)}
                  >
                    {column.Label}
                    {column.SortDirection === ColumnSortDirection.ASCENDING ? (
                      <ArrowUpward style={arrowStyle} />
                    ) : column.SortDirection ===
                      ColumnSortDirection.DESCENDING ? (
                          <ArrowDownward style={arrowStyle} />
                        ) : (
                          <div style={arrowStyle} />
                        )}
                  </TableSortLabel>
                </Tooltip>
              ) : (
                  column.Label
                );
              const filter = column.Filterable && (
                <IconButton
                  id={column.Name}
                  onClick={handleClick(actions.setActiveColumn, column)}
                >
                  <FilterList
                    color={
                      column.Filter.HasFilter &&
                        column.Filter.Operator !== CompareOperators.NONE
                        ? 'action'
                        : 'disabled'
                    }
                  />
                </IconButton>
              );

              return (
                <TableCell
                  key={column.Label}
                  padding={column.Label === '' ? 'none' : 'default'}
                >
                  {render}
                  {filter}
                </TableCell>
              );
            })}
        </TableRow>
      )}
    </DataSourceContext.Consumer>
  );
};
export default GridHeader;
