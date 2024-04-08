import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock TamagotchiApi
jest.mock('../../api', () => ({
  getCurrentUser: jest.fn(() => ({ id: 'mockUserId' })),
}));

describe('Home component', () => {
  it('renders welcome message for logged in user', () => {
    localStorage.setItem('username', 'testuser');
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    expect(getByText('Welcome Back, testuser!')).toBeInTheDocument();
  });

  it('renders welcome message for logged out user', () => {
    localStorage.removeItem('username');
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    expect(getByText("It's good to see you back in Pokegotchi Central")).toBeInTheDocument();
  });

  it('renders buttons for logged in user', () => {
    localStorage.setItem('username', 'testuser');
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('My Pets')).toBeInTheDocument();
    expect(getByText('PokePets')).toBeInTheDocument();
  });

  it('renders login and register buttons for logged out user', () => {
    localStorage.removeItem('username');
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    expect(getByText('Log in')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  it('navigates to profile page when profile button is clicked', () => {
    localStorage.setItem('username', 'testuser');
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    fireEvent.click(getByText('Profile'));
    expect(window.location.pathname).toBe('/profile/testuser');
  });
});
