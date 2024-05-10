import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn ? <Component {...props} /> : null
    }
  />
);

export default PrivateRoute;
