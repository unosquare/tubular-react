import TableRow from '@material-ui/core/TableRow/TableRow';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { renderCells } from '../utils/renders';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { TbSelection } from '../utils/Selection';

export interface TbRowProps {
    row: any;
    rowIndex: number;
    columns: ColumnModel[];
    onRowClick?(): void;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
}

export const TbRow: React.FunctionComponent<TbRowProps> = ({
    row,
    columns,
    onRowClick,
    rowSelectionEnabled,
    selection,
}: TbRowProps) => (
    <TableRow hover={true} onClick={onRowClick}>
        {rowSelectionEnabled && (
            <TableCell padding="checkbox">
                <Checkbox
                    checked={selection.rowSelection[row[columns.find((c) => c.isKey).name]]}
                    onChange={() => {
                        console.log(selection.rowSelection);
                        selection.toggleRowSelection(row[columns.find((c) => c.isKey).name]);
                    }}
                    value={selection.rowSelection[row[columns.find((c) => c.isKey).name]]}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                />
            </TableCell>
        )}
        {renderCells(columns, row)}
    </TableRow>
);
