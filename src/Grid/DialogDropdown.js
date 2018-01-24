import Dropdown from './Dropdown.js';
import Input from 'material-ui/Input';
import React from 'react';

const NumericOperators = [
  { Value: 'None', Title: 'None' },
  { Value: 'Equals', Title: 'Equals' },
  { Value: 'Between', Title: 'Between' },
  { Value: 'Gte', Title: '>=' },
  { Value: 'Gt', Title: '>' },
  { Value: 'Lte', Title: '<=' },
  { Value: 'Lt', Title: '<' }
];
  
const StringOperators = [
  { Value: 'None', Title: 'None' },
  { Value: 'Equals', Title: 'Equals' },
  { Value: 'NotEquals', Title: 'Not Equals' },
  { Value: 'Contains', Title: 'Contains' },
  { Value: 'StartsWith', Title: 'Starts With' },
  { Value: 'NotStartsWith', Title: 'Not Starts With' },
  { Value: 'EndsWith', Title: 'Ends With' },
  { Value: 'NotEndsWith', Title: 'Not Ends With' },
];
  
const BooleanOperators = [
  { Value: 'None', Title: 'None' },
  { Value: 'Equals', Title: 'Equals' },
  { Value: 'NotEquals', Title: 'Not Equals' }
];

class DialogDropdown extends React.Component {
  render(){
    const value = this.props.value === undefined ? 'None' : this.props.value;
    
    if (this.props.columnType === 'string') {
      return (<Dropdown operators={StringOperators} classes={this.props.classes} value={value} activeFilter={this.props.activeFilter} handleChange={this.props.handleChange}/>);
    }
    else if (this.props.columnType === 'numeric' || this.props.columnType === 'datetime' || this.props.columnType === 'date' || this.props.columnType === 'datetimeutc') {
      return (<Dropdown operators={NumericOperators} classes={this.props.classes} value={value} activeFilter={this.props.activeFilter} handleChange={this.props.handleChange}/>);
    }
    else if(this.props.columnType === 'boolean'){
      return (<Dropdown operators={BooleanOperators} classes={this.props.classes} value={value} activeFilter={this.props.activeFilter} handleChange={this.props.handleChange}/>);
    }
    else {
      return (null);
    }
  }
}

export default DialogDropdown;