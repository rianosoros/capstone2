import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PokePetCard from './PokePetCard';

describe('PokePetCard component', () => {
  it('renders PokePet name and link to details page', () => {
    const pokePet = { id: 1, name: 'Pikachu' };

    const { getByText, getByRole } = render(
      <Router>
        <PokePetCard pokePet={pokePet} />
      </Router>
    );

    // Check if PokePet's name is rendered
    expect(getByText('Pikachu')).toBeInTheDocument();

    // Check if the link to details page is rendered
    const link = getByRole('link', { name: 'Pikachu' });
    expect(link).toHaveAttribute('href', '/pokePet/1');
  });
});
