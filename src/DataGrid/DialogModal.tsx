
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Popover from '@material-ui/core/Popover';
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

const clearFilter = (callback: any) => () => callback(clearFilterPatch);
const handleInput = (callback: any) => (e: any) => callback({ Text: e });
const handleBetweenInput = (callback: any) => (e: any) => callback({ Argument: [e] });
const submit = (callback: any, column: any) => () => callback(createFilterPatch(column));

const DialogModal: React.FunctionComponent = () => (
    <DataSourceContext.Consumer>
        {({ state, actions }) =>
            <Popover
                open={Boolean(state.anchorFilter)}
                onClose={clearFilter(actions.setFilter)}
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
                            handleTextFieldChange={handleInput(actions.handleFilterChange)}
                        />

                        {state.activeColumn.Filter.Operator === CompareOperators.BETWEEN &&
                            <DialogInput
                                column={state.activeColumn}
                                isPrimary={false}
                                handleTextFieldChange={handleBetweenInput(actions.handleFilterChange)}
                            />}
                    </CardContent>
                    <CardActions>
                        <Button
                            size='medium'
                            color='secondary'
                            onClick={clearFilter(actions.setFilter)}
                        >
                            Clear
                        </Button>
                        <Button
                            size='medium'
                            color='primary'
                            onClick={submit(actions.setFilter, state.activeColumn)}
                            disabled={state.activeColumn.Filter.Operator === CompareOperators.NONE}
                        >
                            Apply
                        </Button>
                    </CardActions>
                </Card>
            </Popover>}
    </DataSourceContext.Consumer>
);

export default DialogModal;
