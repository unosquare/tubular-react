import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { ColumnDataType, ColumnModel, CompareOperators, formatDate } from 'tubular-common';

const dropdown = {
  marginLeft: '10%',
  marginTop: '5%',
  width: '80%',
};

const BooleanInputOperators = [
  { Value: 'true', Title: 'True' },
  { Value: 'false', Title: 'False' },
];

interface IProps {
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
  operator: CompareOperators,
  value: string,
  handleTextFieldChange: any,
) => {
  switch (dataType) {
    case ColumnDataType.DATE:
      if (value) {
        return formatDate(value, 'yyyy-MM-DD');
      }
      handleTextFieldChange(formatDate(new Date().toISOString(), 'YYYY-MM-DD'));
      return '';
    case ColumnDataType.DATE_TIME:
    case ColumnDataType.DATE_TIME_UTC:
      if (value) {
        return formatDate(value, 'yyyy-MM-DD[T]HH:mm');
      }
      handleTextFieldChange(formatDate(new Date().toISOString(), 'yyyy-MM-DD[T]HH:mm'));
      return '';
    case ColumnDataType.BOOLEAN:
      return operator === CompareOperators.NONE
        ? ''
        : typeof value === 'boolean'
          ? value === true
            ? 'true'
            : 'false'
          : value;
    default:
      return operator === CompareOperators.NONE ? '' : value || '';
  }
};

export const DialogInput: React.FunctionComponent<IProps> = ({
  column,
  handleTextFieldChange,
  isPrimary,
}) => {
  const value =
    getValue(
      column.DataType,
      column.Filter.Operator,
      isPrimary ? column.Filter.Text : column.Filter.Argument[0],
      handleTextFieldChange,
    ) || '';
  const disabled = isPrimary
    ? column.Filter.Operator === CompareOperators.NONE
    : false;
  const label = isPrimary
    ? column.Filter.Operator !== CompareOperators.BETWEEN
      ? 'Value'
      : 'First Value'
    : 'Second Value';

  const handleChange = (e: any) => handleTextFieldChange(e.target.value);

  return (
    <TextField
      select={column.DataType === ColumnDataType.BOOLEAN}
      style={dropdown}
      id={column.Name}
      disabled={disabled}
      value={value}
      label={label}
      type={(ColumnDataTypeToHtmlType as any)[column.DataType]}
      onChange={handleChange}
    >
      {column.DataType === ColumnDataType.BOOLEAN &&
        BooleanInputOperators.map((option) => (
          <MenuItem key={option.Value} value={option.Value}>
            {option.Title}
          </MenuItem>
        ))}
    </TextField>
  );
};
