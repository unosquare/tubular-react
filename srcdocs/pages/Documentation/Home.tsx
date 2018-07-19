import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
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
const quickStart = "import React from 'react';\nimport ReactDOM from 'react-dom';\n\nimport DataGrid, { withRemoteDataSource, ColumnModel } from 'tubular-react';\n\nconst columns = [\n  new ColumnModel('OrderID'),\n  new ColumnModel('CustomerName'),\n  new ColumnModel('ShipperCity')\n];\n\nconst SampleGrid = withRemoteDataSource(\n  () => {\n    return <DataGrid />;\n  },\n  columns,\n  'https://tubular.azurewebsites.net/api/orders/paged'\n);\n\nReactDOM.render(<SampleGrid />, document.getElementById('root'));";

export default withStyles(styles)((props) => {
    const { classes } = props;
    return (
        <div>
            <Grid container={true} spacing={24} className={classes.container}>
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
                    <br />
                    <Typography variant='display1'>
                        Features
                        </Typography>
                    <Divider />
                    <Typography paragraph={true} variant='subheading' className={classes.content}>
                        <Typography variant='headline'>
                            The main component is a <em>grid</em> with multiple options:
                        </Typography>
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
                        <br />
                        The <em>grid</em> component offers all you can look for an easy grid table and more.
                        <br /><br />
                        <Typography variant='headline'>
                            <em>Grid list</em> component allows you to perform some of the same options as:
                        </Typography>
                        <ul>
                            <li>Define a custom layout for columns and cells.</li>
                            <li>
                                Use a remote or local datasource.
                            </li>
                            <li>Free-text search of string columns.</li>
                            <li>Page data. Remote data is paged in the server side.</li>
                        </ul>
                        <br />
                        The <em>grid list</em> component represents another option to show your data.<br />
                        <em>Grid list</em> provide a styled and fancy view over your data, which helps
                            you to quickly find information.
                    </Typography>
                    <br />
                    <Typography variant='display1'>
                        Dependencies
                        </Typography>
                    <Divider />
                    <Typography paragraph={true} variant='subheading' >
                        <ul>
                            <li>
                                <a href='https://date-fns.org/'>date-fns - Version: 1.29.0</a>
                            </li>
                            <li>
                                <a href='https://material-ui.com/'>Material-UI - Version: 1.2.0.</a>
                            </li>
                            <li>
                                <a href='https://reactjs.org/'>React - Version: 16.4.1</a>
                            </li>
                        </ul>
                    </Typography>
                    <br />
                    <Typography variant='display1'>
                        npm Installation
                    </Typography>
                    <Divider />
                    <Typography paragraph={true} variant='subheading' className={classes.content}>
                        <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                            $ npm install tubular-react --save
                            </SyntaxHighligther>
                    </Typography>
                    <br />
                    <Typography variant='display1'>
                        Usage
                    </Typography>
                    <Divider />
                    <Typography paragraph={true} variant='subheading' className={classes.content}>
                        Here is a quick example to get you started, <b>it's all you need</b>:
                        <SyntaxHighligther language='tsx' style={docco} className={classes.code}>
                            {quickStart}
                        </SyntaxHighligther>
                        <em>Try it in <a href='https://codesandbox.io/s/6jror6xv9w' target='_blank'>CodeSandbox</a></em>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
});
