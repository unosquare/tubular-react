import MetaData from '../../srcdocs/components/MetaData';
import NavigationBar from '../../srcdocs/components/NavigationBar';
import SampleExport from '../../srcdocs/components/SampleExport';
import SampleFeatures from '../../srcdocs/components/SampleFeatures';
import SamplePagination from '../../srcdocs/components/SamplePagination';
import SampleSearch from '../../srcdocs/components/SampleSearch';
import Divider from 'material-ui/Divider';
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
        padding: 20,
    },
    content: {
        marginTop: 10,
    }
};

class Sample extends React.Component {
    state = {
        value: 'one',
        showCode: false
    };

    handleChange = (event, value) => {
        this.setState({ value });
        this.setState({ showCode: false });
    };

    render() {
        const { dataSource } = this.state;
        const { classes } = this.props;
        const { value, showCode } = this.state;
        return (
            <div>
                <MetaData />
                <NavigationBar />
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} className={classes.paper}>
                        <Paper className={classes.paper}>
                            <Typography variant='display1'>
                                Samples
                            </Typography>
                            <Divider />
                            <Grid item xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom>Grid with Paginations</Typography>
                                <Typography variant='subheading'>
                                    You can move across the pages and change the size.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <SamplePagination />
                            </Grid>
                            <Divider />
                            <Grid item xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom>Grid with Common Features</Typography>
                                <Typography variant='subheading'>
                                    The grid can be extended to include features like sorting and filtering.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <SampleFeatures />
                            </Grid>
                            <Divider />
                            <Grid item xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom>Free-Text Search</Typography>
                                <Typography variant='subheading'>
                                    Adding a "searchable" attribute to your columns and you can perform free-text searches.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <SampleSearch />
                            </Grid>
                            <Divider />
                            <Grid item xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom>Print and Export to CSV</Typography>
                                <Typography variant='subheading'>
                                    Easily you can print or export the current view or entire dataset to CSV using client-side only.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <SampleExport />
                            </Grid>
                            <Divider />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Sample.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sample);