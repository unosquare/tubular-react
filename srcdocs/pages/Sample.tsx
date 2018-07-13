import { Divider, Grid, Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { IconButton, Tooltip } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import SyntaxHighligther from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import GitHubIcon from '../components/Github';

import * as React from 'react';
import BasicFeatures from '../../srcdocs/components/BasicFeatures';
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
    openBasic: boolean;
    openSample: boolean;
    openGridList: boolean;
    showCode: boolean;
    value: string;
}

// tslint:disable-next-line:max-line-length
const simpleFeatures = "import * as React from 'react';\n\nimport { Snackbar, TableCell, TableRow } from '@material-ui/core';\nimport { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';\n import { format } from 'date-fns';\nimport DataGrid, {\n  AggregateFunctions,\n  ColumnDataType,\n  ColumnModel,\n  ColumnSortDirection,\n  ToolbarOptions,\n  withRemoteDataSource \n} from 'tubular-react'; \n \n const columns = [ \n new ColumnModel( 'OrderID', \n { DataType: ColumnDataType.NUMERIC, \n     Filtering: true, \n      IsKey: true, \n      Label: 'ID', \n      SortDirection: ColumnSortDirection.ASCENDING, \n      SortOrder: 1, \n      Sortable: true } \n  ), \n  new ColumnModel( 'CustomerName', \n    { Aggregate: AggregateFunctions.COUNT, \n      Filtering: true, \n      Searchable: true, \n      Sortable: true } \n  ),  new ColumnModel( 'ShipperCity' ) \n]; \n  \nclass SampleGrid extends React.Component { \n    public state = { \n        errorMessage: null as any \n    }; \n  \n    public componentWillReceiveProps(nextProps: any) { \n        this.setState({ errorMessage: nextProps.error }); \n    } \n  \n    public render() { \n        const { errorMessage } = this.state; \n        return ( \n            <div className='root'> \n                {errorMessage &&  \n                    <Snackbar \n                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} \n                        style={{ paddingTop: '10px' }} \n                        open={true} \n                        ContentProps={{ 'aria-describedby': 'message-id' }} \n                        message={<span id='message-id'>{errorMessage}</span>} \n                    /> \n                } \n                <DataGrid \n                    gridName='Tubular-React' \n                    bodyRenderer={ \n                        (row: any, index: any) => \n                            <TableRow hover={true} key={index}> \n                                <TableCell padding='default'> \n                                    {row.OrderID} \n                                </TableCell> \n                                <TableCell padding='default'> \n                                    {row.CustomerName} \n                                </TableCell> \n                                <TableCell padding='default'> \n                                    {row.ShipperCity} \n                                </TableCell> \n                            </TableRow> \n                    } \n                    toolbarOptions={new ToolbarOptions()} \n                    footerRenderer={ \n                        (aggregates: any) => \n                            <TableRow> \n                                <TableCell>Total: </TableCell> \n                                <TableCell>{aggregates && aggregates.CustomerName}</TableCell> \n                                <TableCell /> \n                            </TableRow> \n                    } \n                /> \n            </div> \n        ); \n    } \n} \n  \nexport default withRemoteDataSource(SampleFeatures, columns, 'https://tubular.azurewebsites.net/api/orders/paged'); \n";
// tslint:disable-next-line:max-line-length
const basicFeatures = "import * as React from 'react';\n\nimport DataGrid, {\n    AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection, withRemoteDataSource } from 'tubular-react';\n\n//  First, at all, you must define your columns model.\nconst columns = [\n    new ColumnModel('OrderID',\n        {\n            DataType: ColumnDataType.NUMERIC,\n            Filtering: true,\n            IsKey: true,\n            Label: 'ID',\n            SortDirection: ColumnSortDirection.ASCENDING,\n            SortOrder: 1,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('CustomerName',\n        {\n            Aggregate: AggregateFunctions.COUNT,\n            Filtering: true,\n            Searchable: true,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('ShippedDate',\n        {\n            DataType: ColumnDataType.DATE_TIME,\n            Filtering: true,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('ShipperCity'),\n    new ColumnModel('Amount',\n        {\n            DataType: ColumnDataType.NUMERIC,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('IsShipped',\n        {\n            DataType: ColumnDataType.BOOLEAN,\n            Filtering: true,\n            Sortable: true\n        }\n    )\n];\nconst MyComponent = () => {\n        return (\n            <div className='root'>\n                <DataGrid\n                    gridName='Tubular-React'\n                />\n            </div>\n        );\n};\n\n/*\n Use the component withRemoteDataSource to wrap your component\n and columns definition among the data obtained from the URL.\n\n withRemoteDataSource will set an initial context for your grid.\n*/\nexport default withRemoteDataSource(MyComponent, columns, 'http://tubular.azurewebsites.net/api/orders/paged');\n";
// tslint:disable-next-line:max-line-length
const gridList = "import { LinearProgress, Paper } from '@material-ui/core';\nimport { Card, CardActions, CardContent } from '@material-ui/core';\nimport { GridList, GridListTile, Typography } from '@material-ui/core';\nimport { Button } from '@material-ui/core';\nimport { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@material-ui/core';\nimport { format } from 'date-fns';\nimport * as React from 'react';\nimport {\nDataSourceContext,\nPaginator,\nTextSearchInput,\nwithRemoteDataSource\n} from 'tubular-react';\n\nconst styles: any = {\nprogress: {\n    height: '20px'\n},\nsearch: {\n    margin: '15px 10px 10px 10px',\n    textAlign: 'right'\n}\n};\n\nconst columns = [\n    new ColumnModel('OrderID',\n        {\n            DataType: ColumnDataType.NUMERIC,\n            Filtering: true,\n            IsKey: true,\n            Label: 'ID',\n            SortDirection: ColumnSortDirection.ASCENDING,\n            SortOrder: 1,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('CustomerName',\n        {\n            Aggregate: AggregateFunctions.COUNT,\n            Filtering: true,\n            Searchable: true,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('ShippedDate',\n        {\n            DataType: ColumnDataType.DATE_TIME,\n            Filtering: true,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('ShipperCity'),\n    new ColumnModel('Amount',\n        {\n            DataType: ColumnDataType.NUMERIC,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('IsShipped',\n        {\n            DataType: ColumnDataType.BOOLEAN,\n            Filtering: true,\n            Sortable: true\n        }\n    )\n];\nclass SampleGridList extends React.Component<any, any> {\npublic state = {\n    errorMessage: null as any\n};\n\npublic componentWillReceiveProps(nextProps: any) {\n    this.setState({ errorMessage: nextProps.error });\n}\n\npublic render() {\n    return (\n        <DataSourceContext.Consumer>\n            {({ state }) =>\n                <Paper >\n                    <div style={styles.search}>\n                        <TextSearchInput />\n                    </div>\n                    <div style={styles.progress} >{state.isLoading && <LinearProgress />}</div>\n                    <Table>\n                        <TableBody>\n                            <TableRow>\n                                <TableCell>\n                                    <GridList cellHeight={180} cols={5}>\n                                        {state.data.map((dato) => (\n                                            <GridListTile key={dato.OrderID}>\n                                                <Card>\n                                                    <CardContent>\n                                                        <Typography\n                                                            gutterBottom={true}\n                                                            variant='headline'\n                                                            component='h2'\n                                                        >\n                                                            {dato.OrderID} - {dato.CustomerName}\n                                                        </Typography>\n                                                        <Typography component='p'>\n                                                            {dato.ShipperCity}\n                                                        </Typography>\n                                                        <Typography component='p'>\n                                                            {format(dato.ShippedDate, 'MMM D YYYY')}\n                                                        </Typography>\n                                                    </CardContent>\n                                                    <CardActions>\n                                                        <Button size='small' color='primary'>\n                                                            Learn More\n                                                    </Button>\n                                                    </CardActions>\n                                                </Card>\n                                            </GridListTile>\n                                        ))}\n                                    </GridList>\n                                </TableCell>\n                            </TableRow>\n                        </TableBody>\n                        <TableFooter>\n                            <TableRow>\n                                <Paginator advancePagination={false} />\n                            </TableRow>\n                        </TableFooter>\n                    </Table>\n                </Paper>}\n        </DataSourceContext.Consumer>\n    );\n}\n}\n\nexport default withRemoteDataSource(SampleGridList, columns, 'https://tubular.azurewebsites.net/api/orders/paged');\n";
export default withStyles(styles)(class extends React.Component<WithStyles<keyof typeof styles>, IState> {
    public state = {
        openBasic: false,
        openGridList: false,
        openSample: false,
        showCode: false,
        value: 'one'
    };
    public handleClickBasic = () => {
        this.setState({ openBasic: !this.state.openBasic });
    }
    public handleClickSample = () => {
        this.setState({ openSample: !this.state.openSample });
    }
    public handleClickGrid = () => {
        this.setState({ openGridList: !this.state.openGridList });
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
                                <Typography variant='headline' gutterBottom={true}>
                                    Basic grid features
                                </Typography>
                                <Typography variant='subheading'>
                                    Very basic grid sample
                                </Typography>
                                <Grid item={true} xs={12}>
                                    <div style={bar}>
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
                                        <Tooltip title={this.state.openBasic ? 'Hide Code' : 'View Code'}>
                                            <IconButton onClick={this.handleClickBasic}>
                                                <CodeIcon />
                                            </IconButton >
                                        </Tooltip>
                                        <Tooltip title='Edit in CodeSandbox'>
                                            <IconButton
                                                component='a'
                                                href='https://codesandbox.io/s/kwnp3qqv8v'
                                                target='_blank'
                                                color='inherit'
                                            >
                                                <CreateIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <Collapse in={this.state.openBasic} timeout='auto'>
                                        <Paper >
                                            <SyntaxHighligther
                                                language='tsx'
                                                style={docco}
                                                className={classes.code}
                                            >
                                                {basicFeatures}
                                            </SyntaxHighligther>
                                        </Paper>
                                    </Collapse>
                                    <BasicFeatures />
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid item={true} xs={12} className={classes.paper}>
                                <Typography variant='headline' gutterBottom={true}>Full grid features</Typography>
                                <Typography variant='subheading'>
                                    The grid can be extended to include features like sorting, filtering,
                                    free-text searches, move across the pages and change the number of rows per page
                                    Although easily you can print or export the current view
                                        or entire dataset to CSV using client-side only.
                                </Typography>
                                <Grid item={true} xs={12}>
                                    <div style={bar}>
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
                                        <Tooltip title={this.state.openSample ? 'Hide Code' : 'View Code'}>
                                            <IconButton onClick={this.handleClickSample}>
                                                <CodeIcon />
                                            </IconButton >
                                        </Tooltip>
                                        <Tooltip title='Edit in CodeSandbox'>
                                            <IconButton
                                                component='a'
                                                href='https://codesandbox.io/s/4xxwrpr7vw'
                                                target='_blank'
                                                color='inherit'
                                            >
                                                <CreateIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <Collapse in={this.state.openSample} timeout='auto'>
                                        <Paper >
                                            <SyntaxHighligther
                                                language='tsx'
                                                style={docco}
                                                className={classes.code}
                                            >
                                                {simpleFeatures}
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
                                <Grid item={true} xs={12}>
                                    <div style={bar}>
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
                                        <Tooltip title={this.state.openGridList ? 'Hide Code' : 'View Code'}>
                                            <IconButton onClick={this.handleClickGrid}>
                                                <CodeIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Edit in CodeSandbox'>
                                            <IconButton
                                                component='a'
                                                href='https://codesandbox.io/s/wmkrjlp77'
                                                target='_blank'
                                                color='inherit'
                                            >
                                                <CreateIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <Collapse in={this.state.openGridList} timeout='auto'>
                                        <Paper >
                                            <SyntaxHighligther
                                                language='tsx'
                                                style={docco}
                                                className={classes.code}
                                            >
                                                {gridList}
                                            </SyntaxHighligther>
                                        </Paper>
                                    </Collapse>
                                    <SampleGridList />
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
});
