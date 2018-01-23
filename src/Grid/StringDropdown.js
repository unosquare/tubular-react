import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import React from 'react';
import Select from 'material-ui/Select';

class StringDropdown extends React.Component {
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
          <MenuItem value={'NotEquals'}>Not Equals</MenuItem>
          <MenuItem value={'Contains'}>Contains</MenuItem>
          <MenuItem value={'NotContains'}>Not Contains</MenuItem>
          <MenuItem value={'StartsWith'}>Starts With</MenuItem>
          <MenuItem value={'NotStartsWith'}>Not Starts With</MenuItem>
          <MenuItem value={'EndsWith'}>Ends With</MenuItem>
          <MenuItem value={'NotEndsWith'}>Not Ends With</MenuItem>
        </Select>
      </div>
    );
  }
}

export default StringDropdown;