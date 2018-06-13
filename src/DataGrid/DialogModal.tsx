import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import DialogInput from './DialogInput';
import { ColumnDataType, CompareOperators } from './Models/Column';
import OperatorsDropdown from './OperatorsDropdown';

import * as moment from 'moment';
import * as React from 'react';
import { GridConsumer } from './GridContext';

interface IProps {
  handleApply(): void;
  handleClear(): void;
}

const setInitialValues = ( activeColumn: any) => {
    switch (activeColumn.DataType) {
      case ColumnDataType.DATE:
      case ColumnDataType.DATE_TIME:
      case ColumnDataType.DATE_TIME_UTC:
      return{
        firstValue: activeColumn.Filter.Text ? activeColumn.Filter.Text : moment().format(),
        secondValue: activeColumn.Filter.Argument[0] ? activeColumn.Filter.Argument[0] : moment().format()
      };
      case ColumnDataType.BOOLEAN:
      return {
        firstValue: activeColumn.Filter.Operator === CompareOperators.NONE ? '' : activeColumn.Filter.Text
        };
      default:
      return {
        firstValue: activeColumn.Filter.Operator === CompareOperators.NONE ? '' : activeColumn.Filter.Text || '',
        secondValue: activeColumn.Filter.Argument[0] || ''
      };
    }
};
const DialogModal: React.SFC<IProps> = ({handleApply, handleClear}) => {
    return (
        <GridConsumer>
            {({ state, actions }) =>
        <Dialog open={state.activeColumn != null} onClose={actions.handleClose} >
            <DialogTitle>{'Filter'}</DialogTitle>
            <DialogContent>
                <OperatorsDropdown />
                <DialogInput
                    disabled={state.activeColumn.Filter.Operator === CompareOperators.NONE}
                    value={setInitialValues(state.activeColumn).firstValue}
                    handleApply={handleApply}
                    label={state.activeColumn.Filter.Operator !== CompareOperators.BETWEEN ? 'Value' : 'First Value'}
                    columnType={state.activeColumn.DataType}
                    activeFilter={state.activeColumn.Name}
                    handleTextFieldChange={actions.handleTextFieldChange}
                />

                {state.activeColumn.Filter.Operator === CompareOperators.BETWEEN &&
                    <DialogInput
                        disabled={false}
                        value={setInitialValues(state.activeColumn).secondValue}
                        handleApply={handleApply}
                        label={'Second Value'}
                        columnType={state.activeColumn.DataType}
                        activeFilter={state.activeColumn.Name}
                        handleTextFieldChange={actions.handleSecondTextFieldChange}
                    />}

                <DialogActions>
                    <Button size='medium' color='secondary' onClick={() => handleClear()}>Clear</Button>
                    <Button
                        size='medium'
                        color='primary'
                        onClick={() => handleApply()}
                        disabled={state.activeColumn.Filter.Operator === CompareOperators.NONE}
                    >
                        Apply
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>}
        </GridConsumer>
      );
  };
export default DialogModal;
