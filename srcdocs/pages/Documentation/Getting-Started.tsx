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
const basicFeatures = "import * as React from 'react';\n\nimport { TableCell, TableRow } from '@material-ui/core';\nimport { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';\nimport { format } from 'date-fns';\nimport DataGrid, {\n    AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection, withRemoteDataSource } from '../../src';\n\n//  First, at all, you must define your columns model.\nconst columns = [\n    new ColumnModel('OrderID',\n        {\n            DataType: ColumnDataType.NUMERIC,\n            Filtering: true,\n            IsKey: true,\n            Label: 'ID',\n            SortDirection: ColumnSortDirection.ASCENDING,\n            SortOrder: 1,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('CustomerName',\n        {\n            Aggregate: AggregateFunctions.COUNT,\n            Filtering: true,\n            Searchable: true,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('ShippedDate',\n        {\n            DataType: ColumnDataType.DATE_TIME,\n            Filtering: true,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('ShipperCity'),\n    new ColumnModel('Amount',\n        {\n            DataType: ColumnDataType.NUMERIC,\n            Sortable: true\n        }\n    ),\n    new ColumnModel('IsShipped',\n        {\n            DataType: ColumnDataType.BOOLEAN,\n            Filtering: true,\n            Sortable: true\n        }\n    )\n];\nconst MyComponent = () => {\n        return (\n            <div className='root'>\n                <DataGrid\n                    gridName='Tubular-React'\n                />\n            </div>\n        );\n};\n\n/*\n Use the component withRemoteDataSource to wrap your component\n and columns definition among the data obtained from the URL.\n\n withRemoteDataSource will set an initial context for your grid.\n*/\nexport default withRemoteDataSource(MyComponent, columns, 'http://tubular.azurewebsites.net/api/orders/paged');\n";

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
                            Tubular-React is available as
                            an <a href='https://www.npmjs.com/package/tubular-react' target='_blank'>npm package</a>.
                        </Typography>
                        <Typography variant='headline' paragraph={true}>
                            Dependencies
                        </Typography>
                        <Typography variant='body1' paragraph={true}>
                            <ul>
                                <li>
                                    <a href='https://github.com/axios/axios'>axios - Version: 0.18.0</a>
                                </li>
                                <li>
                                    <a href='https://date-fns.org/'>date-fns - Version: 1.29.0</a>
                                </li>
                                <li>
                                    <a href='https://lodash.com/'>Lodash - Version: 4.17.10</a>
                                </li>
                                <li>
                                    <a href='https://material-ui.com/'>Material-UI - Version: 1.2.0.</a>
                                </li>
                                <li>
                                    <a href='https://reactjs.org/'>React - Version: 16.4.1</a>
                                </li>
                                <li>
                                    <a href='https://reactjs.org/docs/react-dom.html'>React-DOM - Version: 16.4.1</a>
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
                        <br/>
                        <Typography variant='headline' paragraph={true}>
                            Usage
                        </Typography>
                        <Typography variant='subheading' paragraph={true}>
                            Tubular React is an extension of Material-UI which offers until now a couple of useful
                            components:
                            <br/><code className={classes.codeTag}>{'<DataGrid />'}</code> and <code className={classes.codeTag}>{'<GridList />'}</code>.
                            <br/>
                            These components supply an organized and nice way to represent your data,
                            you can populate them from a server-side data source or
                            a local data source as an array.
                        </Typography>
                        <Typography variant='headline' paragraph={true}> Quick Start </Typography>
                        <Typography variant='body1' paragraph={true}>
                            Here is a quick example with all basic features to get you started:
                        </Typography>
                        <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                            {basicFeatures}
                        </SyntaxHighligther>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
});
