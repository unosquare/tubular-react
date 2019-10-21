import GridList from '@material-ui/core/GridList';

import * as React from 'react';

import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { TbMobileRow } from './TbMobileRow';

interface IProps {
    grid: IDataGrid;
    onRowClick?(row: any): void;
}

export const MobileDataGridTable: React.FunctionComponent<IProps> = ({ grid, onRowClick }) => (
    <GridList
        cellHeight='auto'
        cols={1}
    >
        {
            grid.state.data.map((row: any, index: number) =>
                (
                    <TbMobileRow
                        columns={grid.state.columns}
                        row={row}
                        onRowClick={onRowClick}
                        key={index}
                    />
                ))
        }
    </GridList>
);
