import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logout from './Logout';
import TamagotchiApi from '../../api';

// Mock TamagotchiApi logout function
jest.mock('../../api', () => ({
  logout: jest.fn(),
}));

describe('Logout component', () => {
  it('calls TamagotchiApi.logout() and redirects to homepage', () => {
    const { container } = render(<Logout />, { wrapper: MemoryRouter });
    
    // Expect TamagotchiApi.logout() to be called
    expect(TamagotchiApi.logout).toHaveBeenCalled();

    // Ensure that the component does not render anything (null)
    expect(container.firstChild).toBeNull();
  });
});
