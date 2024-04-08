import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TamagotchiApi from '../../api';
import { Container, Card, CardBody, CardText, CardTitle, Button } from 'reactstrap';
import PokePetSearch from './pokePetSearch';

const PokePetList = () => {
  const [pokePets, setPokePets] = useState([]);
  const [pokePetSearchResults, setPokePetSearchResults] = useState([]);

  useEffect(() => {
    async function getPokePets() {
      try {
        const res = await TamagotchiApi.getPokePets();
        setPokePets(res);
        setPokePetSearchResults(res);
      } catch (error) {
        console.error('Error fetching pokePets:', error);
      }
    }
    getPokePets();
  }, []);

  const handleSearch = async (searchTerm) => {
    try {
      const searchResults = await TamagotchiApi.searchPokePets(searchTerm);
      setPokePetSearchResults(searchResults);
    } catch (error) {
      console.error('Error searching for pokePets:', error);
    }
  };

  //handle api call to adopt a pokePet. send data for userPet table
  const handleAdopt = async (pokePet) => {
    const username = localStorage.getItem('username');
    try {
      const currentUser = await TamagotchiApi.getCurrentUser(username);
      const userId = currentUser.id;
      const pokePetId = pokePet.id;
      const adoptData = { userid: userId, pokepetid: pokePetId, image: pokePet.image, name: pokePet.name};
      console.log('43| petListHandleAdopt adoptData:', adoptData);
      const adoptedPokePet = await TamagotchiApi.adoptPokePet(adoptData);
      setPokePets((prevPokePets) => [...prevPokePets, adoptedPokePet]);
    } catch (error) {
      console.error('Error adopting pokePet:', error);
    }
  };


return (
  <Container>
      <h1 className="my-4">PokePets</h1>
      <Button href="/">Back</Button>
      <PokePetSearch onSearch={handleSearch} />
      {pokePetSearchResults &&
        Array.isArray(pokePetSearchResults) &&
        pokePetSearchResults.map((pokePet) => (
          <Card key={pokePet.id} className="my-3">
            <CardBody>
              <Link to={`/pokePets/${pokePet.handle}`} className="text-decoration-none">
                <CardTitle tag="h5">{pokePet.name}</CardTitle>
                <img src={pokePet.image} alt={pokePet.name} />
                <CardText>{pokePet.type}</CardText>
              </Link>
              <Button onClick={() => handleAdopt(pokePet)}>Adopt</Button>
            </CardBody>
          </Card>
        ))}
    </Container>
  );
};

export default PokePetList;