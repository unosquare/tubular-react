import TableBody from '@material-ui/core/TableBody';
import * as React from 'react';
import { ITbRow, TbRow } from '../BareBones/TbRow';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { NoDataRow } from './NoDataRow';

interface IProps {
    grid: IDataGrid;
    rowComponent: React.FunctionComponent<ITbRow>;
    onRowClick?(row: any): void;
}

const getStyles = (isPointer: boolean) => ({
    row: { cursor: isPointer ? 'pointer' : 'auto' },
    title: { paddingLeft: '15px' },
});

const generateOnRowClickProxy = (onRowClick) => {
    return (row: any) => (ev: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };
};

export const GridBody: React.FunctionComponent<IProps> = ({ grid, rowComponent, onRowClick }) => {
    const styles = getStyles(Boolean(onRowClick));
    const RowComponent = rowComponent ? rowComponent : TbRow;
    console.log("ha", RowComponent)
    const onRowClickProxy = rowComponent ? () => void 0 : generateOnRowClickProxy(onRowClick);

    let content = null;

    if (grid.state.filteredRecordCount === 0 && !grid.state.isLoading) {
        content = <NoDataRow columns={grid.state.columns} styles={styles} />;
    } else {
        content = grid.state.data
            .map((row: any, rowIndex: number) => (
                <RowComponent
                    row={row}
                    key={rowIndex}
                    rowIndex={rowIndex}
                    columns={grid.state.columns}
                    onRowClick={onRowClickProxy(row)}
                />
            ));
    }

    return (
        <TableBody>
            {content}
        </TableBody>
    );
};
