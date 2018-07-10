import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as React from 'react';
import SyntaxHighligther from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const styles = {
    code: {
        fontSize: 15,
    },
    codeTag: {
        background: '#F8F8FF',
        padding: '6px'
    },
    container: {
        margin: '0',
        padding: 30,
        width: '100%'
    },
    content: {
        marginTop: 10,
    },
    image: {
        marginLeft: '25%',
        maxWidth: 300
    },
    paper: {
        minHeight: '300px',
        padding: 30,
    }
    ,
    paperSmall: {
        minHeight: '115px',
        padding: 30,
    }
};

// tslint:disable-next-line:max-line-length
const sample = "import DataGrid, {\n  AggregateFunctions,\n  ColumnDataType,\n  ColumnModel,\n  ColumnSortDirection,\n  ToolbarOptions,\n  withRemoteDataSource \n} from 'tubular-react'; \n \n import React from 'react'; \n \n const columns = [ \n new ColumnModel( 'OrderID', \n { DataType: ColumnDataType.NUMERIC, \n     Filtering: true, \n      IsKey: true, \n      Label: 'ID', \n      SortDirection: ColumnSortDirection.ASCENDING, \n      SortOrder: 1, \n      Sortable: true } \n  ), \n  new ColumnModel( 'CustomerName', \n    { Aggregate: AggregateFunctions.COUNT, \n      Filtering: true, \n      Searchable: true, \n      Sortable: true } \n  ),  new ColumnModel( 'ShipperCity' ) \n]; \n  \nclass SampleGrid extends React.Component { \n    public state = { \n        errorMessage: null as any \n    }; \n  \n    public componentWillReceiveProps(nextProps: any) { \n        this.setState({ errorMessage: nextProps.error }); \n    } \n  \n    public render() { \n        const { errorMessage } = this.state; \n        return ( \n            <div className='root'> \n                {errorMessage &&  \n                    <Snackbar \n                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} \n                        style={{ paddingTop: '10px' }} \n                        open={true} \n                        ContentProps={{ 'aria-describedby': 'message-id' }} \n                        message={<span id='message-id'>{errorMessage}</span>} \n                    /> \n                } \n                <DataGrid \n                    gridName='Tubular-React' \n                    bodyRenderer={ \n                        (row: any, index: any) => \n                            <TableRow hover={true} key={index}> \n                                <TableCell padding='default'> \n                                    {row.OrderID} \n                                </TableCell> \n                                <TableCell padding='default'> \n                                    {row.CustomerName} \n                                </TableCell> \n                                <TableCell padding='default'> \n                                    {row.ShipperCity} \n                                </TableCell> \n                            </TableRow> \n                    } \n                    toolbarOptions={new ToolbarOptions()} \n                    footerRenderer={ \n                        (aggregates: any) => \n                            <TableRow> \n                                <TableCell>Total: </TableCell> \n                                <TableCell>{aggregates && aggregates.CustomerName}</TableCell> \n                                <TableCell /> \n                            </TableRow> \n                    } \n                /> \n            </div> \n        ); \n    } \n} \n  \nexport default withRemoteDataSource(SampleFeatures, columns, 'http://tubular.azurewebsites.net/api/orders/paged'); \n";

export default withStyles(styles)((props) => {
    const { classes } = props;
    return (
        <div>
            <Grid container={true} spacing={24} className={classes.container}>
                <Grid item={true} xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Typography variant='display1'>
                            What is it?
                        </Typography>
                        <Divider />
                        <Typography paragraph={true} variant='subheading' className={classes.content}>
                            Tubular React is a set of ReactJS components designed to rapidly build modern
                            web applications.
                            The centerpiece of Tubular is its fully templated grid with lots of features such as
                            server-side pagination, searching text, multi-column sorting, and filtering,
                            built-in export to CSV or been printed.
                            Another very styled and useful component is the grid list that renders a set of cards with
                            the general information allowing good data visualization and quickly searching,
                            besides it has almost the same grid functionalities.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item={true} xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <Typography variant='display1'>
                            Features
                        </Typography>
                        <Divider />
                        <Typography paragraph={true} variant='subheading' className={classes.content}>
                            The main component is a grid with multiple options:
                            <ul>
                                <li>Define a custom layout for columns and cells using render methods.</li>
                                <li>
                                    Use a remote or local datasource.
                                    Remote datasource use a specific Request and Response format.
                                </li>
                                <li>Sort and filter multiple columns.</li>
                                <li>Free-text search of string columns.</li>
                                <li>Page data. Remote data is paged in the server side.</li>
                                <li>Export data to a CSV file.</li>
                                <li>Print data.</li>
                            </ul>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item={true} xs={12} md={6}>
                    <Paper className={classes.paperSmall}>
                        <Typography variant='display1'>
                            Dependencies
                        </Typography>
                        <Divider />
                        <Typography paragraph={true} variant='subheading' >
                            <ul>
                                <li>
                                    <a href='https://material-ui-next.com'>Material-UI Next - Version: Beta 34.</a>
                                </li>
                            </ul>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item={true} xs={12} md={6}>
                    <Paper className={classes.paperSmall}>
                        <Typography variant='display1'>
                            npm Installation
                        </Typography>
                        <Divider />
                        <Typography paragraph={true} variant='subheading' className={classes.content}>
                            <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                                $ npm install tubular-react --save
                            </SyntaxHighligther>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
});
