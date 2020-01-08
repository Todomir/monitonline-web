import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Assistances from './pages/Assistances';
import AuthError from './pages/AuthError';
import Comments from './pages/Comments';
import ContinueRegister from './pages/ContinueRegister';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Schedules from './pages/Schedules';
import SearchTutor from './pages/SearchTutor';
import TutorError from './pages/TutorError';
import TutorProfile from './pages/TutorProfile';
import Tutors from './pages/Tutors';
import { isAuthenticated } from './services/auth';
import { UserContext } from './store/UserContext';

const PrivateRoute = ({ component, ...options }) => {
  if (isAuthenticated()) {
    return <Route {...options} component={component} />;
  }
  return <Redirect to="/auth-error" />;
};

const PrivateTutorRoute = ({ component, ...options }) => {
  const { user } = useContext(UserContext);

  if (isAuthenticated() && user.is_tutor) {
    return <Route {...options} component={component} />;
  }
  return <Redirect to="/tutor-error" />;
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
        <Route path="/tutor-error" component={TutorError} />
        <PrivateRoute path="/user-profile" component={Dashboard} />
        <PrivateTutorRoute path="/schedules" component={Schedules} />
        <PrivateTutorRoute path="/assistances" component={Assistances} />
        <PrivateRoute path="/schedule-assistance" component={TutorProfile} />
        <PrivateRoute path="/comments" component={Comments} />
      </Switch>
    </BrowserRouter>
  );
}
