import { Divider, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as React from 'react';
import Highligther from 'react-highlighter';
import DocumentationList from '../../components/DocumentationList';
import { basicFeatures } from '../../utils/codeSnipetExamples';

const styles = {
  code: {
    fontSize: 15
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
    padding: 10
  }
};

const GettingStarted = (props: any) => {
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
              Tubular-React is available as an{' '}
              <a
                href='https://www.npmjs.com/package/tubular-react'
                target='_blank'
              >
                npm package
              </a>
              .
            </Typography>
            <Typography variant='headline' paragraph={true}>
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
            <Typography variant='headline' paragraph={true}>
              npm
            </Typography>
            <Typography variant='body1' paragraph={true}>
              To install and save in your
              <code className={classes.codeTag}>package.json</code>{' '}
              dependencies, run:
            </Typography>
            <Highligther language='tsx' className={classes.code}>
              {'npm install tubular-react --save'}
            </Highligther>
            <br />
            <Typography variant='headline' paragraph={true}>
              Usage
            </Typography>
            <Typography variant='subheading' paragraph={true}>
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
            <Typography variant='headline' paragraph={true}>
              {' '}
              Quick Start{' '}
            </Typography>
            <Typography variant='body1' paragraph={true}>
              Here is a quick example with all basic features to get you
              started:
            </Typography>
            <Highligther language='tsx' className={classes.code}>
              {basicFeatures}
            </Highligther>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(GettingStarted);
