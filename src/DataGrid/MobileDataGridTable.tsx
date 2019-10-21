import GridList from '@material-ui/core/GridList';

import * as React from 'react';

import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { DataGridCard } from './';

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
                    <DataGridCard
                        columns={grid.state.columns}
                        item={row}
                        onClickCallback={onRowClick}
                        key={index}
                    />
                ))
        }
    </GridList>
);
