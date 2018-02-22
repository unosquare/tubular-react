import DocumentationList from '../../srcdocs/components/DocumentationList';
import MetaData from '../../srcdocs/components/MetaData';
import NavigationBar from '../../srcdocs/components/NavigationBar';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
    container: {
        padding: 30,
    },
    paper: {
        padding: 10,
    }
};

const DataSource = (props) => {
    const { classes } = props;
    return (
        <div>
            <MetaData />
            <NavigationBar />
            <Grid container spacing={24} className={classes.container}>
                <Grid item xs={2}>
                    <DocumentationList />
                </Grid>
                <Grid item xs={10}>
                <Paper className={classes.paper}>
                <Typography variant="display1" paragraph> Data Source </Typography>
                <Divider />
                        <Typography variant='subheading'>{'<DataGrid/>'} requires a dataSource prop which is an instance of the RemoteDataSource class,
                            that deals with data retrieval among other things.<br/>At the same time, RemoteDataSource needs both a URL and
                            a ColumnModel array.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

DataSource.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(DataSource);