import MetaData from '../srcdocs/components/MetaData';
import NavigationBar from '../srcdocs/components/NavigationBar';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import React from 'react';
import SyntaxHighligther from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import PropTypes from 'prop-types';

const styles = {
    container: {
        padding: 30,
    },
    paper: {
        padding: 30,
    },
    image: {
        maxWidth: 300,
        marginLeft:'25%'
    },
    content: {
        marginTop: 10,
    },
    code: {
        fontSize: 15,
    }
};

const sample = "import DataGrid, {\n  AggregateFunctions,\n  ColumnDataType,\n  ColumnModel,\n  ColumnSortDirection,\n  RemoteDataSource} from 'tubular-react';\nimport React from 'react'; \n \nconst columns = [ \n new ColumnModel( 'OrderID', \n  { DataType: ColumnDataType.NUMERIC,\n    Filtering: true,\n    IsKey: true,\n    Label: 'ID',\n    SortDirection: ColumnSortDirection.ASCENDING,\n    SortOrder: 1,\n    Sortable: true }\n ),\n  new ColumnModel( 'CustomerName',\n  { Aggregate: AggregateFunctions.COUNT,\n    Filtering: true,\n    Searchable: true,\n    Sortable: true }\n )\n ];\n \n class CustomComponent extends React.Component {\n  state={\n    dataSource: new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns)\n  }\n  render() {\n    const { dataSource } = this.state; \n    return (\n      <DataGrid dataSource={dataSource} rowsPerPage = { 10 } gridName = 'table' />\n    );\n   }\n }"

const Home = (props) => {
    const { classes } = props;
    return (
        <div>
            <MetaData />
            <NavigationBar />
            <Grid container spacing={24} className={classes.container}>
                <Grid item xs={12} md={6}>
                 <Paper className={classes.paper}>
                    <Typography variant='display1'>
                        What is it?
                    </Typography>
                    <Divider />
                    <Typography paragraph variant='subheading' className={classes.content}>
                        Tubular React is a set of ReactJS components designed to rapidly build modern web applications. The centerpiece of Tubular is its fully templateable grid with lots of features such as server-side pagination, multi-column sorting and filtering, and built-in export to CSV.
                    </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Typography variant='display1'>
                            Features
                        </Typography>
                        <Divider />
                        <Typography paragraph variant='subheading' className={classes.content}>
                            The main component is a grid with multiple options:
                                <ul>
                                <li>Common functionality like Sorting, Filtering (specific to the data type), Free-text search, Paging and more.</li>
                                <li>Basic services like Print and Export to CSV in client-side.</li>
                            </ul>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Typography variant='display1'>
                            Dependencies
                        </Typography>
                        <Divider />
                        <Typography paragraph variant='subheading' >
                            <ul>
                                <li>
                                    <a href="https://material-ui-next.com">Material-UI Next</a>
                                </li>
                            </ul>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Typography variant='display1'>
                            npm Installation
                        </Typography>
                        <Divider />
                        <Typography paragraph variant='subheading' className={classes.content}>
                            <SyntaxHighligther language='tsx' style={docco} className={classes.code}>$ npm install tubular-react --save</SyntaxHighligther>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant='display1'>
                            Using the {'</DataGrid>'} component
                        </Typography>
                        <Divider />
                        <Typography paragraph variant='body1' className={classes.content}>
                            <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                                {sample}
                            </SyntaxHighligther>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);