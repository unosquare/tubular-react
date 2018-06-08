import { Divider, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as React from 'react';
import DocumentationList from '../../components/DocumentationList';
import NavigationBar from '../../components/NavigationBar';
import PropsTable from '../../components/PropsTable';

const styles = {
    code: {
        background: '#F8F8FF',
        padding: '6px'
    },
    container: {
        margin: '0',
        padding: 30,
        width: '100%'
    },
    paper: {
        padding: 10,
    }
};

export default withStyles(styles)((props) => {
    const { classes } = props;
    return (
        <div>
            <Grid container={true} spacing={24} className={classes.container}>
                <Hidden smDown={true}>
                    <Grid item={true} xs={3}>
                        <DocumentationList />
                    </Grid>
                </Hidden>
                <Grid item={true} xs={12} md={9}>
                    <Paper className={classes.paper}>
                        <Typography variant='display1' paragraph={true}>Props</Typography>
                        <Divider />
                        <br />
                        <Typography variant='subheading'>
                            These are all the available props
                            (and their default values) for the
                            <code className={classes.code}>{'<DataGrid />'}</code> component.
                        </Typography>
                        <PropsTable />
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
                </Grid>
            </Grid>
        </div>
    );
});
