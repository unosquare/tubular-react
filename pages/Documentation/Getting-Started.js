import DocumentationList from '../../srcdocs/components/DocumentationList';
import MetaData from '../../srcdocs/components/MetaData';
import NavigationBar from '../../srcdocs/components/NavigationBar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
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

const GettingStarted = (props) => {
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
                    <Typography variant="display1"> Getting Started </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

GettingStarted.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GettingStarted);