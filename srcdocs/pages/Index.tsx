import '../vendor';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { UnoTheme } from 'uno-material-ui';
import Main from './Main';

const App = () => (
  <ThemeProvider theme={UnoTheme}>
    <Router>
      <Switch>
        <Main />
      </Switch>
    </Router>
  </ThemeProvider>
);

render(<App />, document.getElementById('app'));
