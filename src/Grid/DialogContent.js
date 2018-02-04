import Button from 'material-ui/Button';
import DialogInput from './DialogInput.js';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

const DialogContent = ({ classes, value, value2, columnType, activeFilter, operator,
  handleDatePicker, handleBooleanDropDown, handleTextFieldChange, handleApply, handleClear }) => {
  let firstValue = '';
  let secondValue = '';

  switch (columnType){
  case 'datetime':
  case 'date':
  case 'datetimeutc':
    firstValue = value ? value : moment().format();
    secondValue = value2 ? value2 : moment().format();
    break;
  case 'boolean':
    firstValue = value || '';
    break;
  default:
    firstValue = value || '';
    secondValue = value2 || '';
  }
  
  return (
    <div >
      <DialogInput
        value={firstValue} 
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
          value={secondValue} 
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
        <Button className={classes.applyButton} onClick={() => handleApply()}>Apply</Button>
        <Button className={classes.clearButton} onClick={() => handleClear()}>Clear</Button>
      </div>
    </div>
  );
};

DialogContent.propTypes = {
  activeFilter: PropTypes.string.isRequired, 
  classes: PropTypes.object.isRequired,
  columnType: PropTypes.string.isRequired,
  handleApply: PropTypes.func.isRequired,
  handleBooleanDropDown: PropTypes.func.isRequired, 
  handleClear: PropTypes.func.isRequired,
  handleDatePicker: PropTypes.func.isRequired, 
  handleTextFieldChange: PropTypes.func.isRequired
};

export default DialogContent;