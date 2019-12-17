import * as React from 'react';
import ColumnModel from 'tubular-common/dist/Models/ColumnModel';
import { DataGridCard } from '../DataGrid';

interface IProps {
    columns: ColumnModel[];
    onRowClick: any;
    row: any;
}

export const TbMobileRow: React.FunctionComponent<IProps> = ({ columns, onRowClick, row }: IProps) => {
    return <DataGridCard columns={columns} item={row} onClickCallback={onRowClick} />;
};
