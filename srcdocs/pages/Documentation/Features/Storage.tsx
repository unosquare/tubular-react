import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { useToggle } from 'uno-react';
import { ToolbarOptions } from '../../../../src/Toolbar';
import FeatureSample from '../../../components/FeatureSample';
import TableOfContent from '../../../components/TableOfContent';
import featuresStyles from '../../../utils/featuresStyles';
import { localStorageGrid, nullStorageGrid } from '../../../utils/storageCodeSamples';

const useStyles = makeStyles(featuresStyles);

export default () => {
    const classes = useStyles({});
    const [openLocal, toggleOpenLocal] = useToggle(false);
    const [openNull, toggleOpenNull] = useToggle(false);

    const links = ['LocalStorage', 'NullStorage'];
    const path = '/tubular-react/features/storage#';
    const localDescription =
    `You can set that the grid keep data in the local storage, so when you refresh the page,
     all filters, sorting and page number will remain.`;

    const nullDescription =
    `If you don't want that the grid saves your options, you can set a NullStorage,
     this will reset everything if you refresh the page`;

    const localStorage = {
        code: localStorageGrid,
        description: localDescription,
        id: 'LocalStorage',
        open: openLocal,
        options: new ToolbarOptions(),
        toggle: toggleOpenLocal,
    };

    const nullStorage = {
        code: nullStorageGrid,
        description: nullDescription,
        id: 'NullStorage',
        open: openNull,
        options: new ToolbarOptions(),
        toggle: toggleOpenNull,
    };

    return (
        <Grid container={true} className={classes.container}>
            <Grid item={true} xs={10} className={classes.paper}>
                <Typography variant='h4'>Storage</Typography>
                <Divider />
                <Typography variant='h6' className={classes.description}>
                    Tubular's storage is one of its useful features. It will save, if you refresh,
                     your selected options at filtering, sorting, searching and the page number.
                </Typography>
                <FeatureSample data={localStorage} />
                <FeatureSample data={nullStorage} />
            </Grid>
            <Grid item={true} xs={2} className={classes.paper}>
                <TableOfContent links={links} path={path}/>
            </Grid>
        </Grid>
    );
};
