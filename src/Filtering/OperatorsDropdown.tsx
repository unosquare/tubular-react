import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { ColumnModel, getOperators, CompareOperators } from 'tubular-common';
import Lang from '../utils/Lang';

const dropdown = {
    marginLeft: '10%',
    width: '80%',
};

const getValue = (op: string) => (!op || op === '' ? 'None' : op);

export interface OperatorsDropdownProps {
    activeColumn: ColumnModel;
    handleFilterChange: (filterText: string, filterOperator: CompareOperators, filterArgument?: any[]) => void;
}

export const OperatorsDropdown: React.FunctionComponent<OperatorsDropdownProps> = ({
    activeColumn,
    handleFilterChange,
}: OperatorsDropdownProps) => {
    const onChange = ({ target }: any) => handleFilterChange(activeColumn.filterText, target.value);

    return (
        <TextField
            style={dropdown}
            select={true}
            value={getValue(activeColumn.filterOperator)}
            onChange={onChange}
            label={Lang.translate('Operator')}
        >
            {getOperators(activeColumn).map((row: any) => (
                <MenuItem key={row.value} value={row.value}>
                    {row.title}
                </MenuItem>
            ))}
        </TextField>
    );
};
