import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import FilterList from '@material-ui/icons/FilterList';
import * as React from 'react';
import { ColumnModel, ColumnSortDirection, CompareOperators } from 'tubular-common';

export interface GridHeaderCellProps {
    column: ColumnModel;
    key: string;
    setActiveColumn: (column: ColumnModel, event: React.MouseEvent<HTMLElement>) => void;
    sortColumn: (property: string) => void;
}

export const GridHeaderCell: React.FunctionComponent<GridHeaderCellProps> = ({
    column,
    sortColumn,
    setActiveColumn,
}: GridHeaderCellProps) => {
    const sort = () => sortColumn(column.name);
    const handleClick = (e: any) => setActiveColumn(column, e);

    const direction =
        column.sortDirection === ColumnSortDirection.Ascending || column.sortDirection === ColumnSortDirection.None
            ? 'asc'
            : 'desc';

    const render = column.sortable ? (
        <Tooltip
            title="Click to sort. Press Ctrl to sort by multiple columns"
            placement="bottom-start"
            enterDelay={300}
        >
            <TableSortLabel
                onClick={sort}
                direction={direction}
                active={column.sortDirection !== ColumnSortDirection.None}
            >
                {column.label}
            </TableSortLabel>
        </Tooltip>
    ) : (
        column.label
    );

    const filter = column.filterable && (
        <IconButton id={column.name} onClick={handleClick}>
            <FilterList
                color={
                    column.filter.hasFilter && column.filter.operator !== CompareOperators.None ? 'action' : 'disabled'
                }
            />
        </IconButton>
    );

    return (
        <TableCell key={column.label} padding={column.label === '' ? 'none' : 'default'}>
            {render}
            {filter}
        </TableCell>
    );
};
