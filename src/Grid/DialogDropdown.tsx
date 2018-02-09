import * as PropTypes from 'prop-types';
import * as React from 'react';
import Dropdown from './Dropdown';

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

interface IProps {
  activeFilter: string;
  classes: any;
  columnType: string;
  value: string;
  handleChange(event: any, value: any): void;
}

const DialogDropdown: React.SFC<IProps> = ({ classes, value, columnType, activeFilter, handleChange }) => {
  const handleDropdownChange = (ev: any) => {
    handleChange(ev.target.name, ev.target.value);
  };
  const dropdownValue = value === undefined ? 'None' : value;
  let component;
  switch (columnType) {
  case 'string':
    return(
    <Dropdown
      disabled={false}
      operators={StringOperators}
      classes={classes}
      value={dropdownValue}
      activeFilter={activeFilter}
      handleChange={handleDropdownChange}
    />);
  case 'numeric':
  case 'datetime':
  case 'date':
  case 'datetimeutc':
    component = (
    <Dropdown
      disabled={false}
      operators={NumericOperators}
      classes={classes}
      value={dropdownValue}
      activeFilter={activeFilter}
      handleChange={handleDropdownChange}
    />
  );
    break;
  case 'boolean':
    component =
    (
      <Dropdown
        disabled={false}
        operators={BooleanOperators}
        classes={classes}
        value={dropdownValue}
        activeFilter={activeFilter}
        handleChange={handleDropdownChange}
      />
    );
    break;
  default:
    component = null;
    break;
  }

  return component;
};

export default DialogDropdown;
