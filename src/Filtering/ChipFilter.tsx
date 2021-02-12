import * as React from 'react';
import { ColumnModel, ColumnDataType, CompareOperators } from 'tubular-common';
import Chip from '@material-ui/core/Chip';
import { getOperatorIcon } from './utils';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export interface IChipFilterProps {
    column: ColumnModel;
    onRemoveFilter: (columnName: string) => void;
}

const convertToFriendlyDateString = (date: string | number) => new Date(date).toDateString();

const getFilterText = (column: ColumnModel) => {
    const isDate =
        column.dataType === ColumnDataType.Date ||
        column.dataType === ColumnDataType.DateTime ||
        column.dataType === ColumnDataType.DateTimeUtc;

    const filterText = isDate ? convertToFriendlyDateString(column.filterText) : column.filterText;

    if (column.filterOperator === CompareOperators.Between) {
        let argument = column.filterArgument[0];
        if (isDate) {
            argument = convertToFriendlyDateString(argument);
        }
        return `${filterText} - ${argument}`;
    }

    if (column.dataType === ColumnDataType.Boolean) {
        return filterText === 'true' ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />;
    }

    return filterText;
};

const useStyles = makeStyles({
    root: {
        marginRight: 6,
    },
    label: {
        display: 'flex',
        alignItems: 'center',
    },
});

export const ChipFilter: React.FunctionComponent<IChipFilterProps> = ({ column, onRemoveFilter }: IChipFilterProps) => {
    const filterValue = getFilterText(column);
    const classes = useStyles();
    const labelNode = (
        <>
            <span style={{ marginRight: 4 }}>{column.label}</span>
            {getOperatorIcon(column.filterOperator)}
            <span style={{ marginLeft: 4 }}>{filterValue}</span>
        </>
    );

    return <Chip classes={classes} label={labelNode} onDelete={() => onRemoveFilter(column.name)} />;
};
