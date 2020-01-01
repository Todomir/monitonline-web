import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AuthError from './pages/AuthError';
import ContinueRegister from './pages/ContinueRegister';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Schedules from './pages/Schedules';
import SearchTutor from './pages/SearchTutor';
import TutorProfile from './pages/TutorProfile';
import Tutors from './pages/Tutors';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component, ...options }) => {
  if (isAuthenticated()) {
    return <Route {...options} component={component} />;
  }
  return <Redirect to="/auth-error" />;
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/proceed-register" component={ContinueRegister} />
        <Route path="/search-tutors" component={SearchTutor} />
        <Route path="/tutors" component={Tutors} />
        <Route path="/auth-error" component={AuthError} />
        <PrivateRoute path="/user-profile" component={Dashboard} />
        <PrivateRoute path="/schedules" component={Schedules} />
        <PrivateRoute path="/schedule-assistance" component={TutorProfile} />
      </Switch>
    </BrowserRouter>
  );
}
