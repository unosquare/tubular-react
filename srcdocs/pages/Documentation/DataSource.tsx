import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import DocumentationList from '../../components/DocumentationList';

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
                        <Typography variant='display1' paragraph={true}> Data Source </Typography>
                        <Divider />
                        <br />
                        <Typography variant='subheading'>
                            <code className={classes.code}>{'<DataGrid />'}</code> requires a 
                            <code className={classes.code}>dataSource</code> prop which can be 
                            an instance of the <code className={classes.code}>RemoteDataSource</code> class or 
                            the <code className={classes.code}>LocalDataSource</code> class, 
                            that deals with data retrieval among other things. 

                            <br /><br />
                            <Typography variant='headline' gutterBottom={true}>
                                <code className={classes.code}>RemoteDataSource</code>
                            </Typography>

                            <code className={classes.code}>RemoteDataSource</code>
                            needs both a URL and a <code className={classes.code}>ColumnModel</code> array.

                            <br /><br />
                            <Typography variant='headline' gutterBottom={true}>
                                <code className={classes.code}>LocalDataSource</code>
                            </Typography>

                            <code className={classes.code}>LocalDataSource</code> 
                            needs both an array of data objects and a 
                            <code className={classes.code}>ColumnModel</code> array. See this
                            <Button
                                color='primary'
                                href='https://github.com/unosquare/tubular-react/blob/master/sample/src/local/localData.ts'
                                target='_blank'
                            >
                                example
                            </Button>
                            of how to define the array of objects.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
});
