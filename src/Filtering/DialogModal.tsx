import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Popover from '@material-ui/core/Popover';
import * as React from 'react';
import { ColumnModel, CompareOperators, FilterWrapper } from 'tubular-common';
import { DialogInput } from './DialogInput';
import { OperatorsDropdown } from './OperatorsDropdown';

export interface IDialogModalProps {
    anchorFilter: HTMLElement;
    activeColumn: ColumnModel;
    setAnchorFilter: (anchorEl: HTMLElement) => void;
    setFilter: (filter: FilterWrapper) => void;
    handleFilterChange: (value: FilterWrapper | any) => any;
}

export const DialogModal: React.FunctionComponent<IDialogModalProps> = ({
    anchorFilter,
    activeColumn,
    setAnchorFilter,
    setFilter,
    handleFilterChange,
}: IDialogModalProps) => {
    const clearFilter = () => setFilter(ColumnModel.clearFilterPatch());
    const handleInput = (e: any) => handleFilterChange({ Text: e });
    const handleBetweenInput = (e: any) => handleFilterChange({ Argument: [e] });
    const submit = () => setFilter(ColumnModel.createFilterPatch(activeColumn));
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
            <Card>
                <CardContent>
                    <OperatorsDropdown activeColumn={activeColumn} handleFilterChange={handleFilterChange} />
                    <DialogInput column={activeColumn} isPrimary={true} handleTextFieldChange={handleInput} />

                    {activeColumn.filter.operator === CompareOperators.Between && (
                        <DialogInput
                            column={activeColumn}
                            isPrimary={false}
                            handleTextFieldChange={handleBetweenInput}
                        />
                    )}
                </CardContent>
                <CardActions>
                    <Button size="medium" color="secondary" onClick={clearFilter}>
                        Clear
                    </Button>
                    <Button
                        size="medium"
                        color="primary"
                        onClick={submit}
                        disabled={activeColumn.filter.operator === CompareOperators.None}
                    >
                        Apply
                    </Button>
                </CardActions>
            </Card>
        </Popover>
    );
};
