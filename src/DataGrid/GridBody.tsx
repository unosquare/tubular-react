import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Warning from '@material-ui/icons/Warning';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import IDetailComponet from '../DataGridInterfaces/IDetailComponent';
import { renderCells } from '../utils';
import MasterDetailRow from './MasterDetailRow';

interface IProps {
    detailComponent?: React.ReactElement<IDetailComponet>;
    grid: IDataGrid;
    bodyRenderer?(
        row: any,
        index: number,
        columns: ColumnModel[],
        onRowClickProxy: (row: any) => void,
    ): React.ReactNode;
    onRowClick?(row: any): void;
}

const getStyles = (isPointer: boolean) => ({
    row: { cursor: isPointer ? 'pointer' : 'auto' },
    title: { paddingLeft: '15px' },
});

export const GridBody: React.FunctionComponent<IProps> = ({ grid, bodyRenderer, onRowClick, detailComponent }) => {
    const onRowClickProxy = (row: any) => (ev: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {

        if (onRowClick) {
            onRowClick(row);
        }
    };

    const styles = getStyles(Boolean(onRowClick));

    if (!bodyRenderer) {
        bodyRenderer = (row, rowIndex, columns) => (
            detailComponent ?
                (
                <MasterDetailRow
                    detail={detailComponent}
                    renderCells={renderCells(columns, row)}
                    clickEvent={onRowClickProxy}
                    style={styles.row}
                    key={rowIndex}
                    rowData={row}
                    columns={columns}
                />
                )
                :
                (
                <TableRow
                    hover={true}
                    key={rowIndex}
                    onClick={onRowClickProxy(row)}
                    style={styles.row}
                >
                    {renderCells(columns, row)}
                </TableRow>
                )
        );
    }

    const noDataRow = (
        <TableRow>
            <TableCell
                colSpan={grid.state.columns.filter((col: any) => col.Visible).length}
            >
                <Typography
                    style={styles.title}
                    variant='body2'
                    gutterBottom={true}
                >
                    <Warning /> No records found
                </Typography>
            </TableCell>
        </TableRow>
    );

    return (
        <TableBody>
            {grid.state.filteredRecordCount === 0 && !grid.state.isLoading
                ? noDataRow
                : grid.state.data
                    .map((row: any, rowIndex: number) =>
                        bodyRenderer(row, rowIndex, grid.state.columns, onRowClickProxy(row)))
            }
        </TableBody>
    );
};
