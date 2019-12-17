import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { ColumnModel } from 'tubular-common';

const dropdown = {
    marginLeft: '10%',
    width: '80%',
};

const getValue = (op: string) => (!op || op === '' ? 'None' : op);

export const OperatorsDropdown: React.FunctionComponent<any> = ({ activeColumn, handleFilterChange }) => {
    const onChange = ({ target }: any) => handleFilterChange({ Operator: target.value });

    return (
        <TextField
            style={dropdown}
            select={true}
            value={getValue(activeColumn.Filter.Operator)}
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
