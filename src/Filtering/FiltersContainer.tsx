import * as React from 'react';
import List from '@material-ui/core/List';
import { ColumnModel } from 'tubular-common';
import { FilterControl } from './FilterControl';

export interface FiltersContainerProps {
    columns: ColumnModel[];
    onApply: () => void;
}

export const FiltersContainer: React.FunctionComponent<FiltersContainerProps> = ({
    columns,
    onApply,
}: FiltersContainerProps) => {
    return (
        <List component="nav">
            {columns.map((column) => (
                <FilterControl column={column} key={column.name} />
            ))}
        </List>
    );
};
