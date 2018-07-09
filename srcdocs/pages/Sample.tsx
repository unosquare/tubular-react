import { Divider, Grid, Paper, Typography, WithStyles, withStyles } from '@material-ui/core';

import * as React from 'react';
import SampleExport from '../../srcdocs/components/SampleExport';
import SampleFeatures from '../../srcdocs/components/SampleFeatures';
import SamplePagination from '../../srcdocs/components/SamplePagination';
import SampleSearch from '../../srcdocs/components/SampleSearch';
const styles = {
    container: {
        margin: '0',
        padding: 30,
        width: '100%'
    },
    content: {
        marginTop: 10,
    },
    paper: {
        padding: 20,
    }
};

interface IState {
showCode: boolean;
value: string;
}

export default withStyles(styles)(class extends React.Component<WithStyles<keyof typeof styles>, IState> {
    public state = {
        showCode: false,
        value: 'one'
    };

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container={true} spacing={24} className={classes.container}>
                    <Grid item={true} xs={12} className={classes.paper}>
                        <Paper className={classes.paper}>
                            <Typography variant='display1'>
                                Samples
                            </Typography>
                            <Divider />
                            <br />
                            <Grid item={true} xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom={true}>Grid with Paginations</Typography>
                                <Typography variant='subheading'>
                                    You can move across the pages and change the size.
                                </Typography>
                                <Grid item={true} xs={12}>
                                    <SamplePagination />
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid item={true} xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom={true}>
                                Grid with Common Features</Typography>
                                <Typography variant='subheading'>
                                    The grid can be extended to include features like sorting and filtering.
                                </Typography>
                                <Grid item={true} xs={12}>
                                    <SampleFeatures />
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid item={true} xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom={true}>Free-Text Search</Typography>
                                <Typography variant='subheading'>
                                    Adding a "searchable" attribute to your columns
                                    and you can perform free-text searches.
                                </Typography>
                                <Grid item={true} xs={12}>
                                    <SampleSearch />
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid item={true} xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom={true}>Print and Export to CSV</Typography>
                                <Typography variant='subheading'>
                                    Easily you can print or export the current view
                                    or entire dataset to CSV using client-side only.
                                </Typography>
                                <SampleExport/>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
});
