import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch } from 'react-router';
import { HashRouter, Link, Redirect, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import ColumnModel from './Documentation/ColumnModel';
import DataSource from './Documentation/DataSource';
import GettingStarted from './Documentation/Getting-Started';
import Home from './Documentation/Home';
import Props from './Documentation/Props';
import Sample from './Sample';

class App extends React.Component {
   public render() {
    return (
      <HashRouter>
         <Switch>
          <div>
            <NavigationBar/>
            <Route exact={true} path='/' component={Home}/>
            <Route  path='/sample' component={Sample}/>
            <Redirect to='/' />
            <HashRouter>
              <Switch>
                <Route path='/documentation/props' component={Props}/>
                <Route  path='/documentation/datasource' component={DataSource}/>
                <Route  path='/documentation/getting-started' component={GettingStarted}/>
                <Route  path='/documentation/columnmodel' component={ColumnModel}/>
              </Switch>
            </HashRouter>
          </div>
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
