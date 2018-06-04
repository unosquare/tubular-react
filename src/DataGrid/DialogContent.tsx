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

  switch (activeColumn.columnType) {
  case ColumnDataType.DATE:
  case ColumnDataType.DATE_TIME:
  case ColumnDataType.DATE_TIME_UTC:
    firstValue = activeColumn.value ? activeColumn.value : moment().format();
    secondValue = activeColumn.value2 ? activeColumn.value2 : moment().format();
    break;
  case ColumnDataType.BOOLEAN:
    firstValue = activeColumn.operator === CompareOperators.NONE ? '' : activeColumn.value;
    break;
  default:
    firstValue = activeColumn.operator === CompareOperators.NONE ? '' : activeColumn.value || '';
    secondValue = activeColumn.value2 || '';
  }

  return (
    <div >
      <DialogInput
        disabled={activeColumn.operator === CompareOperators.NONE}
        value={firstValue}
        handleApply={handleApply}
        mod={'Value'}
        label={'Value'}
        classes={classes}
        columnType={activeColumn.columnType}
        activeFilter={activeColumn.activeFilter} 
        handleTextFieldChange={handleTextFieldChange}
      />

      {activeColumn.operator === CompareOperators.BETWEEN &&
        <DialogInput
          disabled={false}
          value={secondValue}
          handleApply={handleApply}
          mod={'Value2'}
          label={'Value 2'}
          classes={classes}
          columnType={activeColumn.columnType}
          activeFilter={activeColumn.activeFilter}
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
