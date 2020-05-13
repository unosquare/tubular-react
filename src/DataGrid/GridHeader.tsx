import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { ITbTableInstance } from 'tubular-react-common';
import DetailComponent from '../DataGridInterfaces/DetailComponent';
import { GridHeaderCell } from './GridHeaderCell';

export interface GridHeaderProps {
    tbTableInstance: ITbTableInstance;
    detailComponent?: React.ReactElement<DetailComponent>;
}

export const GridHeader: React.FunctionComponent<GridHeaderProps> = ({
    tbTableInstance,
    detailComponent,
}: GridHeaderProps) => {
    const { api, state } = tbTableInstance;

    return (
        <TableRow>
            {detailComponent && <TableCell key="Detail" padding="default" />}
            {state.columns
                .filter((col: ColumnModel) => col.visible)
                .map((column: ColumnModel) => (
                    <GridHeaderCell key={column.name} column={column} sortColumn={api.sortColumn} />
                ))}
        </TableRow>
    );
};
