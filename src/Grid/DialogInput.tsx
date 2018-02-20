import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ColumnDataType } from './Column';
import DateInput from './DateInput';
import Dropdown from './Dropdown';
import TextInput from './TextInput';

const BooleanInputOperators = [
  { Value: '', Title: '' },
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
  value: string;
  handleApply(): void;
  handleBooleanDropDown(event: any): void;
  handleDatePicker(name: string): (event: any) => void;
  handleTextFieldChange(event: any, name: string): void;
}

const DialogInput: React.SFC<IProps> = ({ classes, disabled, value, columnType, activeFilter, label,
  mod, handleApply, handleBooleanDropDown, handleDatePicker, handleTextFieldChange }) => {

    return (
      columnType === ColumnDataType.DATE ||
      columnType === ColumnDataType.DATE_TIME ||
      columnType === ColumnDataType.DATE_TIME_UTC ?
      (
        <DateInput
          disabled={disabled}
          value={value}
          mod={mod}
          columnType={columnType}
          handleDatePicker={handleDatePicker}
        />
      )
      :
      columnType === ColumnDataType.BOOLEAN ?
      (
        <Dropdown
          disabled={disabled}
          value={value}
          operators={BooleanInputOperators}
          classes={classes}
          activeFilter={activeFilter}
          handleChange={handleBooleanDropDown}
        />
      )
        :
        (
        <TextInput
          disabled={disabled}
          value={value}
          label={label}
          mod={mod}
          activeFilter={activeFilter}
          handleApply={handleApply}
          handleTextFieldChange={handleTextFieldChange}
        />
        )
    );
  };

export default DialogInput;
