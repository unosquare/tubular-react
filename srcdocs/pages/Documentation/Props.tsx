import { Divider, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as React from 'react';
import DataGridProps from '../../components/DataGridProps';
import DocumentationList from '../../components/DocumentationList';
import ToolBarOptionsProps from '../../components/ToolBarOptionsProps';

const styles = {
    code: {
        background: '#F8F8FF',
        padding: '6px',
    },
    container: {
        margin: '0',
        padding: 30,
        width: '100%',
    },
    paper: {
        padding: 10,
    },
};

const Props = ({ classes }: any) => (
    <Grid container={true} spacing={24} className={classes.container}>
        <Hidden smDown={true}>
            <Grid item={true} xs={3}>
                <DocumentationList />
            </Grid>
        </Hidden>
        <Grid item={true} xs={12} md={9}>
            <Paper className={classes.paper}>
                <Typography variant='display1' paragraph={true}>DataGrid props</Typography>
                <Divider />
                <br />
                <Typography variant='subheading'>
                    It's important to use <code className={classes.code}>withRemoteDataSource</code> or
                            <code className={classes.code}>withLocalDataSource</code> according to the case
                            to fill the <code className={classes.code}>{'<DataGrid />'}</code> component
                    with the data.
                            <br />
                    These are all the available props (and their default values) for the
                            <code className={classes.code}>{'<DataGrid />'}</code> component.
                        </Typography>
                <DataGridProps />
                <br />
                <Typography variant='subheading'>
                    <i>If you don't define some of the optional props described above,
                            these will not be shown. In the case of </i>
                    <code className={classes.code}>bodyRenderer</code>,
                            <i>the grid will display its default body; if the
                            <code className={classes.code}>footerRenderer</code>
                        is not defined, the footer will not be displayed.</i>
                </Typography>
            </Paper>
            <br />
            <Paper className={classes.paper}>
                <Typography variant='display1' paragraph={true}>Toolbar options</Typography>
                <Divider />
                <br />
                <Typography variant='subheading'>
                    If you need personalite the grid adding, removing
                            or modifying  fetures, <code className={classes.code}>ToolBarOptions Class</code>
                    provides several options.
                        </Typography>
                <ToolBarOptionsProps />
                <br />
                <Typography variant='subheading'>
                    <i>If you don't define some of the optional props described above,
                            these will set with the default values.</i>
                </Typography>
            </Paper>
        </Grid>
    </Grid>
);

export default withStyles(styles)(Props);
