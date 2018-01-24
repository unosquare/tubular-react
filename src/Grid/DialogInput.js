import DateInput from './DateInput.js';
import Dropdown from './Dropdown.js';
import React from 'react';
import TextInput from './TextInput.js';

const BooleanInputOperators = [
  { Value: '', Title: '' },
  { Value: 'true', Title: 'True' },
  { Value: 'false', Title: 'False' }
];

class DialogInput extends React.Component {
  render(){
    return(
      this.props.columnType === 'datetime' || this.props.columnType === 'date' || this.props.columnType === 'datetimeutc' ? 
        <DateInput 
          value={this.props.value} 
          label={this.props.label} 
          mod={this.props.mod}
          columnType={this.props.columnType}
          handleDatePicker={this.props.handleDatePicker} />
        : this.props.columnType === 'boolean' ? 
          <Dropdown 
            value={this.props.value} 
            operators={BooleanInputOperators} 
            classes={this.props.classes} 
            activeFilter={this.props.activeFilter} 
            handleChange={this.props.handleBooleanDropDown}/> 
          :
          <TextInput 
            value={this.props.value} 
            label={this.props.label} 
            mod={this.props.mod} 
            activeFilter={this.props.activeFilter}
            handleTextFieldChange={this.props.handleTextFieldChange}/>
    );
  }
}

export default DialogInput;