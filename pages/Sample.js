import MetaData from '../srcdocs/components/MetaData';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NavigationBar from '../srcdocs/components/NavigationBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

/* const columns = [
   new ColumnModel( 'OrderID',
     { DataType: ColumnDataType.NUMERIC,
       Filtering: true,
       IsKey: true,
       Label: 'ID',
       SortDirection: ColumnSortDirection.ASCENDING,
       SortOrder: 1,
       Sortable: true }
   ),
   new ColumnModel( 'CustomerName',
     { Aggregate: AggregateFunctions.COUNT,
       Filtering: true,
       Searchable: true,
       Sortable: true }
   )
 ];*/

const styles = {
    root: {
        width: '100%',
    },
    container: {
        padding: 30,
    },
    paper: {
        padding: 20,
    },
    content: {
        marginTop: 10,
    },
    code: {
        fontSize: 15,
    }
};

class Sample extends React.Component {
    state = {
        //dataSource: new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns)
        value: 'one'
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        //  const { dataSource } = this.state; 
        const { classes } = this.props;
        const { value } = this.state;
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
                    <Tabs value={value} onChange={this.handleChange} centered>
                        <Tab value="one" label="Grid with Paginations" />
                        <Tab value="two" label="Grid with Common Features" />
                        <Tab value="three" label="Free-Text Search" />
                        <Tab value="four" label="Print and Export to CSV" />
                    </Tabs>
                    {value === 'one' &&
                        <Grid item xs={12} className={classes.paper}>
                                <Grid item xs={3}>
                                    <Typography variant='subheading' gutterBottom>Grid with Paginations</Typography>
                                    <Typography variant='body1'>Adding a new feature: the pagination.
                                    You can move across the pages and change the size.
                        </Typography>
                                </Grid>
                                <Grid item xs>
                                </Grid>
                        </Grid>
                    }
                    {value === 'two' &&
                    <Grid item xs={12} className={classes.paper}>
                            <Grid item xs={3}>
                                <Typography variant='subheading' gutterBottom>Grid with Common Features</Typography>
                                <Typography variant='body1'>The grid can be extended to include features like sorting and filtering.
                        </Typography>
                            </Grid>
                    </Grid>
                    }
                    {value === 'three' &&
                    <Grid item xs={12} className={classes.paper}>
                            <Grid item xs={3}>
                                <Typography variant='subheading' gutterBottom>Free-Text Search</Typography>
                                <Typography variant='body1'>Adding a "searchable" attribute to your columns and you can perform free-text searches.
                            </Typography>
                            </Grid>
                    </Grid>
                    }
                    {value === 'four' &&
                    <Grid item xs={12} className={classes.paper}>
                            <Grid item xs={3}>
                                <Typography variant='subheading' gutterBottom>Print and Export to CSV</Typography>
                                <Typography variant='body1'>Easily you can print or export the current view or entire dataset to CSV using client-side only.
                            </Typography>
                            </Grid>

                    </Grid>
                    }
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