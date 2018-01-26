import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'material-ui/Select';

const Dropdown = ({ classes, value, handleChange, activeFilter, operators }) => (
  <div style={{ padding: '13px 15px 6px 10px' }}>
    <Select
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
  operators: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired
};

export default Dropdown;