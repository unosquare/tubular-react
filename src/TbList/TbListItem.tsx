import ListItem from '@material-ui/core/ListItem';
import * as React from 'react';
import { renderDefaultListItem } from '../utils/renders';

export const TbListItem = ({ selectedIndex, onItemClick, row, rowStyle, columns }: any) => {
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
