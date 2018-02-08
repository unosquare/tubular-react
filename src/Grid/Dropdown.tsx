import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import * as PropTypes from 'prop-types';
import * as React from 'react';
interface IProps {
  activeFilter: string;
  classes: any;
  disabled: boolean;
  operators: any[];
  value: string;
  handleChange(): void;
}

const Dropdown: React.SFC<IProps> = ({ classes, disabled, value, handleChange, activeFilter, operators }) => (
  <div style={{ padding: '20px 20px 5px 20px' }}>
    <Select
      disabled={disabled}
      className={classes.dropdown}
      value={value}
      onChange={handleChange}
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
