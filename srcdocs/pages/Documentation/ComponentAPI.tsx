import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/Styles/makeStyles';
import * as React from 'react';
import Highlight from 'react-highlight';
import ColumnModelList from '../../components/ColumnModelTable';
import DataGridProps from '../../components/DataGridProps';
import DataGridTableProps from '../../components/DataGridTableProps';
import ToolBarOptionsProps from '../../components/ToolBarOptionsProps';

const useStyles = makeStyles(() => ({
    codeTag: {
        background: '#F8F8FF',
        padding: '6px',
    },
    container: {
        margin: '0',
        padding: 30,
        width: '100%',
    },
    paper: {
        padding: 10,
    },
}));

const remoteDataSource =
    // tslint:disable-next-line:max-line-length
    "... \nconst MyComponent = () => {\n        return (\n            <div className='root'>\n                <DataGrid\n                    gridName='Tubular-React'\n                />\n            </div>\n        );\n};\n\n\n/*\n Use the component withRemoteDataSource to wrap your component\n and columns definition among the data obtained from the URL.\n\n withRemoteDataSource will set an initial context for your grid.\n*/\nexport default withRemoteDataSource(BasicFeatures, columns, 'https://tubular.azurewebsites.net/api/orders/paged');\n";
const localDataSource =
    // tslint:disable-next-line:max-line-length
    "... \nconst MyComponent = () => {\n        return (\n            <div className='root'>\n                <DataGrid\n                    gridName='Tubular-React'\n                />\n            </div>\n        );\n};\n\n\nexport default withRemoteDataSource(BasicFeatures, columns, localData)";
const localDataLink =
    // tslint:disable-next-line:max-line-length
    'https://github.com/unosquare/tubular-react/blob/master/sample/src/data/localData.ts';

export default () => {
    const classes = useStyles();
    return (
        <Grid container={true} spacing={24} className={classes.container}>
            <Grid item={true} xs={12}>
                <Paper className={classes.paper} style={{ overflowX: 'auto' }}>
                    <Typography variant='h4' paragraph={true}> Column Model </Typography>
                    <Divider />
                    <ColumnModelList />
                </Paper>
            </Grid>
            <Grid item={true} xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' paragraph={true}>DataGridProvider props</Typography>
                    <Divider />
                    <br />
                    <Typography variant='subtitle1'>
                        It's important to use <code className={classes.codeTag}>withRemoteDataSource</code> or
                            <code className={classes.codeTag}>withLocalDataSource</code> according to the case
                            to fill the <code className={classes.codeTag}>{'<DataGridProvider />'}</code> component
                        with the data.
                            <br />
                        These are all the available props (and their default values) for the
                            <code className={classes.codeTag}>{'<DataGridProvider />'}</code> component.
                        </Typography>
                    <DataGridProps />
                    <br />
                    <Typography variant='subtitle1'>
                        <i>If you don't define some of the optional props described above,
                            these will not be shown.</i>
                    </Typography>
                </Paper>
            </Grid>
            <Grid item={true} xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' paragraph={true}>DataGridTable props</Typography>
                    <Divider />
                    <br />
                    <Typography variant='subtitle1'>
                        These are all the available props (and their default values) for the
                            <code className={classes.codeTag}>{'<DataGridTable />'}</code> component.
                        </Typography>
                    <DataGridTableProps />
                    <br />
                    <Typography variant='subtitle1'>
                        <i>If you don't define some of the optional props described above,
                            these will not be shown. In the case of </i>
                        <code className={classes.codeTag}>bodyRenderer</code>,
                            <i>the grid will display its default body; if the
                            <code className={classes.codeTag}>footerRenderer</code>
                            is not defined, the footer will not be displayed.</i>
                    </Typography>
                </Paper>
            </Grid>
            <Grid item={true} xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' paragraph={true}>
                        Data Source
                </Typography>
                    <Divider />
                    <br />
                    <Typography variant='subtitle1'>
                        <code className={classes.codeTag}>{'<DataGrid />'}</code> requires a
                        wrapper component to retrieve data. Depends on if we use a local
                        data source or a remote data source, these wrappers are:
                    <code className={classes.codeTag}>withRemoteDataSource</code>
                        component or the
                    <code className={classes.codeTag}>withLocalDataSource</code>
                        component, which deals with data retrieval on the
                    <code className={classes.codeTag}>DataGrid</code> component.
                    <br />
                        <br />
                        <Typography variant='h5' gutterBottom={true}>
                            <code className={classes.codeTag}>withRemoteDataSource</code>
                        </Typography>
                        <code className={classes.codeTag}>withRemoteDataSource</code>
                        needs our <code className={classes.codeTag}>DataGrid</code>
                        component, a <code className={classes.codeTag}>ColumnModel</code>
                        array and a <code className={classes.codeTag}>URL</code> which
                        represent a service.
                    <br />
                        <Highlight language='javascript' className={'an-old-hope'}>
                            {remoteDataSource}
                        </Highlight>
                        <br />
                        <Typography variant='h5' gutterBottom={true}>
                            <code className={classes.codeTag}>LocalDataSource</code>
                        </Typography>
                        <code className={classes.codeTag}>withLocalDataSource</code>
                        needs our <code className={classes.codeTag}>DataGrid</code>
                        component, a <code className={classes.codeTag}>ColumnModel</code>
                        array and an <code className={classes.codeTag}>Array</code>of
                        objects.
                    <br />
                        <Highlight language='javascript' className={'an-old-hope'}>
                            {localDataSource}
                        </Highlight>
                        See this
                    <Button color='primary' href={localDataLink} target='_blank'>
                            example
                    </Button>
                        of how to define the array of objects.
            </Typography>
                </Paper>
            </Grid>
            <Grid item={true} xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' paragraph={true}>Toolbar options</Typography>
                    <Divider />
                    <br />
                    <Typography variant='subtitle1'>
                        If you need to personalize the grid adding, removing
                            or modifying  features, <code className={classes.codeTag}>ToolBarOptions Class</code>
                        provides several options.
                        </Typography>
                    <ToolBarOptionsProps />
                    <br />
                    <Typography variant='subtitle1'>
                        <i>If you don't define some of the optional props described above,
                            these will set with the default values.</i>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};
