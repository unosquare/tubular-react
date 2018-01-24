import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import React from 'react';
import Select from 'material-ui/Select';

class Dropdown extends React.Component {
  render(){
    return(
      <div style={{ padding: '13px 15px 6px 10px' }}>
        <Select
          className={this.props.classes.dropdown}
          value={this.props.value}
          onChange={this.props.handleChange}
          input={<Input name={this.props.activeFilter} />}
        >
          {
            this.props.operators.map( (row, i) => (
              <MenuItem key={i} value={row.Value}>{row.Title}</MenuItem>
            ))
          }
        </Select>
      </div>
    );
  }
}

export default Dropdown;