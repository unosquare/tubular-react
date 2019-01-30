import { Divider, Grid, Link, Paper, Table, TableBody, TableHead, TableRow, TableCell, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as React from 'react';
import Highlight from 'react-highlight';

import { basicFeatures } from '../../utils/codeSnipetExamples';

const styles = {
  code: {
    fontSize: 15,
  },
  codeTag: {
    background: '#F8F8FF',
    padding: '6px',
  },
  container: {
    margin: '0',
    padding: 30,
    width: '100%',
  },
  content: {
    marginTop: 10,
  },
  image: {
    marginLeft: '25%',
    maxWidth: 300,
  },
  paper: {
    minHeight: '300px',
    padding: 30,
  },
  paperSmall: {
    minHeight: '115px',
    padding: 30,
  },
};

let id = 0;
function createData(name, type, language, description, url) {
  id += 1;
  return { id, name, type, language, description, url };
}

const rows = [
  createData('Tubular for AngularJS (formerly Tubular)', 'Library', 'AngularJs',
  'Tubular provides a set of directives and services using AngularJS as framework.',
  'https://github.com/unosquare/tubular'),
  createData('Tubular for Angular6 (formerly Tubular2)', 'Library', 'Angular6',
  'New Tubular2 with Angular6 (Angular2) and Angular Material 2.',
  'https://github.com/unosquare/tubular2'),
  createData('Tubular Common', 'Library', 'Javascript/Typescript	',
    'Tubular Common provides TypeScript and Javascript models and data transformer to use any Tubular DataGrid component with an array of Javascript objects.',
    'https://github.com/unosquare/tubular-common'),
  createData('Tubular Dotnet', 'Backend library', 'C#/.NET Core',
    'Tubular provides .NET Framework and .NET Core Library to create REST service to use with Tubular Angular Components easily with any WebApi library (ASP.NET Web API for example).',
    'https://github.com/unosquare/tubular-dotnet'),
  createData('Tubular Nodejs', 'Backend Library', '	Javascript',
    'Tubular Node.js provides an easy way to integrate Tubular Angular Components easily with any Node.js WebApi library.',
    'https://github.com/unosquare/tubular-nodejs'),
  createData('Tubular Boilerplate C#', 'Boilerplate	', '	C#',
    'Tubular Directives Boilerplate (includes AngularJS and Bootstrap).',
    'https://github.com/unosquare/tubular-boilerplate-csharp'),
  createData('Tubular Boilerplate', 'Boilerplate', 'Javascript/AngularJS',
    'Tubular Directives Boilerplate (includes AngularJS and Bootstrap).',
    'https://github.com/unosquare/tubular-boilerplate'),
  createData('Tubular ASP.NET Core 2.0 Boilerplate', 'Boilerplate', '	C#/.NET Core',
    'Tubular Directives Boilerplate (includes AngularJS and Bootstrap).',
    'https://github.com/unosquare/tubular-aspnet-core-boilerplate'),
];

const Home = ({ classes }: any) => (
  <Grid container={true} spacing={24} className={classes.container}>
    <Paper className={classes.paper}>
      <img src="..\..\static\tubularRed.png" />
      <Divider />
      <Typography
        paragraph={true}
        variant='subtitle1'
        className={classes.content}
      >
        Tubular React is a set of ReactJS components designed to rapidly
        build modern web applications. The centerpiece of Tubular is its
        fully templated grid with lots of features such as server-side
        pagination, searching text, multi-column sorting, and Filterable,
        built-in export to CSV or been printed. Another very styled and
        useful component is the grid list that renders a set of cards with
        the general information allowing good data visualization and quickly
        searching, besides it has almost the same grid functionalities.
          </Typography>
      <br />
      <Typography variant='h4'>Features</Typography>
      <Divider />
      <Typography
        paragraph={true}
        variant='subtitle1'
        className={classes.content}
      >
        <Typography variant='h5'>
          The main component is a <em>grid</em> with multiple options:
            </Typography>
        <ul>
          <li>
            Define a custom layout for columns and cells using render
            methods.
              </li>
          <li>
            Use a remote or local datasource. Remote datasource use a
            specific Request and Response format.
              </li>
          <li>Sort and filter multiple columns.</li>
          <li>Free-text search of string columns.</li>
          <li>Page data. Remote data is paged in the server side.</li>
          <li>Export data to a CSV file.</li>
          <li>Print data.</li>
        </ul>
        <br />
        The <em>grid</em> component offers all you can look for an easy grid
        table and more.
            <br />
        <br />
        <Typography variant='h5'>
          <em>Grid list</em> component allows you to perform some of the
          same options as:
            </Typography>
        <ul>
          <li>Define a custom layout for columns and cells.</li>
          <li>Use a remote or local datasource.</li>
          <li>Free-text search of string columns.</li>
          <li>Page data. Remote data is paged in the server side.</li>
        </ul>
        <br />
        The <em>grid list</em> component represents another option to show
        your data.
            <br />
        <em>Grid list</em> provide a styled and fancy view over your data,
        which helps you to quickly find information.
          </Typography>
      <br />
      <Typography variant='h4'>
        Installation
      </Typography>
      <Divider />
      <Typography variant='subtitle1' paragraph={true}>
        Tubular-React is available as a <a
          href='https://www.npmjs.com/package/tubular-react'
          target='_blank'
        >
          npm package
          </a>
      </Typography>
      <Typography variant='h5' paragraph={true}>
        Dependencies
      </Typography>
      <Typography variant='body1' paragraph={true}>
        <ul>
          <li>
            <a href='https://date-fns.org/'>date-fns - Version: 1.29.0</a>
          </li>
          <li>
            <a href='https://material-ui.com/'>
              Material-UI - Version: 3.1.0
                  </a>
          </li>
          <li>
            <a href='https://reactjs.org/'>React - Version: 16.5.1</a>
          </li>
          <li>
            <a href='https://github.com/unosquare/tubular-common'>
              Tubular Common - Version: 1.2.1
                  </a>
          </li>
        </ul>
      </Typography>
      <Typography variant='h5' paragraph={true}>
        npm
      </Typography>
      <Typography variant='body1' paragraph={true}>
        To install and save in your <code className={classes.codeTag}>package.json</code> dependencies, run:
      </Typography>
      <Highlight language='javascript' className={classes.code}>
        {'npm install tubular-react --save'}
      </Highlight>
      <br />
      <Typography variant='h4'>
        Usage
      </Typography>
      <Divider />
      <Typography variant='subtitle1' paragraph={true}>
        Tubular React is an extension of Material-UI which offers until
        now a couple of useful components:
              <br />
        <code className={classes.codeTag}>{'<DataGrid />'}</code> and
              <code className={classes.codeTag}>{'<GridList />'}</code>.
              <br />
        These components supply an organized and nice way to represent
        your data, you can populate them from a server-side data source or
        a local data source as an array.
            </Typography>
      <Typography variant='h5' paragraph={true}>

        Quick Start
        </Typography>
      <Typography variant='body1' paragraph={true}>
        Here is a quick example with all basic features to get you
        started:
            </Typography>
      <Highlight language='javascript' className={classes.code}>
        {basicFeatures}
      </Highlight>
      <Typography variant='h5' paragraph={true}>
        Extend Grid Functionalities
            </Typography>
      <Typography variant='subtitle1' paragraph={true}>
        You can add functionalities to the `DataGrid`, including extra
        buttons that can perform an action according to your requirements.
        You just need to include the IconButton Component from @material-ui and
        define the icon or button that you need between `DataGrid` tags
        and specify the action to perform.
              <br />
        <Highlight language='javascript' className={classes.code}>
          {`
              const MyComponent = () => {

              <DataGrid gridName='Tubular-React'>
                <IconButton color='default' />
                  <Brightness7Rounded
                    onClick={() => alert('Happy codes, have a nice day')}
                  />
                </IconButton>
              </DataGrid>

            };
              `}
        </Highlight>
      </Typography>
      <br/>
      <Typography variant='h4'>
        Related projects
      </Typography>
      <Divider />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Language/Tech</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
                <TableCell><a href={row.url}>{row.name}</a></TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.language}</TableCell>
                <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Grid>
);

export default withStyles(styles)(Home);
