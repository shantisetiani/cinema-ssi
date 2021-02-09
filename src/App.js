import React from 'react';
import './App.css';
import { createBrowserHistory } from "history"
import { Router, Switch } from "react-router-dom"

import { PUBLIC_URL } from "./config/constants";
import { Provider } from 'react-redux'
import store from './reduxStore';

import Routes from './Router.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const hist = createBrowserHistory();

  return (
    <Provider store={store}>
      <Router basename={PUBLIC_URL} history={hist}>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
