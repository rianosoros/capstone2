import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

// Mock history object
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

// Mock login function
const mockLogin = jest.fn();

describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it('renders login form with username and password fields', () => {
    const { getByLabelText } = render(<Login login={mockLogin} />, { wrapper: MemoryRouter });
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('submits login form with valid credentials', async () => {
    mockLogin.mockResolvedValueOnce({ success: true });
    const { getByText, getByLabelText } = render(<Login login={mockLogin} />, { wrapper: MemoryRouter });
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.submit(getByText('Submit'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
  });

  it('displays error message for invalid credentials', async () => {
    mockLogin.mockResolvedValueOnce({ success: false });
    const { getByText, getByLabelText } = render(<Login login={mockLogin} />, { wrapper: MemoryRouter });
    fireEvent.change(getByLabelText('Username'), { target: { value: 'invaliduser' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'invalidpassword' } });
    fireEvent.submit(getByText('Submit'));
    await waitFor(() => expect(getByText('Invalid username or password')).toBeInTheDocument());
  });
});
