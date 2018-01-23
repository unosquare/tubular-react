import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import React from 'react';
import Select from 'material-ui/Select';

class NumericDropdown extends React.Component {
  render(){
    return(
      <div style={{ padding: '13px 15px 6px 10px' }}>
        <Select
          className={this.props.classes.dropdown}
          value={this.props.value}
          onChange={this.props.handleChange}
          input={<Input name={this.props.activeFilter} />}
        >
          <MenuItem value={'None'}>None</MenuItem>
          <MenuItem value={'Equals'}>Equals</MenuItem>
          <MenuItem value={'Between'}>Between</MenuItem>
          <MenuItem value={'Gte'}>>=</MenuItem>
          <MenuItem value={'Gt'}>></MenuItem>
          <MenuItem value={'Lte'}>&#60;=</MenuItem>
          <MenuItem value={'Lt'}>&#60;</MenuItem>
        </Select>
      </div>
    );
  }
}

export default NumericDropdown;