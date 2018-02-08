import * as PropTypes from 'prop-types';
import * as React from 'react';
import DateInput from './DateInput.js';
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
  handleBooleanDropDown(): void;
  handleDatePicker(): void;
  handleTextFieldChange(): void;
}

const DialogInput: React.SFC<IProps> = ({ classes, disabled, value, columnType, activeFilter, label,
  mod, handleApply, handleBooleanDropDown, handleDatePicker, handleTextFieldChange }) => {

    return (
      columnType === 'datetime' || columnType === 'date' || columnType === 'datetimeutc' ?
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
    columnType === 'boolean' ?
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
