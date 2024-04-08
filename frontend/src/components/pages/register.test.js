import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';
import TamagotchiApi from '../../api';

// Mock TamagotchiApi register function
jest.mock('../../api', () => ({
  register: jest.fn(),
}));

describe('Register component', () => {
  it('submits registration form with valid data', async () => {
    const registerData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    // Mock the register function to return a token
    TamagotchiApi.register.mockResolvedValue('fake-token');

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Fill out the registration form
    fireEvent.change(getByLabelText('Username'), { target: { value: registerData.username } });
    fireEvent.change(getByLabelText('Email'), { target: { value: registerData.email } });
    fireEvent.change(getByLabelText('Password'), { target: { value: registerData.password } });

    // Submit the form
    fireEvent.submit(getByText('Submit'));

    // Expect register function to be called with form data
    await waitFor(() => {
      expect(TamagotchiApi.register).toHaveBeenCalledWith(registerData);
      expect(localStorage.getItem('token')).toBe('fake-token');
    });
  });

  it('displays error messages for invalid registration data', async () => {
    // Mock the register function to throw an error
    TamagotchiApi.register.mockRejectedValue(['Invalid username', 'Invalid email']);

    const { getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Submit the form
    fireEvent.submit(getByText('Submit'));

    // Expect error messages to be displayed
    await waitFor(() => {
      expect(getByText('Invalid username')).toBeInTheDocument();
      expect(getByText('Invalid email')).toBeInTheDocument();
    });
  });
});
