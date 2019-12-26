import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { ColumnModel, FilterWrapper } from 'tubular-common';

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
    const onChange = ({ target }) => handleFilterChange({ operator: target.value });

    return (
        <TextField
            style={dropdown}
            select={true}
            value={getValue(activeColumn.filter.operator)}
            onChange={onChange}
            label="Operator"
        >
            {ColumnModel.getOperators(activeColumn).map((row: any) => (
                <MenuItem key={row.Value} value={row.Value}>
                    {row.Title}
                </MenuItem>
            ))}
        </TextField>
    );
};
