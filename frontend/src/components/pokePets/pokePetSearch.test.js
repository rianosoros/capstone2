import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PokePetSearch from './PokePetSearch';

describe('PokePetSearch component', () => {
  it('renders input field for searching pokePets', () => {
    const { getByPlaceholderText } = render(<PokePetSearch />);
    const searchInput = getByPlaceholderText('Search pokePets...');
    expect(searchInput).toBeInTheDocument();
  });

  it('triggers onSearch function with correct search term', () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText } = render(<PokePetSearch onSearch={mockOnSearch} />);
    const searchInput = getByPlaceholderText('Search pokePets...');
    
    fireEvent.change(searchInput, { target: { value: 'Pikachu' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Pikachu');
    
    fireEvent.change(searchInput, { target: { value: 'Charmander' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Charmander');
  });
});
