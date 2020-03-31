import TableRow from '@material-ui/core/TableRow/TableRow';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { renderCells } from '../utils/renders';

export interface TbRowProps {
    row: {};
    rowIndex: number;
    columns: ColumnModel[];
    onRowClick?(): void;
}

export const TbRow: React.FunctionComponent<TbRowProps> = ({ row, columns, onRowClick }: TbRowProps) => (
    <TableRow hover={true} onClick={onRowClick}>
        {renderCells(columns, row)}
    </TableRow>
);
