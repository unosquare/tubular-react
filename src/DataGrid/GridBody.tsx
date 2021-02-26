import TableBody from '@material-ui/core/TableBody';
import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { TbRowProps, TbRow } from '../BareBones/TbRow';
import { NoDataRow } from './NoDataRow';
import { TbSelection } from '../utils/Selection';
import DetailComponentProps from '../BareBones/DetailComponentProps';

interface GridBodyProps {
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
    tbTableInstance: ITbTableInstance;
    rowComponent: React.FunctionComponent<TbRowProps>;
    rowSelectionEnabled?: boolean;
    onRowClick?(row: any): void;
    selection?: TbSelection;
}

const getStyles = (isPointer: boolean) => ({
    row: { cursor: isPointer ? 'pointer' : 'auto' },
    title: { paddingLeft: '15px' },
});

const generateOnRowClickProxy = (onRowClick: any) => {
    return (row: any) => () => {
        if (onRowClick) {
            onRowClick(row);
        }
    };
};

export const GridBody: React.FunctionComponent<GridBodyProps> = ({
    tbTableInstance,
    rowComponent,
    onRowClick,
    detailComponent,
    rowSelectionEnabled,
    selection,
}: GridBodyProps) => {
    const styles = getStyles(Boolean(onRowClick));
    const RowComponent = rowComponent ? rowComponent : TbRow;
    const onRowClickProxy = onRowClick ? generateOnRowClickProxy(onRowClick) : (_row: any): (() => void) => void 0;
    const { state } = tbTableInstance;
    const columnKey = tbTableInstance.state.columns.find((c) => c.isKey);

    let content = null;

    if (state.filteredRecordCount === 0 && !state.isLoading) {
        content = <NoDataRow columns={state.columns} styles={styles} />;
    } else {
        content = state.data.map((row: any, rowIndex: number) => {
            return (
                <RowComponent
                    row={row}
                    key={row[columnKey.name]}
                    rowIndex={rowIndex}
                    columns={state.columns}
                    detailComponent={detailComponent}
                    onRowClick={onRowClickProxy(row)}
                    rowSelectionEnabled={rowSelectionEnabled}
                    selection={selection}
                />
            );
        });
    }

    return <TableBody>{content}</TableBody>;
};
