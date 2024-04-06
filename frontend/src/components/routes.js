import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PetList from './pets/petList';
import PetDetail from './pets/petDetail';
import CaseList from './cases/caseList';
import CaseCard from './cases/caseCard';
import Login from './pages/login';
import Profile from './pages/profile';
import Register from './pages/register';
import PokePetList from './pokePets/pokePetList';
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

function Routes({ login, register }) {
  return (
    <Switch>
      {/* Public routes */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login login={login} />
      </Route>
      <Route exact path="/register">
        <Register register={register} />
      </Route>

      {/* Private routes */}
      <PrivateRoute exact path="/pets"> <PetList /> </PrivateRoute>
      <PrivateRoute exact path="/pets/:id"> <PetDetail /> </PrivateRoute>
      <PrivateRoute exact path="/pokePets"> <PokePetList /> </PrivateRoute>
      <PrivateRoute exact path="/cases"> <CaseList /> </PrivateRoute>
      <PrivateRoute exact path="/cases/:id"> <CaseCard /> </PrivateRoute>
      {/* Pass the username as a parameter to the profile route */}
      <PrivateRoute exact path="/profile/:username"> <Profile /> </PrivateRoute>

      {/* Default route */}
      <Redirect to="/" />
    </Switch>
  );
}


export default Routes;
