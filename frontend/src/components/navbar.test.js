import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar component', () => {
  it('renders login and signup links when user is not logged in', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const signUpLink = getByText('Sign Up');
    expect(signUpLink).toBeInTheDocument();

    const loginLink = getByText('Login');
    expect(loginLink).toBeInTheDocument();
  });

  it('renders profile, owned pets, poke pets, and logout button when user is logged in', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const ownedPetsLink = getByText('Owned Pets');
    expect(ownedPetsLink).toBeInTheDocument();

    const pokePetsLink = getByText('Poke Pets');
    expect(pokePetsLink).toBeInTheDocument();

    const profileLink = getByText('Profile');
    expect(profileLink).toBeInTheDocument();

    const logoutButton = getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  it('logs out the user when logout button is clicked', () => {
    // Mock localStorage functions
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    global.localStorage = localStorageMock;

    const { getByText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Simulate a click on the logout button
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);

    // Expect localStorage methods to be called to remove user data
    expect(localStorageMock.removeItem).toHaveBeenCalledTimes(3);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('tamagotchi-token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('username');
  });
});
