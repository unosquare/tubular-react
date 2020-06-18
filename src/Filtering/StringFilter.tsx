import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import TextField from '@material-ui/core/TextField';
import { handleFilterChange, onKeyDown } from './utils';

export interface StringFilterProps {
    column: ColumnModel;
    onApply: () => void;
}

export const StringFilter: React.FunctionComponent<StringFilterProps> = ({ column, onApply }: StringFilterProps) => {
    return (
        <>
            <TextField
                label={''}
                onChange={handleFilterChange(column)}
                defaultValue={column.filterText}
                onKeyDown={onKeyDown(onApply)}
            />
        </>
    );
};
