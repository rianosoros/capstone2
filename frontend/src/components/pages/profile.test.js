import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Profile from './Profile';
import TamagotchiApi from '../../api';

// Mock TamagotchiApi getCurrentUser and saveProfile functions
jest.mock('../../api', () => ({
  getCurrentUser: jest.fn(),
  saveProfile: jest.fn(),
}));

describe('Profile component', () => {
  it('fetches and displays user profile data', async () => {
    const user = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    // Mock the getCurrentUser function to return user data
    TamagotchiApi.getCurrentUser.mockResolvedValue(user);

    const { getByText, getByLabelText } = render(
      <MemoryRouter initialEntries={['/profile/testuser']}>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </MemoryRouter>
    );

    // Expect loading state
    expect(getByText('Loading...')).toBeInTheDocument();

    // Wait for user data to be loaded
    await waitFor(() => {
      expect(TamagotchiApi.getCurrentUser).toHaveBeenCalledWith('testuser');
      expect(getByText('testuser')).toBeInTheDocument();
      expect(getByText('test@example.com')).toBeInTheDocument();
      expect(getByText('password123')).toBeInTheDocument();
    });
  });

  it('allows editing and saving user profile data', async () => {
    const user = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    // Mock the getCurrentUser and saveProfile functions
    TamagotchiApi.getCurrentUser.mockResolvedValue(user);
    TamagotchiApi.saveProfile.mockResolvedValue({ ...user, email: 'newemail@example.com' });

    const { getByText, getByLabelText } = render(
      <MemoryRouter initialEntries={['/profile/testuser']}>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </MemoryRouter>
    );

    // Wait for user data to be loaded
    await waitFor(() => {
      expect(TamagotchiApi.getCurrentUser).toHaveBeenCalledWith('testuser');
      expect(getByText('testuser')).toBeInTheDocument();
      expect(getByText('test@example.com')).toBeInTheDocument();
      expect(getByText('password123')).toBeInTheDocument();
    });

    // Click on edit button
    fireEvent.click(getByText('Edit Profile'));

    // Change email input value
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'newemail@example.com' } });

    // Submit the form
    fireEvent.submit(getByText('Save Changes'));

    // Expect saveProfile function to be called
    await waitFor(() => {
      expect(TamagotchiApi.saveProfile).toHaveBeenCalledWith('testuser', { email: 'newemail@example.com', password: 'password123' });
      expect(getByText('Profile updated successfully!')).toBeInTheDocument();
      expect(getByText('newemail@example.com')).toBeInTheDocument();
    });
  });
});
