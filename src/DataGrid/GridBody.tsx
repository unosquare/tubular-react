import TableBody from '@material-ui/core/TableBody';
import * as React from 'react';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { NoDataRow } from './NoDataRow';
import { TbRow } from './TbRow';

interface IProps {
    grid: IDataGrid;
    //ToDo: Use the right type for this prop.
    bodyRenderer: any;
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

    const styles = getStyles(Boolean(onRowClick));
    // Note: I'm not pretty sure, that we should wait until this pipeline point to validate the nullability of the prop.
    const RowComponent = bodyRenderer ? bodyRenderer : TbRow;

    return (
        <TableBody>
            {
                grid.state.filteredRecordCount === 0 && !grid.state.isLoading ? (
                    <NoDataRow
                        grid={grid}
                        styles={styles}
                    />
                ) :
                    grid.state.data
                        .map((row: any, rowIndex: number) => (
                            <RowComponent
                                row={row}
                                key={rowIndex}
                                columns={grid.state.columns}
                                onRowClickProxy={onRowClickProxy(row)}
                                style={styles.row}
                            />
                        ))
            }
        </TableBody>
    );
};
