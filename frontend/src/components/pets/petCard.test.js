import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PetCard from './PetCard';

describe('PetCard component', () => {
  const pet = {
    id: 1,
    name: 'Pikachu',
  };

  it('renders pet name as a link', () => {
    const { getByText } = render(
      <Router>
        <PetCard pet={pet} />
      </Router>
    );

    const petLink = getByText(pet.name);
    expect(petLink).toBeInTheDocument();
    expect(petLink.tagName).toBe('A');
    expect(petLink.getAttribute('href')).toBe(`/pet/${pet.id}`);
  });
});
