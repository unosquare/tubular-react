import { Button, Divider, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as React from 'react';
import SyntaxHighligther from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import DocumentationList from '../../components/DocumentationList';

const styles = {
    code: {
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
const remoteDataSource = "... \nconst MyComponent = () => {\n        return (\n            <div className='root'>\n                <DataGrid\n                    gridName='Tubular-React'\n                />\n            </div>\n        );\n};\n\n\n/*\n Use the component withRemoteDataSource to wrap your component\n and columns definition among the data obtained from the URL.\n\n withRemoteDataSource will set an initial context for your grid.\n*/\nexport default withRemoteDataSource(BasicFeatures, columns, 'http://tubular.azurewebsites.net/api/orders/paged');\n";
// tslint:disable-next-line:max-line-length
const localDataSource = "... \nconst MyComponent = () => {\n        return (\n            <div className='root'>\n                <DataGrid\n                    gridName='Tubular-React'\n                />\n            </div>\n        );\n};\n\n\nexport default withRemoteDataSource(BasicFeatures, columns, localData)";

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
                        <Typography variant='display1' paragraph={true}> Data Source </Typography>
                        <Divider />
                        <br />
                        <Typography variant='subheading'>
                            <code className={classes.code}>{'<DataGrid />'}</code> requires a
                            wrapper component to retrieve data. Depends on if we use a local data source or a remote
                            data source, these wrappers are:
                            <code className={classes.code}>withRemoteDataSource</code> component or
                            the <code className={classes.code}>withLocalDataSource</code> component,
                            which deals with data retrieval on the
                            <code className={classes.code}>DataGrid</code> component.

                            <br /><br />
                            <Typography variant='headline' gutterBottom={true}>
                                <code className={classes.code}>withRemoteDataSource</code>
                            </Typography>

                            <code className={classes.code}>withRemoteDataSource</code>
                            needs our <code className={classes.code}>DataGrid</code> component,
                            a <code className={classes.code}>ColumnModel</code> array
                            and a <code className={classes.code}>URL</code> which represent a service.

                            <br />
                            <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                                {remoteDataSource}
                            </SyntaxHighligther>
                            <br />
                            <Typography variant='headline' gutterBottom={true}>
                                <code className={classes.code}>LocalDataSource</code>
                            </Typography>

                            <code className={classes.code}>withLocalDataSource</code>
                            needs our <code className={classes.code}>DataGrid</code> component,
                            a <code className={classes.code}>ColumnModel</code> array
                            and an <code className={classes.code}>Array</code>of objects.
                            <br />
                            <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                                {localDataSource}
                            </SyntaxHighligther>
                            See this
                            <Button
                                color='primary'
                                href='https://github.com/unosquare/tubular-react/blob/master/sample/src/local/localData.ts'
                                target='_blank'
                            >
                                example
                            </Button>
                            of how to define the array of objects.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
});
