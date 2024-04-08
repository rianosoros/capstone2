import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PetList from './PetList';
import TamagotchiApi from '../../api';

// Mock the TamagotchiApi module
jest.mock('../../api');

describe('PetList component', () => {
  const mockPets = [
    { id: 1, name: 'Pikachu', image: 'Pikachu.jpg' },
    { id: 2, name: 'Ditto', image: 'Ditto.jpg' },
  ];

  beforeEach(() => {
    // Reset the mock implementation before each test
    TamagotchiApi.getCurrentUser.mockResolvedValue({ id: 123 });
    TamagotchiApi.getPetsByUserId.mockResolvedValue({ userPet: mockPets });
  });

  it('renders pet list correctly', async () => {
    const { getByText, getByAltText, getAllByRole } = render(
      <MemoryRouter>
        <PetList />
      </MemoryRouter>
    );

    // Check if loading text is displayed
    expect(getByText('Pets')).toBeInTheDocument();

    // Wait for pets to be loaded
    await waitFor(() => expect(TamagotchiApi.getPetsByUserId).toHaveBeenCalledTimes(1));

    // Check if each pet is rendered
    mockPets.forEach((pet) => {
      expect(getByText(pet.name)).toBeInTheDocument();
      expect(getByAltText(pet.name)).toBeInTheDocument();
      expect(getAllByRole('button', { name: /View Details/i })).toHaveLength(mockPets.length);
    });
  });

  it('handles errors during pet fetching', async () => {
    const errorMessage = 'Error fetching pets. Please try again later.';
    // Set up the API to throw an error
    TamagotchiApi.getPetsByUserId.mockRejectedValue(new Error(errorMessage));

    const { getByText } = render(
      <MemoryRouter>
        <PetList />
      </MemoryRouter>
    );

    // Wait for the error message to be displayed
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument());
  });
});
