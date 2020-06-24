import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { DataGridCard } from '../DataGrid';

export interface TbMobileRowProps {
    columns: ColumnModel[];
    onRowClick(row: any): void;
    row: any;
}

export const TbMobileRow: React.FunctionComponent<TbMobileRowProps> = ({
    columns,
    onRowClick,
    row,
    unusedVar,
}: TbMobileRowProps) => {
    return <DataGridCard columns={columns} item={row} onClickCallback={onRowClick} />;
};
