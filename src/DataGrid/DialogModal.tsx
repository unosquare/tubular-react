
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

const DialogModal: React.FunctionComponent = () => {
    const { actions, state } = React.useContext(DataSourceContext);

    const clearFilter = () => actions.setFilter(clearFilterPatch);
    const handleInput = (e: any) => actions.handleFilterChange({ Text: e });
    const handleBetweenInput = (e: any) => actions.handleFilterChange({ Argument: [e] });
    const submit = () => actions.setFilter(createFilterPatch(state.activeColumn));

    return (
        <Popover
            open={Boolean(state.anchorFilter)}
            onClose={clearFilter}
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
                        handleTextFieldChange={handleInput}
                    />

                    {state.activeColumn.Filter.Operator === CompareOperators.BETWEEN &&
                        <DialogInput
                            column={state.activeColumn}
                            isPrimary={false}
                            handleTextFieldChange={handleBetweenInput}
                        />}
                </CardContent>
                <CardActions>
                    <Button
                        size='medium'
                        color='secondary'
                        onClick={clearFilter}
                    >
                        Clear
                    </Button>
                    <Button
                        size='medium'
                        color='primary'
                        onClick={submit}
                        disabled={state.activeColumn.Filter.Operator === CompareOperators.NONE}
                    >
                        Apply
                    </Button>
                </CardActions>
            </Card>
        </Popover>
    );
};

export default DialogModal;
