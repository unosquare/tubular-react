import * as React from 'react';
import { ColumnDataType } from './Column';
import DateInput from './DateInput';
import Dropdown from './Dropdown';
import TextField from '@material-ui/core/TextField';

const BooleanInputOperators = [
  { Value: 'true', Title: 'True' },
  { Value: 'false', Title: 'False' }
];

interface IProps {
  activeFilter: string;
  classes: any;
  columnType: string;
  disabled: boolean;
  label: string;
  mod: string;
  value: any;
  handleApply(): void; 
  handleTextFieldChange(event: any): void;
}

const ColumnDataTypeToHtmlType = {
  string: 'text',
  numeric: 'number',
  date:'date',
  datetime:'datetime-local',
  datetimeutc:'datetime-local'
};

const DialogInput: React.SFC<IProps> = ({ classes, disabled, value, columnType, activeFilter, label,
  mod, handleApply, handleTextFieldChange }) => {   
    console.log('dialogInput'); 
    console.log(value+' '+columnType+' '+label);
    return (
      columnType === ColumnDataType.BOOLEAN ?
      (
        <Dropdown
          disabled={disabled}
          value={typeof(value) === 'boolean' ? value === true ? 'true' : 'false' : value}
          operators={BooleanInputOperators}
          classes={classes}
          activeFilter={activeFilter}
          handleChange={handleTextFieldChange}
        />
      )
        :
          (
          <TextField
            id={activeFilter}
            disabled={disabled}
            value={value}
            label={label}
            type={(ColumnDataTypeToHtmlType as any)[columnType]} 
            onChange={handleTextFieldChange}
          />
          )
    );
  };

export default DialogInput;
