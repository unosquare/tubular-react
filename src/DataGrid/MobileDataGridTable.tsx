import GridList from '@material-ui/core/GridList';
import * as React from 'react';

import { ITbTableInstance } from 'tubular-react-common';
import { TbMobileRow } from '../BareBones/TbMobileRow';
import { TbRowProps } from '../BareBones/TbRow';

export interface MobileDataGridTableProps {
    tbTableInstance: ITbTableInstance;
    rowComponent?: React.FunctionComponent<TbRowProps>;
    onRowClick?(row: {}): void;
}

const generateOnRowClickProxy = onRowClick => {
    return (row: {}) => {
        return () => {
            if (onRowClick) {
                onRowClick(row);
            }
        };
    };
};

export const MobileDataGridTable: React.FunctionComponent<MobileDataGridTableProps> = ({
    tbTableInstance,
    rowComponent,
    onRowClick,
}: MobileDataGridTableProps) => {
    const RowComponent = rowComponent ? rowComponent : TbMobileRow;
    const onRowClickProxy = onRowClick ? generateOnRowClickProxy(onRowClick) : () => void 0;

    return (
        <GridList cellHeight="auto" cols={1}>
            {tbTableInstance.state.data.map((row: {}, index: number) => (
                <RowComponent
                    columns={tbTableInstance.state.columns}
                    row={row}
                    rowIndex={index}
                    onRowClick={onRowClickProxy(row)}
                    key={index}
                />
            ))}
        </GridList>
    );
};
