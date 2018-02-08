import Button from 'material-ui/Button';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import DialogInput from './DialogInput';

interface IProps {
  activeFilter: string;
  classes: any;
  columnType: string;
  operator: string;
  value: any;
  value2: any;
  handleApply(): void;
  handleBooleanDropDown(): void;
  handleClear(): void;
  handleDatePicker(): void;
  handleTextFieldChange(): void;
}

const DialogContent: React.SFC<IProps> = ({ classes, value, value2, columnType, activeFilter, operator,
  handleDatePicker, handleBooleanDropDown, handleTextFieldChange, handleApply, handleClear }) => {
  let firstValue = '';
  let secondValue = '';

  switch (columnType) {
  case 'datetime':
  case 'date':
  case 'datetimeutc':
    firstValue = value ? value : moment().format();
    secondValue = value2 ? value2 : moment().format();
    break;
  case 'boolean':
    firstValue = operator === 'None' ? '' : value || '';
    break;
  default:
    firstValue = operator === 'None' ? '' : value || '';
    secondValue = value2 || '';
  }

  return (
    <div >
      <DialogInput
        disabled={operator === 'None'}
        value={firstValue}
        handleApply={handleApply}
        mod={'Value'}
        label={'Value'}
        classes={classes}
        columnType={columnType}
        activeFilter={activeFilter}
        handleDatePicker={handleDatePicker}
        handleBooleanDropDown={handleBooleanDropDown}
        handleTextFieldChange={handleTextFieldChange}
      />

      {operator === 'Between' &&
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
          handleBooleanDropDown={handleBooleanDropDown}
          handleTextFieldChange={handleTextFieldChange}
        />}

      <div style={{ padding: '20px 10px 15px 10px', textAlign: 'center' }}>
        <Button
          className={classes.applyButton}
          onClick={() => handleApply()}
          disabled={operator === 'None'}
          style={operator === 'None' ? { background: 'grey' } : {}}
        >
          Apply
        </Button>
        <Button className={classes.clearButton} onClick={() => handleClear()}>Clear</Button>
      </div>
    </div>
  );
};

export default DialogContent;
