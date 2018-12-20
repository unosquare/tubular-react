
import { Button, Card, CardActions, CardContent, Popover } from '@material-ui/core';
import * as React from 'react';
import { DataSourceContext } from '../DataSource';
import DialogInput from './DialogInput';
import OperatorsDropdown from './OperatorsDropdown';

import { ColumnDataType, CompareOperators } from 'tubular-common';

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
        Text: filterText,
    };
};

const clearFilterPatch = {
    Argument: [''],
    HasFilter: false,
    Operator: CompareOperators.NONE,
    Text: '',
};

const DialogModal: React.SFC = () => {
    return (
        <DataSourceContext.Consumer>
            {({ state, actions }) =>
                <Popover
                    open={Boolean(state.anchorFilter)}
                    onClose={() => actions.setFilter(clearFilterPatch)}
                    anchorEl={state.anchorFilter}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'bottom',
                    }}
                    transformOrigin={{
                        horizontal: 'center',
                        vertical: 'top',
                    }}
                >
                    <Card >
                        <CardContent>
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
                        </CardContent>
                        <CardActions>
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
                        </CardActions>
                    </Card>
                </Popover>}
        </DataSourceContext.Consumer>
    );
};
export default DialogModal;
