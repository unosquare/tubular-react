import * as React from 'react';
import { ColumnModel, getOperators, ColumnDataType, CompareOperators } from 'tubular-common';
import { getOperatorIcon, getOperatorText, FilterEditorProps } from './utils';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// import { NumericFilter } from './NumericFilter';
// import { StringFilter } from './StringFilter';
// import { DateFilter } from './DateFilter';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { NumericFilter } from './NumericFilter';
import { StringFilter } from './StringFilter';
import { DateFilter } from './DateFilter';

const getFilterControl = (column: ColumnModel, onApply: () => void) => {
    switch (column.dataType) {
        case ColumnDataType.Numeric:
            return <NumericFilter column={column} onApply={onApply} />;

        case ColumnDataType.String:
            return <StringFilter column={column} onApply={onApply} />;
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return <DateFilter column={column} onApply={onApply} />;

        default:
            return null;
    }
};

export const StandardFilterEditor: React.FunctionComponent<FilterEditorProps> = ({ column, onApply }: FilterEditorProps) => {
    const [currentOperator, setCurrentOperator] = React.useState(column.filterOperator);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const options = getOperators(column).map((row: any) => ({
        key: row.value,
        icon: getOperatorIcon(column.filterOperator),
        text: getOperatorText(row.value, row.title),
    }));

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOperatorClick = (operator: CompareOperators) => {
        setCurrentOperator(operator);
        column.filterOperator = operator;
        handleClose();
    };

    return (
        <>
            <Grid container={true} spacing={2}>
                <Grid item={true} xs={3} container={true} justify="center" direction="column">
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleMenuClick}
                    >
                        {getOperatorIcon(currentOperator)}
                        <ArrowDropDownIcon />
                    </Button>
                </Grid>
                <Grid item={true} xs={9}>
                    {getFilterControl(column, onApply)}
                </Grid>
            </Grid>
            <Menu id="split-button-menu" open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
                {options.map((option) => (
                    <MenuItem
                        key={option.text}
                        selected={currentOperator === option.key}
                        onClick={() => handleOperatorClick(option.key)}
                    >
                        {getOperatorIcon(option.key)}
                        <span style={{ marginLeft: 10 }}>{option.text}</span>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
