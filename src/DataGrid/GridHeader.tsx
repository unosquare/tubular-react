import { IconButton, TableCell, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';

import { ArrowDownward, ArrowUpward, FilterList } from '@material-ui/icons';

import * as React from 'react';
import { DataSourceContext } from '../DataSource';
import DialogModal from './DialogModal';
import { ColumnSortDirection, CompareOperators } from '../Models/Column';

const arrowStyle = {
  marginLeft: '5px',
  width: '15px'
};

const GridHeader: React.SFC = () => {
  return (
    <DataSourceContext.Consumer>
      {({ actions, state }) =>
        <TableRow>
          {state.activeColumn && <DialogModal />}
          {state.columns.filter((col: any) => col.Visible).map((column: any) => {
            const render = column.Sortable ?
              (<Tooltip
                title='Click to sort. Press Ctrl to sort by multiple columns'
                placement='bottom-start'
                enterDelay={300}
              >
                <TableSortLabel onClick={() => actions.sortColumn(column.Name)} >
                  {column.Label}
                  {column.SortDirection === ColumnSortDirection.ASCENDING ?
                    <ArrowUpward style={arrowStyle} />
                    : column.SortDirection === ColumnSortDirection.DESCENDING ?
                      <ArrowDownward style={arrowStyle} />
                      :
                      <div style={arrowStyle} />
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
    </DataSourceContext.Consumer>
  );
};
export default GridHeader;
