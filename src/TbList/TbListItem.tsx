import ListItem from '@material-ui/core/ListItem';
import * as React from 'react';
import { renderDefaultListItem } from '../utils/renders';
import { ColumnModel } from 'tubular-common';

export interface TbListItemProps {
    selectedIndex: number;
    onItemClick(row): void;
    row: {};
    rowStyle: any;
    columns: ColumnModel[];
}

export const TbListItem: React.FunctionComponent<TbListItemProps> = ({
    selectedIndex,
    onItemClick,
    row,
    rowStyle,
    columns,
}: TbListItemProps) => {
    return (
        <ListItem
            button={true}
            selected={selectedIndex === 0}
            onClick={onItemClick}
            style={{ ...rowStyle, padding: '20px' }}
        >
            {renderDefaultListItem(columns, row)}
        </ListItem>
    );
};
