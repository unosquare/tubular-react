import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import TextField from '@material-ui/core/TextField';
import { handleFilterChange, onKeyDown } from './utils';

export interface StringFilterProps {
    column: ColumnModel;
    onEnter: () => void;
}

export const StringFilter: React.FunctionComponent<StringFilterProps> = ({ column, onEnter }: StringFilterProps) => {
    return (
        <>
            <TextField
                label={''}
                onChange={handleFilterChange(column)}
                defaultValue={column.filterText}
                onKeyDown={onKeyDown(onEnter)}
            />
        </>
    );
};
