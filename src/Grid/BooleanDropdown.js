import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import React from 'react';
import Select from 'material-ui/Select';

class BooleanDropdown extends React.Component {
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
        </Select>
      </div>
    );
  }
}

export default BooleanDropdown;