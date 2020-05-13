import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';
import { ColumnModel, ColumnSortDirection } from 'tubular-common';
import Lang from '../utils/Lang';

export interface GridHeaderCellProps {
    column: ColumnModel;
    key: string;
    sortColumn: (property: string) => void;
}

export const GridHeaderCell: React.FunctionComponent<GridHeaderCellProps> = ({
    column,
    sortColumn,
}: GridHeaderCellProps) => {
    const sort = () => sortColumn(column.name);
    const direction =
        column.sortDirection === ColumnSortDirection.Ascending || column.sortDirection === ColumnSortDirection.None
            ? 'asc'
            : 'desc';

    const render = column.sortable ? (
        <Tooltip title={Lang.translate('ClickSort')} placement="bottom-start" enterDelay={300}>
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

    return (
        <TableCell key={column.label} padding={column.label === '' ? 'none' : 'default'}>
            {render}
        </TableCell>
    );
};
