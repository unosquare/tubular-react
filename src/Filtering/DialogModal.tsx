
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Popover from '@material-ui/core/Popover';
import * as React from 'react';
import { DialogInput } from './DialogInput';
import { OperatorsDropdown } from './OperatorsDropdown';

import { ColumnDataType, ColumnModel, CompareOperators } from 'tubular-common';
import { IFilterWrapper } from '../DataGridInterfaces/IFilterWrapper';

const createFilterPatch = (column: ColumnModel): IFilterWrapper => {
    let filterText = column.Filter.Text;
    let filterArgument = column.Filter.Argument[0];

    if (column.DataType === ColumnDataType.NUMERIC) {
        filterText = parseFloat(filterText);
        filterArgument = parseFloat(filterArgument);
    } else if (column.DataType === ColumnDataType.BOOLEAN) {
        filterText = filterText === 'true';
        filterArgument = '';
    }

    return {
        Argument: [filterArgument],
        HasFilter: true,
        Operator: column.Filter.Operator || CompareOperators.AUTO,
        Text: filterText,
    };
};

const clearFilterPatch: IFilterWrapper = {
    Argument: [''],
    HasFilter: false,
    Operator: CompareOperators.NONE,
    Text: '',
};

interface IDialogModalProps {
    anchorFilter: HTMLElement;
    activeColumn: ColumnModel;
    setAnchorFilter: (anchorEl: HTMLElement) => void;
    setFilter: (filter: IFilterWrapper) => void;
    handleFilterChange: (value: IFilterWrapper | any) => any;
}

export const DialogModal: React.FunctionComponent<IDialogModalProps> =
    ({ anchorFilter, activeColumn, setAnchorFilter, setFilter, handleFilterChange }) => {
        const clearFilter = () => setFilter(clearFilterPatch);
        const handleInput = (e: any) => handleFilterChange({ Text: e });
        const handleBetweenInput = (e: any) => handleFilterChange({ Argument: [e] });
        const submit = () => setFilter(createFilterPatch(activeColumn));
        const onClose = () => setAnchorFilter(null);

        return (
            <Popover
                open={Boolean(anchorFilter)}
                onClose={onClose}
                anchorEl={anchorFilter}
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
                        <OperatorsDropdown activeColumn={activeColumn} handleFilterChange={handleFilterChange} />
                        <DialogInput
                            column={activeColumn}
                            isPrimary={true}
                            handleTextFieldChange={handleInput}
                        />

                        {activeColumn.Filter.Operator === CompareOperators.BETWEEN &&
                            <DialogInput
                                column={activeColumn}
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
                            disabled={activeColumn.Filter.Operator === CompareOperators.NONE}
                        >
                            Apply
                        </Button>
                    </CardActions>
                </Card>
            </Popover>
        );
    };
