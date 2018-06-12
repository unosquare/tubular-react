import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import DialogInput from './DialogInput';
import { ColumnDataType, CompareOperators } from './Models/Column';
import OperatorsDropdown from './OperatorsDropdown';

import * as moment from 'moment';
import * as React from 'react';

interface IProps {
  activeColumn: any;
  handleApply(): void;
  handleClear(): void;
  handleTextFieldChange(event: any): void;
  handleSecondTextFieldChange(event: any): void;
  handleClose(): void;
}
let firstValue: any;
let secondValue: any;
const setInitialValues = ( activeColumn: any) => {
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
};
const DialogModal: React.SFC<IProps> = ({
    activeColumn,  handleClose, handleApply, handleClear, handleTextFieldChange,
    handleSecondTextFieldChange}) => {

    if ( activeColumn == null ) { return null; }
    setInitialValues(activeColumn);
    return (
        <Dialog open={activeColumn != null} onClose={handleClose} >
            <DialogTitle>{'Filter'}</DialogTitle>
            <DialogContent>
                <OperatorsDropdown />
                <DialogInput
                    disabled={activeColumn.Filter.Operator === CompareOperators.NONE}
                    value={firstValue}
                    handleApply={handleApply}
                    label={activeColumn.Filter.Operator !== CompareOperators.BETWEEN ? 'Value' : 'First Value'}
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
                    <Button size='medium' color='secondary' onClick={() => handleClear()}>Clear</Button>
                    <Button
                        size='medium'
                        color='primary'
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
