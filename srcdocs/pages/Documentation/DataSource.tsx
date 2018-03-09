import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import DocumentationList from '../../components/DocumentationList';

const styles = {
    container: {
        padding: 30,
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
                        <Typography variant='display1' paragraph={true}> Data Source </Typography>
                        <Divider />
                        <Typography variant='subheading'>{'<DataGrid/>'}
                            requires a dataSource prop which is an instance of the RemoteDataSource class,
                            that deals with data retrieval among other things.<br />At the same time,
                            RemoteDataSource needs both a URL and a ColumnModel array.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
});
