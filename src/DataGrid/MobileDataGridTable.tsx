import GridList from '@material-ui/core/GridList';
import * as React from 'react';

import { ITbTableInstance } from 'tubular-react-common/types/ITbTableInstance';
import { TbMobileRow } from '../BareBones/TbMobileRow';
import { ITbRow } from '../BareBones/TbRow';

interface IProps {
    tbTableInstance: ITbTableInstance;
    rowComponent?: React.FunctionComponent<ITbRow>;
    onRowClick?(row: any): void;
}

const generateOnRowClickProxy = (onRowClick) => {
    return (row: any) => (ev: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };
};

export const MobileDataGridTable: React.FunctionComponent<IProps> = ({ tbTableInstance, rowComponent, onRowClick }) => {
    const RowComponent = rowComponent ? rowComponent : TbMobileRow;
    const onRowClickProxy = onRowClick ? generateOnRowClickProxy(onRowClick) : () => void 0;

    return (
        <GridList
            cellHeight='auto'
            cols={1}
        >
            {
                tbTableInstance.state.data.map((row: any, index: number) =>
                    (
                        <RowComponent
                            columns={tbTableInstance.state.columns}
                            row={row}
                            rowIndex={index}
                            onRowClick={onRowClickProxy(row)}
                            key={index}
                        />
                    ))
            }
        </GridList>
    );
};
