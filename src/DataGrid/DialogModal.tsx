import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import DialogInput from './DialogInput';
import OperatorsDropdown from './OperatorsDropdown';

import * as React from 'react';
import { GridConsumer } from './GridContext';

import { CompareOperators } from './Models/Column';

const DialogModal: React.SFC = () => {
    return (
        <GridConsumer>
            {({ state, actions }) =>
                <Dialog open={state.activeColumn != null} onClose={actions.handleClose} >
                    <DialogTitle>{'Filter'}</DialogTitle>
                    <DialogContent>
                        <OperatorsDropdown />
                        <DialogInput
                            column={state.activeColumn}
                            isPrimary={true}
                            handleTextFieldChange={actions.handleTextFieldChange}
                        />

                        {state.activeColumn.Filter.Operator === CompareOperators.BETWEEN &&
                            <DialogInput
                                column={state.activeColumn}
                                isPrimary={false}
                                handleTextFieldChange={actions.handleSecondTextFieldChange}
                            />}

                        <DialogActions>
                            <Button size='medium' color='secondary' onClick={actions.clearActiveColumn}>Clear</Button>
                            <Button
                                size='medium'
                                color='primary'
                                onClick={actions.filterActiveColumn}
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
