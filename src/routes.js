import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Login from './pages/Login';
import Register from './pages/Register';
import UserPage from './pages/UserPage';

const PrivateRoute = ({ component, ...options }) => {
  if (isAuthenticated) {
    return <Route {...options} component={component} />;
  }
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/userpage" component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
}
