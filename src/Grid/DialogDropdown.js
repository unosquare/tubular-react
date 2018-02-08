import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Dropdown from './Dropdown.tsx';

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
  { Value: 'NotEndsWith', Title: 'Not Ends With' }
];
  
const BooleanOperators = [
  { Value: 'None', Title: 'None' },
  { Value: 'Equals', Title: 'Equals' },
  { Value: 'NotEquals', Title: 'Not Equals' }
];

const DialogDropdown = ({ classes, value, columnType, activeFilter, handleChange }) => {
  const dropdownValue = value === undefined ? 'None' : value;
  let component;

  switch (columnType){
  case 'string':
    component = <Dropdown disabled={false} operators={StringOperators} classes={classes} value={dropdownValue} activeFilter={activeFilter} handleChange={handleChange}/>;
    break;
  case 'numeric':
  case 'datetime':
  case 'date':
  case 'datetimeutc':
    component = <Dropdown disabled={false} operators={NumericOperators} classes={classes} value={dropdownValue} activeFilter={activeFilter} handleChange={handleChange}/>;
    break;
  case 'boolean':
    component = <Dropdown disabled={false} operators={BooleanOperators} classes={classes} value={dropdownValue} activeFilter={activeFilter} handleChange={handleChange}/>;
    break;
  default: 
    component = null;
    break;
  }

  return component;
};

DialogDropdown.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  columnType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default DialogDropdown;