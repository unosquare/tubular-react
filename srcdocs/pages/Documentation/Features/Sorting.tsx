import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { useToggle } from 'uno-react';
import FeatureSample from '../../../components/FeatureSample';
import NoOptions from '../../../components/Options/NoOptions';
import TableOfContent from '../../../components/TableOfContent';
import featuresStyles from '../../../utils/featuresStyles';
import { sortingGrid } from '../../../utils/sortingCodeSamples';
import sortingColumns from '../../../utils/sortingColumns';

const useStyles = makeStyles(featuresStyles);

export default () => {
    const classes = useStyles({});
    const [openSorting, toggleOpenSorting] = useToggle(false);

    const links = ['Sorting'];
    const path = '/tubular-react/features/sorting#';
    const sortingDescription = `At column definition, you can select which columns will be sortable, just click on the column header to sort.`;

    const sorting = {
        code: sortingGrid,
        columns: sortingColumns,
        description: sortingDescription,
        id: 'Sorting',
        open: openSorting,
        options: NoOptions,
        toggle: toggleOpenSorting,
    };

    return (
        <Grid container={true} className={classes.container}>
            <Grid item={true} xs={10} className={classes.paper}>
                <Typography variant="h4">Sorting</Typography>
                <Divider />
                <Typography variant="h6" className={classes.description}>
                    One of Tubular's feature is the sorting, you can select which columns will be sortable.
                </Typography>
                <FeatureSample data={sorting} />
            </Grid>
            <Grid item={true} xs={2} className={classes.paper}>
                <TableOfContent links={links} path={path} />
            </Grid>
        </Grid>
    );
};
