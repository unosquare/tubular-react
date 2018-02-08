import * as PropTypes from 'prop-types';
import * as React from 'react';
import DateInput from './DateInput.js';
import Dropdown from './Dropdown.js';
import TextInput from './TextInput.tsx';

const BooleanInputOperators = [
  { Value: '', Title: '' },
  { Value: 'true', Title: 'True' },
  { Value: 'false', Title: 'False' }
];

const DialogInput = ({ classes, disabled, value, columnType, activeFilter, label, 
  mod, handleApply, handleBooleanDropDown, handleDatePicker, handleTextFieldChange }) => (
  columnType === 'datetime' || columnType === 'date' || columnType === 'datetimeutc' ? 
    <DateInput 
      disabled={disabled}
      value={value} 
      label={label} 
      mod={mod}
      columnType={columnType}
      handleDatePicker={handleDatePicker} />
    : 
    columnType === 'boolean' ? 
      <Dropdown 
        disabled={disabled}
        value={value} 
        operators={BooleanInputOperators} 
        classes={classes} 
        activeFilter={activeFilter} 
        handleChange={handleBooleanDropDown}/> 
      :
      <TextInput 
        disabled={disabled}
        value={value} 
        label={label} 
        mod={mod} 
        activeFilter={activeFilter}
        handleApply={handleApply}
        handleTextFieldChange={handleTextFieldChange}/>
);

DialogInput.propTypes = {
  activeFilter: PropTypes.string.isRequired, 
  classes: PropTypes.object.isRequired,
  columnType: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleBooleanDropDown: PropTypes.func.isRequired,
  handleDatePicker: PropTypes.func.isRequired,
  handleTextFieldChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired, 
  mod: PropTypes.string.isRequired, 
  value: PropTypes.string.isRequired
};

export default DialogInput;