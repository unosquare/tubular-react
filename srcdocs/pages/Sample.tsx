import { Divider, Grid, Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import SyntaxHighligther from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import GitHubIcon from '../components/Github';

import * as React from 'react';
import SampleFeatures from '../../srcdocs/components/SampleFeatures';
import SampleGridList from '../../srcdocs/components/SampleGridList';

const styles = {
    code: {
        fontSize: 15,
    },
    container: {
        margin: '0',
        padding: 30,
        width: '100%'
    },
    content: {
        marginTop: 10,
    },
    icon: {
        height: 24,
        viewBox: '0 0 24 24',
        width: 24
    },
    paper: {
        padding: 20,
    }
};

const bar: any = {
    textAlign: 'right'
};

interface IState {
    open: boolean;
    showCode: boolean;
    value: string;
}

// tslint:disable-next-line:max-line-length
const sample = "import DataGrid, {\n  AggregateFunctions,\n  ColumnDataType,\n  ColumnModel,\n  ColumnSortDirection,\n  ToolbarOptions,\n  withRemoteDataSource \n} from 'tubular-react'; \n \n import React from 'react'; \n \n const columns = [ \n new ColumnModel( 'OrderID', \n { DataType: ColumnDataType.NUMERIC, \n     Filtering: true, \n      IsKey: true, \n      Label: 'ID', \n      SortDirection: ColumnSortDirection.ASCENDING, \n      SortOrder: 1, \n      Sortable: true } \n  ), \n  new ColumnModel( 'CustomerName', \n    { Aggregate: AggregateFunctions.COUNT, \n      Filtering: true, \n      Searchable: true, \n      Sortable: true } \n  ),  new ColumnModel( 'ShipperCity' ) \n]; \n  \nclass SampleGrid extends React.Component { \n    public state = { \n        errorMessage: null as any \n    }; \n  \n    public componentWillReceiveProps(nextProps: any) { \n        this.setState({ errorMessage: nextProps.error }); \n    } \n  \n    public render() { \n        const { errorMessage } = this.state; \n        return ( \n            <div className='root'> \n                {errorMessage &&  \n                    <Snackbar \n                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} \n                        style={{ paddingTop: '10px' }} \n                        open={true} \n                        ContentProps={{ 'aria-describedby': 'message-id' }} \n                        message={<span id='message-id'>{errorMessage}</span>} \n                    /> \n                } \n                <DataGrid \n                    gridName='Tubular-React' \n                    bodyRenderer={ \n                        (row: any, index: any) => \n                            <TableRow hover={true} key={index}> \n                                <TableCell padding='default'> \n                                    {row.OrderID} \n                                </TableCell> \n                                <TableCell padding='default'> \n                                    {row.CustomerName} \n                                </TableCell> \n                                <TableCell padding='default'> \n                                    {row.ShipperCity} \n                                </TableCell> \n                            </TableRow> \n                    } \n                    toolbarOptions={new ToolbarOptions()} \n                    footerRenderer={ \n                        (aggregates: any) => \n                            <TableRow> \n                                <TableCell>Total: </TableCell> \n                                <TableCell>{aggregates && aggregates.CustomerName}</TableCell> \n                                <TableCell /> \n                            </TableRow> \n                    } \n                /> \n            </div> \n        ); \n    } \n} \n  \nexport default withRemoteDataSource(SampleFeatures, columns, 'http://tubular.azurewebsites.net/api/orders/paged'); \n";

export default withStyles(styles)(class extends React.Component<WithStyles<keyof typeof styles>, IState> {
    public state = {
        open: false,
        showCode: false,
        value: 'one'
    };
    public handleClick = () => {
        this.setState({ open: !this.state.open });
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container={true} spacing={24} className={classes.container}>
                    <Grid item={true} xs={12} className={classes.paper}>
                        <Paper className={classes.paper}>
                            <Typography variant='display1'>
                                Samples
                            </Typography>
                            <Divider />
                            <br />
                            <Grid item={true} xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom={true}>Grid with Paginations</Typography>
                                <Typography variant='subheading'>
                                    The grid can be extended to include features like sorting, filtering,
                                    free-text searches, move across the pages and change the number of rows per page
                                    Although easily you can print or export the current view
                                        or entire dataset to CSV using client-side only.
                                </Typography>
                                <Grid item={true} xs={12}>
                                        <div  style={bar}>
                                            <Tooltip title='Tubular GitHub Repo'>
                                                <IconButton
                                                    component='a'
                                                    href='https://github.com/unosquare/tubular-react'
                                                    target='_blank'
                                                    color='inherit'
                                                >
                                                    <GitHubIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={this.state.open ? 'Hide Code' : 'View Code'}>
                                                <Button onClick={this.handleClick}>
                                                    {this.state.open ? <CodeIcon /> : <CodeIcon />}
                                                </Button >
                                            </Tooltip>
                                            <Tooltip title='Edit in CodeSandbox'>
                                                <IconButton
                                                    component='a'
                                                    href='https://codesandbox.io/s/64jwr7mx8r'
                                                    target='_blank'
                                                    color='inherit'
                                                >
                                                    <CreateIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <Collapse in={this.state.open} timeout='auto'>
                                            <Paper >
                                                <SyntaxHighligther
                                                    language='tsx'
                                                    style={docco}
                                                    className={classes.code}
                                                >
                                                    {sample}
                                                </SyntaxHighligther>
                                            </Paper>
                                        </Collapse>
                                    <SampleFeatures />
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid item={true} xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom={true}>
                                    Give another presentation to your data.
                                </Typography>
                                <Typography variant='subheading'>
                                    You can provide to your data a styled view that
                                    allows you perform free-text searches and immediately
                                    reflect the changes over your data.
                                </Typography>
                                <SampleGridList />
                            </Grid>
                            <Divider />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
});
