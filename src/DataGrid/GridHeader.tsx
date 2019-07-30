import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import FilterList from '@material-ui/icons/FilterList';
import * as React from 'react';
import { ColumnModel, ColumnSortDirection, CompareOperators } from 'tubular-common';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { DialogModal } from '../Filtering/DialogModal';

interface IGridHeaderCellProps {
  column: ColumnModel;
  key: string;
  setActiveColumn: (column: any, event: React.MouseEvent<HTMLElement>) => void;
  sortColumn: (property: string) => void;
}

export const GridHeaderCell: React.FunctionComponent<IGridHeaderCellProps> =
  ({ column, sortColumn, setActiveColumn }: any) => {
    const sort = () => sortColumn(column.Name);
    const handleClick = (e: any) => setActiveColumn(column, e);

    const direction = column.SortDirection === ColumnSortDirection.ASCENDING ||
      column.SortDirection === ColumnSortDirection.NONE ? 'asc' : 'desc';

    const render = column.Sortable ? (
      <Tooltip
        title='Click to sort. Press Ctrl to sort by multiple columns'
        placement='bottom-start'
        enterDelay={300}
      >
        <TableSortLabel
          onClick={sort}
          direction={direction}
          active={column.SortDirection !== ColumnSortDirection.NONE}
        >
          {column.Label}
        </TableSortLabel>
      </Tooltip>
    ) : (
        column.Label
      );

    const filter = column.Filterable && (
      <IconButton
        id={column.Name}
        onClick={handleClick}
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

interface IProps {
  grid: IDataGrid;
}

export const GridHeader: React.FunctionComponent<IProps> = ({ grid }: any) => {
  return (
    <TableRow>
      {grid.state.activeColumn &&
        <DialogModal
          activeColumn={grid.state.activeColumn}
          anchorFilter={grid.state.anchorFilter}
          setAnchorFilter={grid.api.setAnchorFilter}
          setFilter={grid.api.setFilter}
          handleFilterChange={grid.api.handleFilterChange}
        />}
      {grid.state.columns
        .filter((col: any) => col.Visible)
        .map((column: any) =>
          <GridHeaderCell
            key={column.Name}
            column={column}
            sortColumn={grid.api.sortColumn}
            setActiveColumn={grid.api.setActiveColumn}
          />,
        )}
    </TableRow>
  );
};
