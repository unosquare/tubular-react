import * as React from 'react';
import { ColumnDataType } from './Column';
import DateInput from './DateInput';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import { MenuItem } from '@material-ui/core';

const textField= {
  width: '80%',
  marginLeft: '10%',
};

const dropdown= {
  width: '80%',
  marginLeft: '10%'
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
  string: 'text',
  numeric: 'number',
  date:'date',
  datetime:'datetime-local',
  datetimeutc:'datetime-local',
  boolean:'boolean'
};

const DialogInput: React.SFC<IProps> = ({ disabled, value, columnType, activeFilter, label,
  handleApply, handleTextFieldChange }) => {   
    ((ColumnDataTypeToHtmlType as any)[columnType]).includes('datetime')? value=moment(value).format('YYYY-MM-DD[T]HH:mm')
    : ((ColumnDataTypeToHtmlType as any)[columnType]).includes('date')? value=moment(value).format('YYYY-MM-DD'): value;
     return (
      columnType === ColumnDataType.BOOLEAN ?
      (
        <TextField
          select
          style={dropdown}
          label={label}
          value={typeof(value)==='boolean' ? value === true ? 'true' : 'false': value}
          onChange={handleTextFieldChange}
        >
          {BooleanInputOperators.map(option => (
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
