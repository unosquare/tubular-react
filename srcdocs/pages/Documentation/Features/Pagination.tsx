import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { useToggle } from 'uno-react';
import FeatureSample from '../../../components/FeatureSample';
import AdvancedGrid from '../../../components/Pagination/AdvancedPaginationGrid';
import BasicGrid from '../../../components/Pagination/BasicPaginationGrid';
import TableOfContent from '../../../components/TableOfContent';
import { advancedPaginationGrid, basicPaginationGrid } from '../../../utils/codeSnipetExamples';

const useStyles = makeStyles(() => ({
    container: {
        margin: '0',
        padding: '30px',
        width: '100%',
    },
    content: {
        marginTop: '10px',
    },
    description: {
        marginTop: '20px',
    },
    link: {
        color: '#000',
        textDecoration: 'none',
    },
    paper: {
        padding: '20px',
        paddingTop: '0px',
    },
}));

export default () => {
    const classes = useStyles({});
    const [openBasic, toggleOpenBasic] = useToggle(false);
    const [openAdvanced, toggleOpenAdvanced] = useToggle(false);

    const links = ['BasicPagination', 'AdvancedPagination'];
    const path = '/tubular-react/features/pagination#';
    const basicDescription =
    `By default, every grid has a pagination component that helps you navigate through your data.
    In the ToolbarOptions object you can select if you want to display pager on top, bottom or both`;

    const advancedDescription =
    `If you have several data, you can add some useful options to the paginator with advancePagination
     in the ToolbarOptions. This will help to navigate more easily.`;

    const basicPagination = {
        code: basicPaginationGrid,
        description: basicDescription,
        id: 'BasicPagination',
        open: openBasic,
        sample: BasicGrid,
        toggle: toggleOpenBasic,
    };

    const advancedPagination = {
        code: advancedPaginationGrid,
        description: advancedDescription,
        id: 'AdvancedPagination',
        open: openAdvanced,
        sample: AdvancedGrid,
        toggle: toggleOpenAdvanced,
    };

    return (
        <Grid container={true} className={classes.container}>
            <Grid item={true} xs={10} className={classes.paper}>
                <Typography variant='h4'>Pagination</Typography>
                <Divider />
                <Typography variant='h6' className={classes.description}>
                    One of Tubular's feature is the pagination,
                     this pagination is server-side, this means
                     that if you have a lot of data, Tubular will only ask for the number of rows that you need.
                </Typography>
                <FeatureSample data={basicPagination} />
                <FeatureSample data={advancedPagination} />
            </Grid>
            <Grid item={true} xs={2} className={classes.paper}>
                <TableOfContent links={links} path={path}/>
            </Grid>
        </Grid>
    );
};
