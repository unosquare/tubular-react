import * as React from 'react';
import ColumnModel from 'tubular-common/dist/Models/ColumnModel';
import { DataGridCard } from '.';

interface IProps {
    columns: ColumnModel[];
    key: number;
    onRowClick: any;
    row: any;
}

export const TbMobileRow: React.FunctionComponent<IProps> = ({
    columns,
    key,
    onRowClick,
    row,
}) => {
    return (
        <DataGridCard
            columns={columns}
            item={row}
            onClickCallback={onRowClick}
            key={key}
        />

    );
};