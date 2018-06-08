import { Input, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';

interface IProps {
  activeFilter: string;
  classes: any;
  disabled: boolean;
  operators: any[];
  value: any;
  handleChange(event: any): void;
}

const Dropdown: React.SFC<IProps> = ({ classes, disabled, value, handleChange, activeFilter, operators }) => (
  <div style={{ padding: '20px 20px 5px 20px' }}>
    <Select
      disabled={disabled}
      className={classes.dropdown}
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      input={<Input name={activeFilter} />}
    >
      {
        operators.map( (row: any, i: number) => (
          <MenuItem key={i} value={row.Value}>{row.Title}</MenuItem>
        ))
      }
    </Select>
  </div>
);

export default Dropdown;
