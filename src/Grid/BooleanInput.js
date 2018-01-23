import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import React from 'react';
import Select from 'material-ui/Select';

class BooleanInput extends React.Component {
  render(){
    return(
      <div style={{ padding: '13px 15px 6px 10px' }}>
        <Select
          style={{ minWidth: '300px' }}
          className={this.props.classes.dropdown}
          value={this.props.value}
          onChange={this.props.handleBooleanDropDown}
          input={<Input name={this.props.activeFilter} />}
        >
          <MenuItem value={''}></MenuItem>
          <MenuItem value={'true'}>True</MenuItem>
          <MenuItem value={'false'}>False</MenuItem>
        </Select>
      </div>
    );
  }
}

export default BooleanInput;