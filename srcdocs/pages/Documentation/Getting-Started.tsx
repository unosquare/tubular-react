import { Typography } from 'material-ui';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import * as React from 'react';
import SyntaxHighligther from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import DocumentationList from '../../components/DocumentationList';

const styles = {
    code: {
        fontSize: 15,
    },
    container: {
        padding: 30,
    },
    paper: {
        padding: 10,
    }
};

// tslint:disable-next-line:max-line-length
const sample = "import DataGrid, {\n    AggregateFunctions,\n    ColumnDataType,\n    ColumnModel,\n    ColumnSortDirection,\n    RemoteDataSource\n} from 'tubular-react';\nimport React from 'react';\n\nconst columns = [\n    new ColumnModel('OrderID',\n        {\n            DataType: ColumnDataType.NUMERIC,\n            IsKey: true,\n            Label: 'ID',\n            SortDirection: ColumnSortDirection.ASCENDING,\n            SortOrder: 1\n        }\n    ),\n    new ColumnModel('CustomerName',\n        { Aggregate: AggregateFunctions.COUNT }\n    )\n];\n\nclass SamplePagination extends React.Component {\n    state = {\n        dataSource: new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns)\n    };\n    render() {\n        const { dataSource } = this.state;\n        return (\n            <DataGrid dataSource={dataSource}\n                rowsPerPage={10}\n                showBottomPager={true}\n                showTopPager={true}\n                gridName='table'\n            />\n        )\n    }\n}\n\nexport default SamplePagination;";

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
                        <Typography variant='headline' paragraph={true}>
                            Installation
                        </Typography>
                        <Typography variant='subheading' paragraph={true}>
                            Tubular React is available as an npm package.
                        </Typography>
                        <Typography variant='headline' paragraph={true}>
                            npm
                        </Typography>
                        <Typography variant='body1' paragraph={true}>
                            To install and save in your package.json dependencies, run:
                        </Typography>
                        <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                            {'npm install --save material-ui@next'}
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
