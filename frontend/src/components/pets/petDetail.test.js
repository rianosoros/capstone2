import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PetDetail from './PetDetail';
import TamagotchiApi from '../../api';

// Mock the TamagotchiApi module
jest.mock('../../api');

describe('PetDetail component', () => {
  const petData = {
    id: 1,
    name: 'Pikachu',
    image: 'pikachu.jpg',
    hunger: 50,
    happiness: 70,
    health: 80,
  };

  beforeEach(() => {
    // Reset the mock implementation before each test
    TamagotchiApi.getPetDetails.mockResolvedValue({ pet: petData });
    TamagotchiApi.interactWithPet.mockResolvedValue({
      hunger: 40,
      happiness: 80,
      health: 90,
    });
  });

  it('renders pet details and interaction buttons', async () => {
    const { getByText, getByAltText, getByRole } = render(
      <MemoryRouter initialEntries={['/user/1/pet/1']}>
        <Route path="/user/:userId/pet/:petId">
          <PetDetail />
        </Route>
      </MemoryRouter>
    );

    // Check if loading text is displayed
    expect(getByText('Loading...')).toBeInTheDocument();

    // Wait for the pet details to be loaded
    await waitFor(() => expect(TamagotchiApi.getPetDetails).toHaveBeenCalledTimes(1));

    // Check if pet name and image are displayed
    expect(getByText(petData.name)).toBeInTheDocument();
    expect(getByAltText(petData.name)).toBeInTheDocument();

    // Check if interaction buttons are displayed
    expect(getByRole('button', { name: /Feed/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Play/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Scold/i })).toBeInTheDocument();
  });

  it('handles interaction with the pet', async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/user/1/pet/1']}>
        <Route path="/user/:userId/pet/:petId">
          <PetDetail />
        </Route>
      </MemoryRouter>
    );

    // Wait for the pet details to be loaded
    await waitFor(() => expect(TamagotchiApi.getPetDetails).toHaveBeenCalledTimes(1));

    // Click on the Feed button
    fireEvent.click(getByRole('button', { name: /Feed/i }));

    // Check if interaction with the pet is called with the correct type
    expect(TamagotchiApi.interactWithPet).toHaveBeenCalledWith(petData.id, 'feed');
  });
});
