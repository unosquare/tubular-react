import * as React from 'react';
import ColumnModel from 'tubular-common/dist/Models/ColumnModel';
import { DataGridCard } from '../DataGrid';

export interface TbMobileRowProps {
    columns: ColumnModel[];
    onRowClick: ({}) => void;
    row: {};
}

export const TbMobileRow: React.FunctionComponent<TbMobileRowProps> = ({
    columns,
    onRowClick,
    row,
}: TbMobileRowProps) => <DataGridCard columns={columns} item={row} onClickCallback={onRowClick} />;
