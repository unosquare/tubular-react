import {
  Divider,
  Grid,
  Paper,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { IconButton, Tooltip } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import Highlight from 'react-highlight';
import GitHubIcon from '../components/Github';

import * as React from 'react';

import 'highlight.js/styles/an-old-hope.css';
import BasicFeatures from '../../srcdocs/components/BasicFeatures';
import SampleButtonsFeatures from '../../srcdocs/components/SampleButtonsFeatures';
import SampleFeatures from '../../srcdocs/components/SampleFeatures';
import SampleGridList from '../../srcdocs/components/SampleGridList';

import {
  basicFeatures,
  buttonFeatures,
  gridList,
  simpleFeatures,
} from '../utils/codeSnipetExamples';

const styles = {
  code: {
    fontSize: 15,
  },
  container: {
    margin: '0',
    padding: 30,
    width: '100%',
  },
  content: {
    marginTop: 10,
  },
  icon: {
    height: 24,
    viewBox: '0 0 24 24',
    width: 24,
  },
  paper: {
    padding: 20,
  },
};

const bar: any = {
  textAlign: 'right',
};

interface IState {
  openBasic: boolean;
  openSampleFeatures: boolean;
  openSample: boolean;
  openGridList: boolean;
  showCode: boolean;
  value: string;
}

export default withStyles(styles)(
  class extends React.Component<WithStyles<keyof typeof styles>, IState> {
    public state = {
      openBasic: false,
      openGridList: false,
      openSampleFeatures: false,
      openSample: false,
      showCode: false,
      value: 'one',
    };
    public handleClickBasic = () => {
      this.setState({ openBasic: !this.state.openBasic });
    }
    public handleClickSample = () => {
      this.setState({ openSample: !this.state.openSample });
    }
    public handleClickSampleFeatures = () => {
      this.setState({ openSampleFeatures: !this.state.openSampleFeatures });
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
                <Typography variant='h4'>Samples</Typography>
                <Divider />
                <br />
                <Grid item={true} xs={12} className={classes.paper}>
                <Typography variant='h5' gutterBottom={true}>
                    Very basic grid sample
                  </Typography>
                  <Typography variant='h6'>
                  Basic grid with sorting, paging and filtering functionalities. Showing how
                  different data types are displayed. To implement it you must declare each column and
                  their own funcionalities.
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
                      <Tooltip
                        title={this.state.openBasic ? 'Hide Code' : 'View Code'}
                      >
                        <IconButton onClick={this.handleClickBasic}>
                          <CodeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Edit in CodeSandbox'>
                        <IconButton
                          component='a'
                          href='https://codesandbox.io/s/lp594wqr1q'
                          target='_blank'
                          color='inherit'
                        >
                          <CreateIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <Collapse in={this.state.openBasic} timeout='auto'>
                      <Paper>
                        <Highlight
                          language='javascript'
                          className={classes.code}
                        >
                          {basicFeatures}
                        </Highlight>
                      </Paper>
                    </Collapse>
                    <BasicFeatures />
                  </Grid>
                </Grid>
                <Divider />
                <Grid item={true} xs={12} className={classes.paper}>
                  <Typography variant='h5' gutterBottom={true}>
                    Full grid features
                  </Typography>
                  <Typography variant='h6'>
                    The grid can be extended to include features like sorting,
                    filtering, free-text searches, paging and
                    change the number of rows per page. Also, you can 
                    easily print or export the current view or entire dataset to CSV
                    using client-side only.
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
                      <Tooltip
                        title={
                          this.state.openSample ? 'Hide Code' : 'View Code'
                        }
                      >
                        <IconButton onClick={this.handleClickSample}>
                          <CodeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Edit in CodeSandbox'>
                        <IconButton
                          component='a'
                          href='https://codesandbox.io/s/434rlkr2y9'
                          target='_blank'
                          color='inherit'
                        >
                          <CreateIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <Collapse in={this.state.openSample} timeout='auto'>
                      <Paper>
                        <Highlight
                          language='javascript'
                          className={classes.code}
                        >
                          {simpleFeatures}
                        </Highlight>
                      </Paper>
                    </Collapse>
                    <SampleFeatures />
                  </Grid>
                </Grid>
                <Divider />
                <Grid item={true} xs={12} className={classes.paper}>
                  <Typography variant='h5' gutterBottom={true}>
                    How to include functionality buttons
                  </Typography>
                  <Typography variant='h6'>
                    You can add functionalities to the DataGrid including extra
                    buttons that can perform an action according to your
                    requirements. You just need to include the IconButton Component from
                    @material-ui and define the icon or button that you need
                    between DataGrid tags and specify the action to perform.
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
                      <Tooltip
                        title={this.state.openSampleFeatures ? 'Hide Code' : 'View Code'}
                      >
                        <IconButton onClick={this.handleClickSampleFeatures}>
                          <CodeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Edit in CodeSandbox'>
                        <IconButton
                          component='a'
                          href='https://codesandbox.io/s/1ox0q89rl7'
                          target='_blank'
                          color='inherit'
                        >
                          <CreateIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <Collapse in={this.state.openSampleFeatures} timeout='auto'>
                      <Paper>
                        <Highlight
                          language='javascript'
                          className={classes.code}
                        >
                          {buttonFeatures}
                        </Highlight>
                      </Paper>
                    </Collapse>
                    <SampleButtonsFeatures />
                  </Grid>
                </Grid>
                <Divider />
                <Grid item={true} xs={12} className={classes.paper}>
                  <Typography variant='h5' gutterBottom={true}>
                    Give another presentation to your data.
                  </Typography>
                  <Typography variant='h6'>
                    You can provide to your data a styled view that allows you
                    perform free-text searches and immediately reflect the
                    changes over your data.
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
                      <Tooltip
                        title={
                          this.state.openGridList ? 'Hide Code' : 'View Code'
                        }
                      >
                        <IconButton onClick={this.handleClickGrid}>
                          <CodeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Edit in CodeSandbox'>
                        <IconButton
                          component='a'
                          href='https://codesandbox.io/s/8ywpr3ooq8'
                          target='_blank'
                          color='inherit'
                        >
                          <CreateIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <Collapse in={this.state.openGridList} timeout='auto'>
                      <Paper>
                        <Highlight
                          language='javascript'
                          className={classes.code}
                        >
                          {gridList}
                        </Highlight>
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
  },
);
