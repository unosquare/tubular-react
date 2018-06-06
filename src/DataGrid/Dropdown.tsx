import { MenuItem } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import * as React from 'react';

const dropdown= {
  width: '80%',
  marginLeft: '10%',
  marginTop: '5%'
};
const wrapperSelect={ padding: '20px 20px 5px 20px' }

interface IProps {
  activeFilter: string;
  disabled: boolean;
  operators: any[];
  value: any;
  handleChange(event: any): void;
}

const Dropdown: React.SFC<IProps> = ({disabled, value, handleChange, activeFilter, operators }) => (
   <div style={wrapperSelect}>
    <Select
      disabled={disabled}
      style={dropdown}
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
