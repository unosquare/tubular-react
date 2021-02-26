import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { renderCells } from '../utils/renders';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { TbSelection } from '../utils/Selection';
import { Collapse, IconButton } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useMasterDetails } from 'tubular-react-common';
import DetailComponentProps from './DetailComponentProps';

export interface TbRowProps {
    row: any;
    rowIndex: number;
    columns: ColumnModel[];
    onRowClick?(): void;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
}

export const TbRow: React.FunctionComponent<TbRowProps> = ({
    row,
    columns,
    onRowClick,
    rowSelectionEnabled,
    selection,
    detailComponent,
}: TbRowProps) => {
    const [open, openDetails] = useMasterDetails();
    const openMasterDetails = () => {
        openDetails();
    };

    const DetailComponent = detailComponent ? detailComponent : null;
    return (
        <>
            <TableRow hover={true} onClick={onRowClick}>
                {detailComponent && (
                    <TableCell padding="checkbox" size="small" align="center">
                        <IconButton size="small" onClick={openMasterDetails}>
                            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                        </IconButton>
                    </TableCell>
                )}
                {rowSelectionEnabled && selection.rowSelection[row[columns.find((c) => c.isKey).name]] !== undefined && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={selection.rowSelection[row[columns.find((c) => c.isKey).name]]}
                            onChange={() => {
                                selection.toggleRowSelection(row[columns.find((c) => c.isKey).name]);
                            }}
                            value={selection.rowSelection[row[columns.find((c) => c.isKey).name]]}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                )}
                {renderCells(columns, row)}
            </TableRow>
            {detailComponent && open && (
                <TableRow hover={true}>
                    <TableCell colSpan={columns.length + 1}>
                        <Collapse in={open} timeout="auto" unmountOnExit={true}>
                            <DetailComponent row={row} />
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};
