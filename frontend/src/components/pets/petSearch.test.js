import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CompanySearch from './CompanySearch';

describe('CompanySearch component', () => {
  it('updates search term and triggers search', () => {
    // Mock the onSearch function
    const mockOnSearch = jest.fn();

    const { getByPlaceholderText } = render(<CompanySearch onSearch={mockOnSearch} />);

    const input = getByPlaceholderText('Search pets...');

    // Simulate user typing in the input
    fireEvent.change(input, { target: { value: 'Pikachu' } });

    // Check if search term is updated
    expect(input.value).toBe('Pikachu');

    // Check if onSearch function is called with the updated search term
    expect(mockOnSearch).toHaveBeenCalledWith('Pikachu');
  });
});
