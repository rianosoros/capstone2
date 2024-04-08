import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PokePetList from './PokePetList';
import TamagotchiApi from '../../api';

jest.mock('../../api');

describe('PokePetList component', () => {
  it('renders list of PokePets', async () => {
    const pokePets = [
      { id: 1, name: 'Pikachu', image: 'pikachu.jpg', type: 'Electric' },
      { id: 2, name: 'Charmander', image: 'charmander.jpg', type: 'Fire' },
    ];
    TamagotchiApi.getPokePets.mockResolvedValueOnce(pokePets);

    const { getByText, getByAltText } = render(
      <Router>
        <PokePetList />
      </Router>
    );

    // Verify loading spinner is displayed
    expect(getByText('Loading...')).toBeInTheDocument();

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(getByText('Pikachu')).toBeInTheDocument();
      expect(getByText('Charmander')).toBeInTheDocument();
      expect(getByAltText('Pikachu')).toBeInTheDocument();
      expect(getByAltText('Charmander')).toBeInTheDocument();
      expect(getByText('Electric')).toBeInTheDocument();
      expect(getByText('Fire')).toBeInTheDocument();
    });
  });

  it('handles search for PokePets', async () => {
    const pokePets = [
      { id: 1, name: 'Pikachu', image: 'pikachu.jpg', type: 'Electric' },
      { id: 2, name: 'Charmander', image: 'charmander.jpg', type: 'Fire' },
    ];
    TamagotchiApi.getPokePets.mockResolvedValueOnce(pokePets);
    TamagotchiApi.searchPokePets.mockResolvedValueOnce([pokePets[0]]);

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <PokePetList />
      </Router>
    );

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(getByText('Pikachu')).toBeInTheDocument();
      expect(getByText('Charmander')).toBeInTheDocument();
    });

    // Search for Pikachu
    fireEvent.change(getByPlaceholderText('Search pets...'), { target: { value: 'Pikachu' } });

    // Wait for the search results
    await waitFor(() => {
      expect(getByText('Pikachu')).toBeInTheDocument();
      expect(getByText('Charmander')).not.toBeInTheDocument();
    });
  });

  it('handles PokePet adoption', async () => {
    const pokePet = { id: 1, name: 'Pikachu', image: 'pikachu.jpg', type: 'Electric' };
    TamagotchiApi.adoptPokePet.mockResolvedValueOnce(pokePet);

    const { getByText } = render(
      <Router>
        <PokePetList />
      </Router>
    );

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(getByText('Pikachu')).toBeInTheDocument();
    });

    // Click the Adopt button
    fireEvent.click(getByText('Adopt'));

    // Wait for the adoption process
    await waitFor(() => {
      expect(TamagotchiApi.adoptPokePet).toHaveBeenCalled();
      expect(getByText('Pikachu')).toBeInTheDocument();
    });
  });
});
