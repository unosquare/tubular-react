import TableRow from '@material-ui/core/TableRow/TableRow';
import * as React from 'react';
import ColumnModel from 'tubular-common/dist/Models/ColumnModel';
import { renderCells } from '../utils/renders';

export interface ITbRow {
    row: any;
    rowIndex: number;
    columns: ColumnModel[];
    onRowClick?: (ev: any) => any;
}

export const TbRow: React.FunctionComponent<ITbRow> = ({ row, columns, onRowClick }: ITbRow) => (
    <TableRow hover={true} onClick={onRowClick}>
        {renderCells(columns, row)}
    </TableRow>
);
