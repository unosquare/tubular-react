import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ColumnDataType, CompareOperators } from './Column';
import Dropdown from './Dropdown';

const NumericOperators = [
  { Value: CompareOperators.NONE, Title: 'None' },
  { Value: CompareOperators.EQUALS, Title: 'Equals' },
  { Value: CompareOperators.BETWEEN, Title: 'Between' },
  { Value: CompareOperators.GTE, Title: '>=' },
  { Value: CompareOperators.GT, Title: '>' },
  { Value: CompareOperators.LTE, Title: '<=' },
  { Value: CompareOperators.LT, Title: '<' }
];

const StringOperators = [
  { Value: CompareOperators.NONE, Title: 'None' },
  { Value: CompareOperators.EQUALS, Title: 'Equals' },
  { Value: CompareOperators.NOT_EQUALS, Title: 'Not Equals' },
  { Value: CompareOperators.CONTAINS, Title: 'Contains' },
  { Value: CompareOperators.NOT_CONTAINS, Title: 'Not Contains' },
  { Value: CompareOperators.STARTS_WITH, Title: 'Starts With' },
  { Value: CompareOperators.NOT_STARTS_WITH, Title: 'Not Starts With' },
  { Value: CompareOperators.ENDS_WITH, Title: 'Ends With' },
  { Value: CompareOperators.NOT_ENDS_WITH, Title: 'Not Ends With' }
];

const BooleanOperators = [
  { Value: CompareOperators.NONE, Title: 'None' },
  { Value: CompareOperators.EQUALS, Title: 'Equals' },
  { Value: CompareOperators.NOT_EQUALS, Title: 'Not Equals' }
];

interface IProps {
  activeFilter: string;
  classes: any;
  columnType: string;
  value: string;
  handleChange(value: any): void;
}

const DialogDropdown: React.SFC<IProps> = ({ classes, value, columnType, activeFilter, handleChange }) => {
  const dropdownValue = value === undefined ? 'None' : value;
  let component;
  switch (columnType) {
  case ColumnDataType.STRING:
    return(
    <Dropdown
      disabled={false}
      operators={StringOperators}
      classes={classes}
      value={dropdownValue}
      activeFilter={activeFilter}
      handleChange={handleChange}
    />);
  case ColumnDataType.NUMERIC:
  case ColumnDataType.DATE:
  case ColumnDataType.DATE_TIME:
  case ColumnDataType.DATE_TIME_UTC:
    component = (
      <Dropdown
        disabled={false}
        operators={NumericOperators}
        classes={classes}
        value={dropdownValue}
        activeFilter={activeFilter}
        handleChange={handleChange}
      />
    );
    break;
  case ColumnDataType.BOOLEAN:
    component =
    (
      <Dropdown
        disabled={false}
        operators={BooleanOperators}
        classes={classes}
        value={dropdownValue}
        activeFilter={activeFilter}
        handleChange={handleChange}
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
