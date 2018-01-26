import DateInput from './DateInput.js';
import Dropdown from './Dropdown.js';
import PropTypes from 'prop-types';
import React from 'react';
import TextInput from './TextInput.js';

const BooleanInputOperators = [
  { Value: '', Title: '' },
  { Value: 'true', Title: 'True' },
  { Value: 'false', Title: 'False' }
];

const DialogInput = ({ classes, value, columnType, activeFilter, label, 
  mod, handleBooleanDropDown, handleDatePicker, handleTextFieldChange }) => (
  columnType === 'datetime' || columnType === 'date' || columnType === 'datetimeutc' ? 
    <DateInput 
      value={value} 
      label={tabel} 
      mod={mod}
      columnType={columnType}
      handleDatePicker={handleDatePicker} />
    : 
    columnType === 'boolean' ? 
      <Dropdown 
        value={value} 
        operators={BooleanInputOperators} 
        classes={classes} 
        activeFilter={activeFilter} 
        handleChange={handleBooleanDropDown}/> 
      :
      <TextInput 
        value={value} 
        label={label} 
        mod={mod} 
        activeFilter={activeFilter}
        handleTextFieldChange={handleTextFieldChange}/>
);

DialogInput.propTypes = {
  activeFilter: PropTypes.string.isRequired, 
  classes: PropTypes.object.isRequired,
  columnType: PropTypes.string.isRequired,
  handleBooleanDropDown: PropTypes.func.isRequired,
  handleDatePicker: PropTypes.func.isRequired,
  handleTextFieldChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired, 
  mod: PropTypes.string.isRequired, 
  value: PropTypes.string.isRequired
};

export default DialogInput;