import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PetList from './pets/petList';
import PetDetail from './pets/petDetail';
import CaseList from './cases/caseList';
import CaseCard from './cases/caseCard';
import Login from './pages/login';
import Profile from './pages/profile';
import Signup from './pages/signup';
import Home from './pages/home';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

function Routes({ login, signup }) {
  return (
    <Switch>
      {/* Public routes */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login login={login} />
      </Route>
      <Route exact path="/signup">
        <Signup signup={signup} />
      </Route>

      {/* Private routes */}
      <PrivateRoute exact path="/pet"> <PetList /> </PrivateRoute>
      <PrivateRoute exact path="/pet/:id"> <PetDetail /> </PrivateRoute>
      <PrivateRoute exact path="/case"> <CaseList /> </PrivateRoute>
      <PrivateRoute exact path="/case/:id"> <CaseCard /> </PrivateRoute>
      {/* Pass the username as a parameter to the profile route */}
      <PrivateRoute exact path="/profile/:username"> <Profile /> </PrivateRoute>

      {/* Default route */}
      <Redirect to="/" />
    </Switch>
  );
}


export default Routes;
