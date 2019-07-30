import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { useToggle } from 'uno-react';
import FeatureSample from '../../../components/FeatureSample';
import {ExportButton, PrintButton, SearchText} from '../../../components/Options/Toolbar';
import TableOfContent from '../../../components/TableOfContent';
import featuresStyles from '../../../utils/featuresStyles';
import { exportButtonGrid, printButtonGrid, searchTextGrid } from '../../../utils/toolbarCodeSamples';

const useStyles = makeStyles(featuresStyles);

export default () => {
    const classes = useStyles({});
    const [openExport, toggleOpenExport] = useToggle(false);
    const [openPrint, toggleOpenPrint] = useToggle(false);
    const [openSearch, toggleOpenSearch] = useToggle(false);

    const links = ['ExportButton', 'PrintButton', 'SearchText'];
    const path = '/tubular-react/features/toolbar#';
    const exportDescription =
    `You can add a export button to the grid's toolbar. It will let you to export your data to a CSV file`;

    const printDescription =
    `If you need your grid to be printable, it's easy, you just need to add the printButton property as true in your
    toolbarOptions object. The title of the document will be the gridName defined in the component`;

    const searchDescription =
    `You can also implement a free-text search to your grid, every column defined in your grid with
     the Searchable property will be filtered with this input. This works only on string-type columns`;

    const exportButton = {
        code: exportButtonGrid,
        description: exportDescription,
        id: 'ExportButton',
        open: openExport,
        options: ExportButton,
        toggle: toggleOpenExport,
    };

    const printButton = {
        code: printButtonGrid,
        description: printDescription,
        id: 'PrintButton',
        open: openPrint,
        options: PrintButton,
        toggle: toggleOpenPrint,
    };

    const searchText = {
        code: searchTextGrid,
        description: searchDescription,
        id: 'SearchText',
        open: openSearch,
        options: SearchText,
        toggle: toggleOpenSearch,
    };

    return (
        <Grid container={true} className={classes.container}>
            <Grid item={true} xs={10} className={classes.paper}>
                <Typography variant='h4'>Toolbar</Typography>
                <Divider />
                <Typography variant='h6' className={classes.description}>
                    At the grid definition, you can define a ToolbarOptions object.
                    It will add the features that you need, for example a print button.
                </Typography>
                <FeatureSample data={exportButton} />
                <FeatureSample data={printButton} />
                <FeatureSample data={searchText} />
            </Grid>
            <Grid item={true} xs={2} className={classes.paper}>
                <TableOfContent links={links} path={path}/>
            </Grid>
        </Grid>
    );
};
