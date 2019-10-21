import TableRow from '@material-ui/core/TableRow/TableRow';
import * as React from 'react';
import ColumnModel from 'tubular-common/dist/Models/ColumnModel';
import { renderCells } from '../utils/renders';

interface IProps {
    key: number;
    row: any;
    columns: ColumnModel[];
    onRowClickProxy?: (ev: any) => any;
    style: any;
}

export const TbRow: React.FunctionComponent<IProps> = ({
    row,
    key,
    columns,
    onRowClickProxy,
    style,
}) => (
        <TableRow
            hover={true}
            key={key}
            onClick={onRowClickProxy}
            style={style}
        >
            {renderCells(columns, row)}
        </TableRow>
    );
