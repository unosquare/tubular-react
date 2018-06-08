import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { ColumnDataType, CompareOperators } from './Column';
import DialogInput from './DialogInput';

interface IProps {
  activeFilter: string;
  classes: any;
  columnType: string;
  operator: string;
  value: any;
  value2: any;
  handleApply(): void;
  handleClear(): void;
  handleDatePicker(event: any, name: string): void;
  handleTextFieldChange(event: any): void;
  handleSecondTextFieldChange(event: any): void;
}

const DialogContent: React.SFC<IProps> = ({
  classes, value, value2, columnType, activeFilter, operator,
  handleDatePicker, handleTextFieldChange, handleApply,
  handleClear, handleSecondTextFieldChange }) => {
  let firstValue;
  let secondValue;

  switch (columnType) {
  case ColumnDataType.DATE:
  case ColumnDataType.DATE_TIME:
  case ColumnDataType.DATE_TIME_UTC:
    firstValue = value ? value : moment().format();
    secondValue = value2 ? value2 : moment().format();
    break;
  case ColumnDataType.BOOLEAN:
    firstValue = operator === CompareOperators.NONE ? '' : value;
    break;
  default:
    firstValue = operator === CompareOperators.NONE ? '' : value || '';
    secondValue = value2 || '';
  }

  return (
    <div >
      <DialogInput
        disabled={operator === CompareOperators.NONE}
        value={firstValue}
        handleApply={handleApply}
        mod={'Value'}
        label={'Value'}
        classes={classes}
        columnType={columnType}
        activeFilter={activeFilter}
        handleDatePicker={handleDatePicker}
        handleTextFieldChange={handleTextFieldChange}
      />

      {operator === CompareOperators.BETWEEN &&
        <DialogInput
          disabled={false}
          value={secondValue}
          handleApply={handleApply}
          mod={'Value2'}
          label={'Value 2'}
          classes={classes}
          columnType={columnType}
          activeFilter={activeFilter}
          handleDatePicker={handleDatePicker}
          handleTextFieldChange={handleSecondTextFieldChange}
        />}

      <div style={{ padding: '20px 10px 15px 10px', textAlign: 'center' }}>
        <Button
          className={classes.applyButton}
          onClick={() => handleApply()}
          disabled={operator === CompareOperators.NONE}
          style={operator === CompareOperators.NONE ? { background: 'grey' } : {}}
        >
          Apply
        </Button>
        <Button className={classes.clearButton} onClick={() => handleClear()}>Clear</Button>
      </div>
    </div>
  );
};

export default DialogContent;
