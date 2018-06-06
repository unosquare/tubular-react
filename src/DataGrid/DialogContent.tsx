import Button from '@material-ui/core/Button';
import * as moment from 'moment';
import * as React from 'react';
import { ColumnDataType, CompareOperators } from './Column';
import DialogInput from './DialogInput';

const clearButton= {
  background: '#ff4136',
  color: 'white'
}
const applyButton= {
  background: '#28b62c',
  color: 'white',
  marginRight: '30px'
}
const applyButtonDisable= {
  background: 'grey',
  color: 'white',
  marginRight: '30px'
}
const wrapperInput={ padding: '15px 20px 5px 20px' }

interface IProps {
  activeColumn: any;
  handleApply(): void;
  handleClear(): void; 
  handleTextFieldChange(event: any): void;
  handleSecondTextFieldChange(event: any): void;
}

const DialogContent: React.SFC<IProps> = ({ activeColumn, 
  handleTextFieldChange, handleApply,
  handleClear, handleSecondTextFieldChange }) => {
  let firstValue;
  let secondValue;
  
  switch (activeColumn.DataType) {
  case ColumnDataType.DATE:
  case ColumnDataType.DATE_TIME:
  case ColumnDataType.DATE_TIME_UTC:
    firstValue = activeColumn.Filter.Text ? activeColumn.Filter.Text : moment().format();
    secondValue = activeColumn.Filter.Argument[0] ? activeColumn.Filter.Argument[0] : moment().format();
    break;
  case ColumnDataType.BOOLEAN:
    firstValue = activeColumn.Filter.Operator === CompareOperators.NONE ? '' : activeColumn.Filter.Text;
    break;
  default:
    firstValue = activeColumn.Filter.Operator === CompareOperators.NONE ? '' : activeColumn.Filter.Text || '';
    secondValue = activeColumn.Filter.Argument[0] || '';
  } 
  return (
    <div style={wrapperInput}>
      <DialogInput
        disabled={activeColumn.Filter.Operator === CompareOperators.NONE}
        value={firstValue}
        handleApply={handleApply}
        label={'Value'}
        columnType={activeColumn.DataType}
        activeFilter={activeColumn.Name} 
        handleTextFieldChange={handleTextFieldChange}
      />

      {activeColumn.Filter.Operator === CompareOperators.BETWEEN &&
        <DialogInput
          disabled={false}
          value={secondValue}
          handleApply={handleApply}
          label={'Value 2'}
          columnType={activeColumn.DataType}
          activeFilter={activeColumn.Name}
          handleTextFieldChange={handleSecondTextFieldChange}
        />}

      <div style={{ padding: '20px 10px 15px 10px', textAlign: 'center' }}>
        <Button
          onClick={() => handleApply()}
          disabled={activeColumn.Filter.Operator === CompareOperators.NONE}
          style={activeColumn.Filter.Operator === CompareOperators.NONE ? applyButtonDisable : applyButton}
        >
          Apply
        </Button>
        <Button style={clearButton} onClick={() => handleClear()}>Clear</Button>
      </div>
    </div>
  );
};

export default DialogContent;
