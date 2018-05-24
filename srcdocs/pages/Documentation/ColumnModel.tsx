import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import ColumnModelList from '../../components/ColumnModelTable';
import DocumentationList from '../../components/DocumentationList';

const styles = {
    container: {
        margin: '0',
        padding: 30,
        width: '100%'
    },
    paper: {
        padding: 10
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
                    <Paper className={classes.paper} style={{ overflowX: 'auto'}}>
                        <Typography variant='display1' paragraph={true}> Column Model </Typography>
                        <Divider />
                        <ColumnModelList />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
});
