import Input from 'material-ui/Input';
import PropTypes from 'prop-types';
import React from 'react';

const TextInput = ({ activeFilter, disabled, handleApply, handleTextFieldChange, label, mod, value }) => (
  <div style={{ padding: '15px 20px 5px 20px' }}>
    <Input 
      disabled={disabled}
      style={{ width: '100%' }} 
      id={activeFilter} 
      placeholder={label} 
      value={value} 
      onKeyUp={ e => e.key === 'Enter' && handleApply()}
      onChange={handleTextFieldChange(mod)} />
    <br />
  </div>
);

TextInput.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleTextFieldChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired, 
  mod: PropTypes.string.isRequired, 
  value: PropTypes.string.isRequired
};

export default TextInput;