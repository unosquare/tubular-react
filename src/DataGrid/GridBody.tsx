import TableBody from '@material-ui/core/TableBody';
import * as React from 'react';
import { ITbRow, TbRow } from '../BareBones/TbRow';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import IDetailComponet from '../DataGridInterfaces/IDetailComponent';
import { renderCells } from '../utils';
import MasterDetailRow from './MasterDetailRow';
import { NoDataRow } from './NoDataRow';

interface IProps {
    detailComponent?: React.ReactElement<IDetailComponet>;
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

export const GridBody: React.FunctionComponent<IProps> = ({ grid, rowComponent, onRowClick, detailComponent }) => {
    const styles = getStyles(Boolean(onRowClick));
    const RowComponent = rowComponent ? rowComponent : TbRow;
    const onRowClickProxy = onRowClick ? generateOnRowClickProxy(onRowClick) : () => void 0;

    let content = null;

    if (grid.state.filteredRecordCount === 0 && !grid.state.isLoading) {
        content = <NoDataRow columns={grid.state.columns} styles={styles} />;
    } else {
        content = grid.state.data
            .map((row: any, rowIndex: number) => {
                if (detailComponent) {
                    return (
                        <MasterDetailRow
                            detail={detailComponent}
                            renderCells={renderCells(grid.state.columns, row)}
                            clickEvent={onRowClickProxy}
                            style={styles.row}
                            key={rowIndex}
                            rowData={row}
                            columns={grid.state.columns}
                        />
                    );
                }

                return (
                    <RowComponent
                        row={row}
                        key={rowIndex}
                        rowIndex={rowIndex}
                        columns={grid.state.columns}
                        onRowClick={onRowClickProxy(row)}
                    />
                );

            });
    }

    return (
        <TableBody>
            {content}
        </TableBody>
    );
};
