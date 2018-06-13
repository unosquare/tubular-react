import * as moment from 'moment';
import * as React from 'react';

import { MenuItem, TextField } from '@material-ui/core';

import { ColumnDataType, CompareOperators } from './Models/Column';

const dropdown = {
  marginLeft: '10%',
  marginTop: '5%',
  width: '80%',
};

const BooleanInputOperators = [
  { Value: 'true', Title: 'True' },
  { Value: 'false', Title: 'False' }
];

interface IProps {
  isPrimary: boolean;
  column: any;
  handleTextFieldChange(event: any): void;
}

const ColumnDataTypeToHtmlType = {
  boolean: 'boolean',
  date: 'date',
  datetime: 'datetime-local',
  datetimeutc: 'datetime-local',
  numeric: 'number',
  string: 'text'
};

const getValue = (dataType: ColumnDataType, operator: CompareOperators, value: string) => {
  switch (dataType) {
    case ColumnDataType.DATE:
      return value ? moment(value).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    case ColumnDataType.DATE_TIME:
    case ColumnDataType.DATE_TIME_UTC:
      return value ? moment(value).format('YYYY-MM-DD[T]HH:mm') : moment().format('YYYY-MM-DD[T]HH:mm');
    case ColumnDataType.BOOLEAN:
      return operator === CompareOperators.NONE ? '' : value;
    default:
      return operator === CompareOperators.NONE ? '' : (value || '');
  }
};

const DialogInput: React.SFC<IProps> = ({ column, handleTextFieldChange, isPrimary }) => {
  const value = getValue(column.DataType, column.Operator, isPrimary ? column.Filter.Text : column.Filter.Argument[0]);
  const disabled = isPrimary ? column.Filter.Operator === CompareOperators.NONE : false;
  const label = isPrimary ? column.activeColumn.Filter.Operator !== CompareOperators.BETWEEN ? 'Value' : 'First Value' : 'Second Value';

  return (
    column.DataType === ColumnDataType.BOOLEAN ?
      (
        <TextField
          select={true}
          style={dropdown}
          label={label}
          value={typeof (value) === 'boolean' ? value === true ? 'true' : 'false' : value}
          onChange={handleTextFieldChange}
        >
          {BooleanInputOperators.map((option) => (
            <MenuItem key={option.Value} value={option.Value}>
              {option.Title}
            </MenuItem>
          ))}
        </TextField>
      )
      :
      (
        <TextField
          style={dropdown}
          id={column.Name}
          disabled={disabled}
          value={value}
          defaultValue={value}
          label={label}
          type={(ColumnDataTypeToHtmlType as any)[column.DataType]}
          onChange={handleTextFieldChange}
        />
      )
  );
};

export default DialogInput;
