import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import * as React from 'react';
import DialogInput from './DialogInput';
import { DataSourceContext } from './DataSource/DataSourceContext';
import OperatorsDropdown from './OperatorsDropdown';

import { ColumnDataType, CompareOperators } from './Models/Column';

const createFilterPatch = (activeColumn: any) => {
    let filterText = activeColumn.Filter.Text;
    let filterArgument = activeColumn.Filter.Argument[0];

    if (activeColumn.DataType === ColumnDataType.NUMERIC) {
        filterText = parseFloat(filterText);
        filterArgument = parseFloat(filterArgument);
    } else if (activeColumn.DataType === ColumnDataType.BOOLEAN) {
        filterText = filterText === 'true';
        filterArgument = '';
    }

    return {
        Argument: [filterArgument],
        HasFilter: true,
        Text: filterText
    };
};

const clearFilterPatch = {
    Argument: [''],
    HasFilter: false,
    Operator: CompareOperators.NONE,
    Text: ''
  };

const DialogModal: React.SFC = () => {
    return (
        <DataSourceContext.Consumer>
            {({ state, actions }) =>
                <Dialog open={true} onClose={actions.handleClose} >
                    <DialogTitle>Filter</DialogTitle>
                    <DialogContent>
                        <OperatorsDropdown />
                        <DialogInput
                            column={state.activeColumn}
                            isPrimary={true}
                            handleTextFieldChange={(e) => actions.handleFilterChange({ Text: e })}
                        />

                        {state.activeColumn.Filter.Operator === CompareOperators.BETWEEN &&
                            <DialogInput
                                column={state.activeColumn}
                                isPrimary={false}
                                handleTextFieldChange={(e) => actions.handleFilterChange({ Argument: [e] })}
                            />}

                        <DialogActions>
                            <Button
                                size='medium'
                                color='secondary'
                                onClick={() => actions.setFilter(clearFilterPatch)}
                            >
                                Clear
                            </Button>
                            <Button
                                size='medium'
                                color='primary'
                                onClick={() => actions.setFilter(createFilterPatch(state.activeColumn))}
                                disabled={state.activeColumn.Filter.Operator === CompareOperators.NONE}
                            >
                                Apply
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>}
        </DataSourceContext.Consumer>
    );
};
export default DialogModal;
