import {
  IconButton,
  TableCell,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';

import { ArrowDownward, ArrowUpward, FilterList } from '@material-ui/icons';

import * as React from 'react';
import { ColumnSortDirection, CompareOperators } from 'tubular-common';
import { DataSourceContext } from '../DataSource';
import DialogModal from './DialogModal';

const arrowStyle = {
  marginLeft: '5px',
  width: '15px'
};

const renderColumnHeader = (actions: any) => (column: any) => {
  const render = column.Sortable ? (
    <Tooltip
      title='Click to sort. Press Ctrl to sort by multiple columns'
      placement='bottom-start'
      enterDelay={300}
    >
      <TableSortLabel
        onClick={() => actions.sortColumn(column.Name)}
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
      onClick={(e) => actions.setActiveColumn(column, e)}
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
};

const GridHeader: React.SFC = () => (
  <DataSourceContext.Consumer>
    {({ actions, state }) => (
      <TableRow>
        {state.activeColumn && <DialogModal />}
        {state.columns
          .filter((col: any) => col.Visible)
          .map(renderColumnHeader(actions))}
      </TableRow>
    )}
  </DataSourceContext.Consumer>
);

export default GridHeader;
