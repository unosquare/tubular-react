import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';

import LocalDataGrid from './localDataGrid';
import RemoteDataGrid from './remoteDataGrid';
import LocalGridList from './localGridList';

const styles = (theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  }
});

class Main extends React.Component<any, any> {
  public state = {
    value: 0,
  };

  public handleChange = (event: any, value: any) => {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Remote Datasource" />
            <Tab label="Local Datasource" />
            <Tab label="Grid List" />
          </Tabs>
        </AppBar>
        {value === 0 && <RemoteDataGrid />}
        {value === 1 && <LocalDataGrid />}
        {value === 2 && <LocalGridList />}
      </div>
    );
  }
};

export default withStyles(styles)(Main);
