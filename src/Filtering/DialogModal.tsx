import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Popover from '@material-ui/core/Popover';
import * as React from 'react';
import { ColumnModel, CompareOperators } from 'tubular-common';
import { DialogInput } from './DialogInput';
import { OperatorsDropdown } from './OperatorsDropdown';

export interface DialogModalProps {
    anchorFilter: HTMLElement;
    activeColumn: ColumnModel;
    setAnchorFilter: (anchorEl: HTMLElement) => void;
    setFilter: (filter: Partial<ColumnModel>) => void;
    handleFilterChange: (filterText: string, filterOperator: CompareOperators, filterArgument?: any[]) => any;
}

export const DialogModal: React.FunctionComponent<DialogModalProps> = ({
    anchorFilter,
    activeColumn,
    setAnchorFilter,
    setFilter,
    handleFilterChange,
}: DialogModalProps) => {
    const clearFilter = () => setFilter({ filterText: '', filterOperator: CompareOperators.None });
    const handleInput = (e: any) => handleFilterChange(e, activeColumn.filterOperator);
    const handleBetweenInput = (e: any) =>
        handleFilterChange(activeColumn.filterText, activeColumn.filterOperator, [e]);
    const submit = () => setFilter(activeColumn);
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

                    {activeColumn.filterOperator === CompareOperators.Between && (
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
                        disabled={activeColumn.filterOperator === CompareOperators.None}
                    >
                        Apply
                    </Button>
                </CardActions>
            </Card>
        </Popover>
    );
};
