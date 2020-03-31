import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { DataGridCard } from '../DataGrid';

export interface TbMobileRowProps {
    columns: ColumnModel[];
    onRowClick(row: {}): void;
    row: {};
}

export const TbMobileRow: React.FunctionComponent<TbMobileRowProps> = ({
    columns,
    onRowClick,
    row,
}: TbMobileRowProps) => {
    return <DataGridCard columns={columns} item={row} onClickCallback={onRowClick} />;
};
