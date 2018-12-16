import React from 'react';
import { createBrowserHistory } from 'history';
import { Switch, Router } from 'react-router'; // react-router v4

import routes from './routes';
import './App.css';

export const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>{routes}</Switch>
      </Router>
    );
  }
}

export default App;
