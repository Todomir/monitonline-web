import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
  if (isAuthenticated) {
    return <Route {...options} component={component} />;
  }
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/proceed-register" component={ContinueRegister} />
        <PrivateRoute path="/user-profile" component={Dashboard} />
        <PrivateRoute path="/add-schedules" component={Schedules} />
        <Route path="/search-tutors" component={SearchTutor} />
        <Route path="/tutors" component={Tutors} />
        <PrivateRoute path="/schedule-assistance" component={TutorProfile} />
      </Switch>
    </BrowserRouter>
  );
}
