import Input from 'material-ui/Input';
import React from 'react';

class TextInput extends React.Component {
  render(){
    return(
      <div style={{ padding: '13px 15px 6px 10px' }}>
        <Input 
          style={{ minWidth: '300px' }} 
          id={this.props.activeFilter} 
          placeholder={this.props.label} 
          value={this.props.value} 
          onChange={this.props.handleTextFieldChange(this.props.mod)} />
        <br />
      </div>
    );
  }
}

export default TextInput;