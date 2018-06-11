import * as moment from 'moment';
import * as React from 'react';

import { MenuItem, TextField } from '@material-ui/core';

import { ColumnDataType } from './Models/Column';

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
  activeFilter: string;
  columnType: string;
  disabled: boolean;
  label: string;
  value: any;
  handleApply(): void;
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

const DialogInput: React.SFC<IProps> = ({disabled, value, columnType, activeFilter, label, handleTextFieldChange}) => {
  ((ColumnDataTypeToHtmlType as any)[columnType]).includes('datetime') ?
      value = moment(value).format('YYYY-MM-DD[T]HH:mm')
    : ((ColumnDataTypeToHtmlType as any)[columnType]).includes('date') ?
        value = moment(value).format('YYYY-MM-DD') : value = value;
  return (
    columnType === ColumnDataType.BOOLEAN ?
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
          id={activeFilter}
          disabled={disabled}
          value={value}
          defaultValue={value}
          label={label}
          type={(ColumnDataTypeToHtmlType as any)[columnType]}
          onChange={handleTextFieldChange}
        />
      )
  );
};

export default DialogInput;
