import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { ColumnModel, IFilterWrapper } from 'tubular-common';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import IDetailComponet from '../DataGridInterfaces/IDetailComponent';
import { DialogModal } from '../Filtering/DialogModal';
import { GridHeaderCell } from './GridHeaderCell';

interface IProps {
  grid: IDataGrid;
  detailComponent?: React.ReactElement<IDetailComponet>;
}

export const GridHeader: React.FunctionComponent<IProps> = ({ grid, detailComponent }) => {
  const [anchorFilter, setAnchorFilter] = React.useState(null);

  const setActiveColumn = (column: ColumnModel, event: React.MouseEvent<HTMLElement>) => {
    grid.api.setActiveColumn(column);
    setAnchorFilter(event.currentTarget);
  };

  const setFilter = (filter: IFilterWrapper) => {
    grid.api.setFilter(filter);
    setAnchorFilter(null);
  };

  return (
    <TableRow>
      {detailComponent && <TableCell key='Detail' padding='default' />}
      {grid.state.activeColumn &&
        (
          <DialogModal
            activeColumn={grid.state.activeColumn}
            anchorFilter={anchorFilter}
            setAnchorFilter={setAnchorFilter}
            setFilter={setFilter}
            handleFilterChange={grid.api.handleFilterChange}
          />
        )}
      {grid.state.columns
        .filter((col: ColumnModel) => col.Visible)
        .map((column: ColumnModel) => (
          <GridHeaderCell
            key={column.Name}
            column={column}
            sortColumn={grid.api.sortColumn}
            setActiveColumn={setActiveColumn}
          />
        ))}
    </TableRow>
  );
};
