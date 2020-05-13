import * as React from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FilterListIcon from '@material-ui/icons/FilterList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { ColumnModel, columnHasFilter } from 'tubular-common';
import { useToggle } from 'uno-react';
import { StandardFilterEditor } from './StandardFilterEditor';

export interface FilterControlProps {
    column: ColumnModel;
}

export const FilterControl: React.FunctionComponent<FilterControlProps> = ({ column }: FilterControlProps) => {
    const hasFilter = columnHasFilter(column);
    const [isOpen, open] = useToggle(false);

    return (
        <>
            <ListItem>
                <ListItemIcon>
                    <IconButton aria-label="delete" size="small" onClick={open}>
                        {isOpen ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary={column.label} />
                <ListItemIcon>{hasFilter && <FilterListIcon />}</ListItemIcon>
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <StandardFilterEditor column={column} onApply={null} />
            </Collapse>
        </>
    );
};
