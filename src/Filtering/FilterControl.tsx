import * as React from 'react';
import { ColumnModel, columnHasFilter, ColumnDataType } from 'tubular-common';
import { StandardFilterEditor } from './StandardFilterEditor';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { BooleanFilterEditor } from './BooleanFilterEditor';

export interface FilterControlProps {
    column: ColumnModel;
    onApply: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    expandIcon: {
        color: theme.palette.primary.contrastText,
    },
}));

export const FilterControl: React.FunctionComponent<FilterControlProps> = ({ column, onApply }: FilterControlProps) => {
    const hasFilter = columnHasFilter(column);
    const classes = useStyles();
    const FilterEditor = column.dataType === ColumnDataType.Boolean ? BooleanFilterEditor : StandardFilterEditor;

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                classes={hasFilter ? classes : {}}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
            >
                <Typography>{column.label}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <FilterEditor column={column} onApply={onApply} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};
