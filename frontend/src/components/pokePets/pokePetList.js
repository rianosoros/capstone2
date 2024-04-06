import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TamagotchiApi from '../../api';
import { Container, Card, CardBody, CardText, CardTitle, Button } from 'reactstrap';
import PokePetSearch from './pokePetSearch';


const PokePetList = () => {
    const [pokePet, setPokePet] = useState([]);
    const [pokePetSearchResults, setPokePetSearchResults] = useState([]);
    const username = localStorage.getItem('username');
    console.log('Username:', username);
    
    // Get the current user before adopting the pokePet
    const currentUser = async () => {
        const currentUser = await TamagotchiApi.getCurrentUser(username);
        const userId = currentUser.id; // Extract userId from the response
        console.log('Current User:', currentUser);
        console.log('User ID:', userId);
    };
    currentUser();
    

    useEffect(() => {
        async function getPokePets() {
            let res = await TamagotchiApi.getPokePets();
            setPokePet(res);
            setPokePetSearchResults(res); // Initialize searchResults with all companies
        }
        getPokePets();
    }, []);

    const handleSearch = async (searchTerm) => {
        console.log('Searching for:', searchTerm);
        try {
            const searchResults = await TamagotchiApi.searchPokePets(searchTerm); // Call the API with the search term
            setPokePetSearchResults(searchResults); // Update searchResults state with the returned results
        } catch (error) {
            console.error('Error looking for pokePet! :', error);
        }
    };

    const handleAdopt = async (id) => {
        console.log('Adopting pokePet:', id);
        const username = localStorage.getItem('username');
        try {
            // Get the current user before adopting the pokePet
            const currentUser = await TamagotchiApi.getCurrentUser(username);
            const userId = currentUser.id; // Extract userId from the response
            await TamagotchiApi.adoptPokePet(userId, id);
            // Update the state after adoption
            setPokePet(pokePet.map(pokePet => {
                if (pokePet.id === id) {
                    return { ...pokePet, state: 'adopted' };
                }
                return pokePet;
            }));
        } catch (error) {
            console.error('Error adopting pokePet:', error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">PokePets</h1>
            <Button href="/"> Back </Button>
            <PokePetSearch onSearch={handleSearch} />
            {pokePetSearchResults && Array.isArray(pokePetSearchResults) && pokePetSearchResults.map(c => (
                <Card key={c.handle} className="my-3">
                    <CardBody>
                        <Link to={`/pokePets/${c.handle}`} className="text-decoration-none">
                            <CardTitle tag="h5">{c.name}</CardTitle>
                            <img src={c.image} alt={c.name} />
                            <CardText tag="h5">{c.type}</CardText>
                            <Button href="/pokePets" onClick={() => handleAdopt(c.id)}>Adopt</Button>
                        </Link>
                    </CardBody>
                </Card>
            ))}
        </Container>
    );
};

export default PokePetList;
