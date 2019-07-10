import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import makeStyles from '@material-ui/styles/makeStyles';

import * as React from 'react';

import CustomLayoutDataGrid from './CustomLayoutDataGrid';
import ErrorBoundary from './ErrorBoundary';
import LocalDataGrid from './localDataGrid';
import RemoteDataGrid from './remoteDataGrid';
import RemoteGridList from './remoteGridList';
import DataGridWithDialog from './DataGridWithDialog';

const useStyles = makeStyles(({ palette }: any) => ({
  logo: {
    color: 'rgb(255, 255, 255)',
    display: 'block',
    height: 50,
    maxWidth: 150,
    width: 150,
  },
  root: {
    backgroundColor: palette.background.paper,
    flexGrow: 1,
  },
}));

const Main: React.FunctionComponent = () => {
  const classes = useStyles();
  const [currentValue, setValue] = React.useState(0);

  const handleChange = (event: any, value: any) => setValue(value);

  return (
    <ErrorBoundary>
      <div className={classes.root}>
        <AppBar position='static'>
          <img
            className={classes.logo}
            src='https://unosquare.github.io/tubular-react/static/tubular.png'
            alt='Tubular React'
          />
          <Tabs value={currentValue} onChange={handleChange}>
            <Tab label='Remote DataGrid' />
            <Tab label='Local DataGrid' />
            <Tab label='Custom DataGrid' />
            <Tab label='Grid List' />
          </Tabs>
        </AppBar>
        {currentValue === 0 && <RemoteDataGrid />}
        {currentValue === 1 && <LocalDataGrid />}
        {currentValue === 2 && <CustomLayoutDataGrid />}
        {currentValue === 3 && <RemoteGridList />}
      </div>
    </ErrorBoundary>
  );
};

export default Main;
