import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { ColumnDataType, ColumnModel, CompareOperators, formatDate } from 'tubular-common';
import Lang from '../utils/Lang';

const dropdown = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%',
};

const BooleanInputOperators = [
    { Value: 'true', Title: 'True' },
    { Value: 'false', Title: 'False' },
];

export interface DialogInputProps {
    isPrimary: boolean;
    column: ColumnModel;
    handleTextFieldChange(value: string): void;
}

const ColumnDataTypeToHtmlType = {
    boolean: 'text',
    date: 'date',
    datetime: 'datetime-local',
    datetimeutc: 'datetime-local',
    numeric: 'number',
    string: 'text',
};

const getValue = (
    dataType: ColumnDataType,
    operator: CompareOperators | string,
    value: string,
    handleTextFieldChange: any,
) => {
    const isNone = operator === CompareOperators.None || operator == 'None';

    switch (dataType) {
        case ColumnDataType.Date:
            if (value) {
                return formatDate(value, 'yyyy-MM-dd');
            }
            handleTextFieldChange(formatDate(new Date().toISOString(), 'YYYY-MM-dd'));
            return '';
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            if (value) {
                return formatDate(value, 'yyyy-MM-dd[T]HH:mm');
            }
            handleTextFieldChange(formatDate(new Date().toISOString(), 'yyyy-MM-dd[T]HH:mm'));
            return '';
        case ColumnDataType.Boolean:
            return isNone ? '' : typeof value === 'boolean' ? (value === true ? 'true' : 'false') : value;
        default:
            return isNone ? '' : value || '';
    }
};

export const DialogInput: React.FunctionComponent<DialogInputProps> = ({
    column,
    handleTextFieldChange,
    isPrimary,
}: DialogInputProps) => {
    const value =
        getValue(
            column.dataType,
            column.filter.operator,
            isPrimary ? column.filter.text : column.filter.argument[0],
            handleTextFieldChange,
        ) || '';
    const disabled = isPrimary ? column.filter.operator === CompareOperators.None : false;
    const label = isPrimary
        ? column.filter.operator !== CompareOperators.Between
            ? `${Lang.translate('Label_Value')}`
            : `${Lang.translate('Label_FirstValue')}`
        : `${Lang.translate('Label_SecondValue')}`;

    const handleChange = ({ target }: any) => handleTextFieldChange(target.value);

    return (
        <TextField
            select={column.dataType === ColumnDataType.Boolean}
            style={dropdown}
            id={column.name}
            disabled={disabled}
            value={value}
            label={label}
            type={(ColumnDataTypeToHtmlType as any)[column.dataType]}
            onChange={handleChange}
        >
            {column.dataType === ColumnDataType.Boolean &&
                BooleanInputOperators.map((option) => (
                    <MenuItem key={option.Value} value={option.Value}>
                        {option.Title}
                    </MenuItem>
                ))}
        </TextField>
    );
};
