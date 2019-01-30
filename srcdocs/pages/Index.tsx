import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch } from 'react-router';
import { HashRouter, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import ComponentAPI from './Documentation/ComponentAPI';
import Home from './Documentation/Home';
import Sample from './Documentation/Sample';

class App extends React.Component {
  public render() {
    return (
      <HashRouter>
        <Switch>
          <div>
            <NavigationBar />
            <Route exact={true} path='/' component={Home} />
            <Route path='/sample' component={Sample} />
            <Route path='/componentAPI/' component={ComponentAPI} />
          </div>
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
