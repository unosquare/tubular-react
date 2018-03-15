import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
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
                        <Typography variant='display1' paragraph={true}>Props</Typography>
                        <Divider />
                        <br />
                        <Typography variant='subheading'>
                            These are all the available props
                            (and their default values) for the <code className={classes.code}>{'<DataGrid />'}</code> component.
                        </Typography>
                        <PropsTable />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
});
