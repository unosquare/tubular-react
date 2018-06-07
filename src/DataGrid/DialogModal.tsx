import { Dialog, DialogTitle } from '@material-ui/core';
import { StyleRules, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogInput from './DialogInput';
import OperatorsDropdown from './OperatorsDropdown';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ColumnDataType, CompareOperators } from './Column';
import * as React from 'react';
import * as moment from 'moment';

interface IProps {
  activeColumn:any;
  handleChange(value: any): void;
  handleApply(): void;
  handleClear(): void; 
  handleTextFieldChange(event: any): void;
  handleSecondTextFieldChange(event: any): void;
  handleClose(): void;
}
var firstValue:any;
var secondValue: any;
const setInitialValues=( activeColumn:any) =>{
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
}
const DialogModal: React.SFC<IProps> = ({activeColumn, handleChange, handleClose, handleApply, handleClear, handleTextFieldChange, handleSecondTextFieldChange }) => {
    if(activeColumn==null) return null;
        
    setInitialValues(activeColumn)
    return (
        <Dialog open={activeColumn != null} onClose={handleClose} >
            <DialogTitle 
            >{'Filter'}
            </DialogTitle>
            <DialogContent>
                <OperatorsDropdown
                    activeColumn={activeColumn}
                    handleChange={handleChange}
                />
                <DialogInput
                    disabled={activeColumn.Filter.Operator === CompareOperators.NONE}
                    value={firstValue}
                    handleApply={handleApply}
                    label={activeColumn.Filter.Operator != CompareOperators.BETWEEN ? 'Value' : 'First Value'}
                    columnType={activeColumn.DataType}
                    activeFilter={activeColumn.Name}
                    handleTextFieldChange={handleTextFieldChange}
                />

                {activeColumn.Filter.Operator === CompareOperators.BETWEEN &&
                    <DialogInput
                        disabled={false}
                        value={secondValue}
                        handleApply={handleApply}
                        label={'Second Value'}
                        columnType={activeColumn.DataType}
                        activeFilter={activeColumn.Name}
                        handleTextFieldChange={handleSecondTextFieldChange}
                    />}

                <DialogActions>
                    <Button size="medium" color="secondary"
                        onClick={() => handleClear()}>Clear</Button>
                    <Button
                        size="medium" color="primary"
                        onClick={() => handleApply()}
                        disabled={activeColumn.Filter.Operator === CompareOperators.NONE}
                    >
                        Apply
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
      );
  };
  
  
  export default DialogModal;
  

