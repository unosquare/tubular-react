import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { ITbTableInstance } from 'tubular-react-common';
import DetailComponent from '../DataGridInterfaces/DetailComponent';
import { GridHeaderCell } from './GridHeaderCell';
import Checkbox from '@material-ui/core/Checkbox';
import { TbSelection } from '../utils/Selection';

export interface GridHeaderProps {
    tbTableInstance: ITbTableInstance;
    detailComponent?: React.ReactElement<DetailComponent>;
    rowSelectionEnabled: boolean;
    selection?: TbSelection;
}

export const GridHeader: React.FunctionComponent<GridHeaderProps> = ({
    tbTableInstance,
    detailComponent,
    rowSelectionEnabled,
    selection,
}: GridHeaderProps) => {
    const { api, state } = tbTableInstance;

    return (
        <TableRow>
            {detailComponent && <TableCell key="Detail" padding="default" />}
            {rowSelectionEnabled && (
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={selection.isIndeterminateSelection()}
                        checked={selection.getUnSelectedCount() === 0 && tbTableInstance.state.data.length > 0}
                        onChange={selection.toggleAllRowsSelection}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
            )}
            {state.columns
                .filter((col: ColumnModel) => col.visible)
                .map((column: ColumnModel) => (
                    <GridHeaderCell key={column.name} column={column} sortColumn={api.sortColumn} />
                ))}
        </TableRow>
    );
};
