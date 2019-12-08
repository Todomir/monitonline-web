import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPage from './pages/UserPage';
import Schedules from './pages/Schedules';
import SearchTutor from './pages/SearchTutor';
import TutorProfile from './pages/TutorProfile';

const PrivateRoute = ({ component, ...options }) => {
  if (isAuthenticated) {
    return <Route {...options} component={component} />;
  }
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/user-profile" component={UserPage} />
        <PrivateRoute path="/add-schedules" component={Schedules} />
        <PrivateRoute path="/search-tutors" component={SearchTutor} />
        <PrivateRoute path="/schedule-assistance" component={TutorProfile} />
      </Switch>
    </BrowserRouter>
  );
}
