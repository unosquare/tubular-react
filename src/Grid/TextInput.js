import Input from 'material-ui/Input';
import PropTypes from 'prop-types';
import React from 'react';

const TextInput = ({ activeFilter, handleTextFieldChange, label, mod, value }) => (
  <div style={{ padding: '13px 15px 6px 10px' }}>
    <Input 
      style={{ minWidth: '300px' }} 
      id={activeFilter} 
      placeholder={label} 
      value={value} 
      onChange={handleTextFieldChange(mod)} />
    <br />
  </div>
);

TextInput.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  handleTextFieldChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired, 
  mod: PropTypes.string.isRequired, 
  value: PropTypes.string.isRequired
};

export default TextInput;