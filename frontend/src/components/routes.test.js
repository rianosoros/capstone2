import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Routes, { PrivateRoute } from './Routes';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PetList from './pets/PetList';
import PokePetList from './pokePets/PokePetList';

describe('PrivateRoute component', () => {
  it('renders the component when user is authenticated', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/private']}>
        <PrivateRoute path="/private" isAuthenticated={true} component={() => <div>Private Component</div>} />
      </MemoryRouter>
    );

    const privateComponent = getByText('Private Component');
    expect(privateComponent).toBeInTheDocument();
  });

  it('redirects to login page when user is not authenticated', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/private']}>
        <PrivateRoute path="/private" isAuthenticated={false} component={() => <div>Private Component</div>} />
        <Route path="/login">
          <div>Login Page</div>
        </Route>
      </MemoryRouter>
    );

    const loginPage = getByText('Login Page');
    expect(loginPage).toBeInTheDocument();
  });
});

describe('Routes component', () => {
  it('renders the home page for the root route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
    );

    const homePage = getByText('Home');
    expect(homePage).toBeInTheDocument();
  });

  it('redirects to the home page for an unknown route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Routes />
      </MemoryRouter>
    );

    const homePage = getByText('Home');
    expect(homePage).toBeInTheDocument();
  });
});
