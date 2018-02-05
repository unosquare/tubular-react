import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'material-ui/Select';

const Dropdown = ({ classes, disabled, value, handleChange, activeFilter, operators }) => (
  <div style={{ padding: '20px 20px 5px 20px' }}>
    <Select
      disabled={disabled}
      className={classes.dropdown}
      value={value}
      onChange={handleChange}
      input={<Input name={activeFilter} />}
    >
      {
        operators.map( (row, i) => (
          <MenuItem key={i} value={row.Value}>{row.Title}</MenuItem>
        ))
      }
    </Select>
  </div>
);

Dropdown.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  operators: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired
};

export default Dropdown;