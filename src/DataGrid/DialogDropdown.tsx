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
  classes: any;
  activeColumn:any;
  handleChange(value: any): void;
}

const getOperators = (DataType:any) =>{
  
      switch (DataType) {
      case ColumnDataType.STRING:
        return StringOperators
      case ColumnDataType.NUMERIC:
      case ColumnDataType.DATE:
      case ColumnDataType.DATE_TIME:
      case ColumnDataType.DATE_TIME_UTC:
        return NumericOperators
      case ColumnDataType.BOOLEAN:
        return BooleanOperators
      default:
        return [];
      }
}

const DialogDropdown: React.SFC<IProps> = ({ classes, activeColumn, handleChange }) => {
  const dropdownValue = activeColumn.Filter.Operator === '' ? 'None' : activeColumn.Filter.Operator;
  
  return (
      <Dropdown
        disabled={false}
        operators={getOperators(activeColumn.DataType)}
        classes={classes}
        value={dropdownValue}
        activeFilter={activeColumn.Name}
        handleChange={handleChange}
      />
    );
};


export default DialogDropdown;
