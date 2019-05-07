import ThemeProvider from '@material-ui/styles/ThemeProvider';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UnoTheme } from 'uno-material-ui';
import NavigationBar from '../components/NavigationBar';
import ComponentAPI from './Documentation/ComponentAPI';
import Home from './Documentation/Home';
import Sample from './Documentation/Sample';

const App = () => (
  <ThemeProvider theme={UnoTheme}>
    <Router>
      <NavigationBar />
      <Switch>
        <Route exact={true} path='/tubular-react/' component={Home} />
        <Route path='/tubular-react/sample' component={Sample} />
        <Route path='/tubular-react/componentAPI/' component={ComponentAPI} />
      </Switch>
    </Router>
  </ThemeProvider>
);

render(<App />, document.getElementById('app'));
