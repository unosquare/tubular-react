import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { TbSelection } from '../utils/Selection';
import { createStyles, makeStyles, lighten, Theme } from '@material-ui/core/styles';

export interface SelectionToolbarProps {
    selection: TbSelection;
    actionsArea?: React.ComponentType<any>;
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                      color: theme.palette.secondary.main,
                      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                  }
                : {
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.secondary.dark,
                  },
        title: {
            flex: '1 1 100%',
        },
    }),
);

const spacer: React.CSSProperties = { flex: '1 0' };

export const SelectionToolbar: React.FunctionComponent<SelectionToolbarProps> = ({
    selection,
    actionsArea,
}: SelectionToolbarProps) => {
    const classes = useToolbarStyles();
    const ActionsArea = actionsArea;

    return (
        <Toolbar
            data-testid="selection-toolbar"
            className={clsx(classes.root, {
                [classes.highlight]: selection.getSelectedCount() > 0,
            })}
        >
            <Typography color="inherit" variant="subtitle1" component="div">
                {selection.getSelectedCount()} selected
            </Typography>
            <div style={spacer} />
            {ActionsArea && <ActionsArea selection={selection} />}
        </Toolbar>
    );
};
