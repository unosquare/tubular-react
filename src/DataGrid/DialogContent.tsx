import Button from '@material-ui/core/Button';
import * as moment from 'moment';
import * as React from 'react';
import { ColumnDataType, CompareOperators } from './Column';
import DialogInput from './DialogInput';

interface IProps {
  classes: any;
  activeColumn: any;
  handleApply(): void;
  handleClear(): void; 
  handleTextFieldChange(event: any): void;
  handleSecondTextFieldChange(event: any): void;
}

const DialogContent: React.SFC<IProps> = ({
  classes, activeColumn, 
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
    <div >
      <DialogInput
        disabled={activeColumn.Filter.Operator === CompareOperators.NONE}
        value={firstValue}
        handleApply={handleApply}
        mod={'Value'}
        label={'Value'}
        classes={classes}
        columnType={activeColumn.DataType}
        activeFilter={activeColumn.Name} 
        handleTextFieldChange={handleTextFieldChange}
      />

      {activeColumn.Filter.Operator === CompareOperators.BETWEEN &&
        <DialogInput
          disabled={false}
          value={secondValue}
          handleApply={handleApply}
          mod={'Value2'}
          label={'Value 2'}
          classes={classes}
          columnType={activeColumn.DataType}
          activeFilter={activeColumn.Name}
          handleTextFieldChange={handleSecondTextFieldChange}
        />}

      <div style={{ padding: '20px 10px 15px 10px', textAlign: 'center' }}>
        <Button
          className={classes.applyButton}
          onClick={() => handleApply()}
          disabled={activeColumn.operator === CompareOperators.NONE}
          style={activeColumn.operator === CompareOperators.NONE ? { background: 'grey' } : {}}
        >
          Apply
        </Button>
        <Button className={classes.clearButton} onClick={() => handleClear()}>Clear</Button>
      </div>
    </div>
  );
};

export default DialogContent;
