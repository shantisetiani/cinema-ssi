import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PUBLIC_URL } from "../config/constants";

const routeFactory = (routeObj, matchPath) => {
  const currPath = (matchPath !== undefined) ? matchPath:PUBLIC_URL;
  return (
    <Switch>
      {
        routeObj.map((route, index) => {
          return (
            <Route
              key={index}
              path={currPath + route.path}
              exact={route.exact}
              render={props => (
                <route.component { ...props } routes={route.routes} />
              )}
            />
          )
        })
      }
    </Switch>
  )
}

export default routeFactory;