import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PokePetDetail from './PokePetDetail';
import TamagotchiApi from '../../api';

jest.mock('../../api');

describe('PokePetDetail component', () => {
  it('renders PokePet name and back button', async () => {
    const pokePet = { name: 'Pikachu' };
    TamagotchiApi.getPet.mockResolvedValueOnce(pokePet);

    const { getByText, getByRole } = render(
      <Router>
        <PokePetDetail />
      </Router>
    );

    // Verify loading spinner is displayed
    expect(getByText('Loading...')).toBeInTheDocument();

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(getByText('Pikachu')).toBeInTheDocument();
    });

    // Verify back button is rendered
    expect(getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });
});
