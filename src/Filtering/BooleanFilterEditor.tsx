import * as React from 'react';
import { FilterEditorProps } from './utils';
import { CompareOperators } from 'tubular-common';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    label: {
        paddingTop: 5,
    },
});

export const BooleanFilterEditor = ({ column }: FilterEditorProps) => {
    const [selectedOption, setSelectedOption] = React.useState(column.filterText || 'all');
    const classes = useStyles();
    const onChoiceChange = (value: string) => {
        setSelectedOption(value);
        if (value === 'all') {
            column.filterOperator = CompareOperators.None;
            column.filterText = null;
            return;
        }

        column.filterOperator = CompareOperators.Equals;
        column.filterText = value;
    };

    return (
        <div>
            <RadioGroup
                aria-label="quiz"
                name="quiz"
                value={selectedOption}
                onChange={(_event, value) => onChoiceChange(value)}
            >
                <FormControlLabel classes={classes} value="true" control={<Radio />} label={<CheckBoxIcon />} />
                <FormControlLabel
                    classes={classes}
                    value="false"
                    control={<Radio />}
                    label={<CheckBoxOutlineBlankIcon />}
                />
                <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
        </div>
    );
};
