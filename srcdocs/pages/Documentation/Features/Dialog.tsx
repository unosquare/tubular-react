import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { useGridRefresh } from 'tubular-react-common';
import { useToggle } from 'uno-react';
import DemoDialog from '../../../components/DemoDialog';
import FeatureSample from '../../../components/FeatureSample';
import DialogOptions from '../../../components/Options/Dialog';
import TableOfContent from '../../../components/TableOfContent';
import { dialogGrid } from '../../../utils/dialogCodeSamples';
import featuresStyles from '../../../utils/featuresStyles';

const useStyles = makeStyles(featuresStyles);

export default () => {
    const classes = useStyles({});
    const [openGrid, toggleOpenGrid] = useToggle(false);
    const [openDialog, toggleOpenDialog] = useToggle(false);
    const [refresh, forceRefresh] = useGridRefresh();

    const links = ['Button on Toolbar'];
    const path = '/tubular-react/features/dialog#';
    const dialogToolbarDescription = `You can add a button on the toolbar to open a dialog or do any other action,
    this is very useful in actions like adding rows. Using our Hook 'useGridRefresh' you can
    control when the grid renders.`;

    const dialog = {
        code: dialogGrid,
        description: dialogToolbarDescription,
        id: 'Dialog with button in Toolbar',
        open: openGrid,
        options: DialogOptions(toggleOpenDialog),
        refresh,
        toggle: toggleOpenGrid,
    };

    return (
        <Grid container={true} className={classes.container}>
            <Grid item={true} xs={10} className={classes.paper}>
                <Typography variant="h4">Dialogs and Actions</Typography>
                <Divider />
                <Typography variant="h6" className={classes.description}>
                    You can add actions to the toolbar and when the user click a row. In this section, you can see these
                    actions opening a dialog.
                </Typography>
                <FeatureSample data={dialog} />
                <DemoDialog onClose={toggleOpenDialog} open={openDialog} forceRefresh={forceRefresh} />
            </Grid>
            <Grid item={true} xs={2} className={classes.paper}>
                <TableOfContent links={links} path={path} />
            </Grid>
        </Grid>
    );
};
