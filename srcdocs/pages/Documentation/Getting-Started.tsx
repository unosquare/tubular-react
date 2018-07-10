import { Divider, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as React from 'react';
import SyntaxHighligther from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import DocumentationList from '../../components/DocumentationList';

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
    paper: {
        padding: 10,
    }
};

// tslint:disable-next-line:max-line-length
const sample = "import DataGrid, {\n  AggregateFunctions,\n  ColumnDataType,\n  ColumnModel,\n  ColumnSortDirection,\n  ToolbarOptions,\n  withRemoteDataSource \n} from 'tubular-react'; \n \n import React from 'react'; \n \n const columns = [ \n new ColumnModel( 'OrderID', \n { DataType: ColumnDataType.NUMERIC, \n     Filtering: true, \n      IsKey: true, \n      Label: 'ID', \n      SortDirection: ColumnSortDirection.ASCENDING, \n      SortOrder: 1, \n      Sortable: true } \n  ), \n  new ColumnModel( 'CustomerName', \n    { Aggregate: AggregateFunctions.COUNT, \n      Filtering: true, \n      Searchable: true, \n      Sortable: true } \n  ),  new ColumnModel( 'ShipperCity' ) \n]; \n  \nclass SampleGrid extends React.Component { \n    public state = { \n        errorMessage: null as any \n    }; \n  \n    public componentWillReceiveProps(nextProps: any) { \n        this.setState({ errorMessage: nextProps.error }); \n    } \n  \n    public render() { \n        const { errorMessage } = this.state; \n        return ( \n            <div className='root'> \n                {errorMessage &&  \n                    <Snackbar \n                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} \n                        style={{ paddingTop: '10px' }} \n                        open={true} \n                        ContentProps={{ 'aria-describedby': 'message-id' }} \n                        message={<span id='message-id'>{errorMessage}</span>} \n                    /> \n                } \n                <DataGrid \n                    gridName='Tubular-React' \n                    bodyRenderer={ \n                        (row: any, index: any) => \n                            <TableRow hover={true} key={index}> \n                                <TableCell padding='default'> \n                                    {row.OrderID} \n                                </TableCell> \n                                <TableCell padding='default'> \n                                    {row.CustomerName} \n                                </TableCell> \n                                <TableCell padding='default'> \n                                    {row.ShipperCity} \n                                </TableCell> \n                            </TableRow> \n                    } \n                    toolbarOptions={new ToolbarOptions()} \n                    footerRenderer={ \n                        (aggregates: any) => \n                            <TableRow> \n                                <TableCell>Total: </TableCell> \n                                <TableCell>{aggregates && aggregates.CustomerName}</TableCell> \n                                <TableCell /> \n                            </TableRow> \n                    } \n                /> \n            </div> \n        ); \n    } \n} \n  \nexport default withRemoteDataSource(SampleFeatures, columns, 'http://tubular.azurewebsites.net/api/orders/paged'); \n";

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
                        <Typography variant='display1' paragraph={true}>
                            Getting Started
                        </Typography>
                        <Divider />
                        <br />
                        <Typography variant='headline' paragraph={true}>
                            Installation
                        </Typography>
                        <Typography variant='subheading' paragraph={true}>
                            Tubular-React is available as an npm package.
                        </Typography>
                        <Typography variant='headline' paragraph={true}>
                            Dependencies
                        </Typography>
                        <Typography variant='body1' paragraph={true}>
                            <ul>
                                <li>
                                    <a href='https://material-ui-next.com'>Material-UI Next - Version: Beta 34.</a>
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant='headline' paragraph={true}>
                            npm
                        </Typography>
                        <Typography variant='body1' paragraph={true}>
                            To install and save in your
                            <code className={classes.codeTag}>package.json</code> dependencies, run:
                        </Typography>
                        <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                            {'npm install tubular-react --save'}
                        </SyntaxHighligther>
                        <Divider />
                        <Typography variant='headline' paragraph={true}>
                            Usage
                        </Typography>
                        <Typography variant='subheading' paragraph={true}>
                            Tubular React is an extension of Material-UI to use a grid populated from server-side.
                        </Typography>
                        <Typography variant='headline' paragraph={true}> Quick Start </Typography>
                        <Typography variant='body1' paragraph={true}>
                            Here is a quick example to get you started, it's all you need:
                        </Typography>
                        <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                            {sample}
                        </SyntaxHighligther>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
});
