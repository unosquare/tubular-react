import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { renderCells } from '../utils';
import { NoDataRow } from './NoDataRow';

interface IProps {
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

export const GridBody: React.FunctionComponent<IProps> = ({ grid, bodyRenderer, onRowClick }) => {
    const onRowClickProxy = (row: any) => (ev: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {

        if (onRowClick) {
            onRowClick(row);
        }
    };

    const getStandardBodyRenderer = (row: any, rowIndex: any, columns: any) => (
        <TableRow
            hover={true}
            key={rowIndex}
            onClick={onRowClickProxy(row)}
            style={styles.row}
        >
            {renderCells(columns, row)}
        </TableRow>
    );

    const styles = getStyles(Boolean(onRowClick));

    if (!bodyRenderer) {
        bodyRenderer = getStandardBodyRenderer;
    }

    return (
        <TableBody>
            {grid.state.filteredRecordCount === 0 && !grid.state.isLoading ? (
                <NoDataRow
                    grid={grid}
                    styles={styles}
                />
            ) :
                grid.state.data
                    .map((row: any, rowIndex: number) =>
                        bodyRenderer(row, rowIndex, grid.state.columns, onRowClickProxy(row)))
            }
        </TableBody>
    );
};
