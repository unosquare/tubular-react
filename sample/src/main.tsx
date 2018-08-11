import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';

import CustomLayoutDataGrid from './CustomLayoutDataGrid';
import LocalDataGrid from './localDataGrid';
import RemoteDataGrid from './remoteDataGrid';
import RemoteGridList from './remoteGridList';

const styles = (theme: any) => ({
  logo: {
    color: 'rgb(255, 255, 255)',
    display: 'block',
    fontFamily: 'Roboto',
    height: 50,
    maxWidth: 150,
    width: 150
  },
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

  public render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <img
            className={classes.logo}
            src='https://unosquare.github.io/tubular-react/static/tubular.png'
            alt='Tubular'
          />
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label='Remote DataGrid' />
            <Tab label='Local DataGrid' />
            <Tab label='Custom DataGrid' />
            <Tab label='Grid List' />
          </Tabs>
        </AppBar>
        {value === 0 && <RemoteDataGrid />}
        {value === 1 && <LocalDataGrid />}
        {value === 2 && <CustomLayoutDataGrid />}
        {value === 3 && <RemoteGridList />}
      </div>
    );
  }
}

export default withStyles(styles)(Main);
