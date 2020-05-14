import * as React from 'react';
import { ColumnModel, columnHasFilter } from 'tubular-common';
import { ChipFilter } from './ChipFilter';

export interface ChipBarProps {
    columns: ColumnModel[];
    onClearFilter: (columnName: string) => void;
}

export const ChipBar: React.FunctionComponent<ChipBarProps> = ({ columns, onClearFilter }: ChipBarProps) => {
    const filteredColumns = columns.filter((c) => columnHasFilter(c) && c.filterable);
    const onRemove = (columnName: string) => () => onClearFilter(columnName);

    return (
        <div>
            {filteredColumns.map((column) => (
                <ChipFilter key={column.name} column={column} onRemoveFilter={onRemove(column.name)} />
            ))}
        </div>
    );
};
