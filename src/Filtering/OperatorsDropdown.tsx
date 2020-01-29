import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { ColumnModel, FilterWrapper } from 'tubular-common';
import { Lang } from '../utils/langService';

const dropdown = {
    marginLeft: '10%',
    width: '80%',
};

const getValue = (op: string) => (!op || op === '' ? 'None' : op);

export interface OperatorsDropdownProps {
    activeColumn: ColumnModel;
    handleFilterChange: (value: FilterWrapper | {}) => void;
}

export const OperatorsDropdown: React.FunctionComponent<OperatorsDropdownProps> = ({
    activeColumn,
    handleFilterChange,
}: OperatorsDropdownProps) => {
    const onChange = ({ target }: any) => handleFilterChange({ operator: target.value });

    return (
        <TextField
            style={dropdown}
            select={true}
            value={getValue(activeColumn.filter.operator)}
            onChange={onChange}
            label={Lang.translate('Operator')}
        >
            {ColumnModel.getOperators(activeColumn).map((row: any) => (
                <MenuItem key={row.value} value={row.value}>
                    {row.title}
                </MenuItem>
            ))}
        </TextField>
    );
};
