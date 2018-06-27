import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

import RemoteDataGrid from './remoteDataGrid';
import LocalDataGrid from './localDataGrid';

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
});

class Main extends React.Component<any, any> {
  public state = {
    value: 0,
  };

  public handleChange = (event: any, value: any) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Remote Datasource" />
          <Tab label="Local Datasource" />
        </Tabs>
      </AppBar>
      {value === 0 &&<RemoteDataGrid />}
      {value === 1 &&<LocalDataGrid />}
    </div>
    );
  }
};

export default withStyles(styles)(Main);
