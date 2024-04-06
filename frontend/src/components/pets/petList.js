import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TamagotchiApi from '../../api';
import { Container, Card, CardBody, CardTitle, Button } from 'reactstrap';
import PetSearch from './petSearch'; // Import the PetSearch component

const PetList = () => {
    const [pet, setPet] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function getPets() {
            let res = await TamagotchiApi.getPets();
            setPet(res);
            setSearchResults(res); // Initialize searchResults with all companies
        }
        getPets();
    }, []);

    const handleSearch = async (searchTerm) => {
        console.log('Searching for:', searchTerm);
        // Call the API to search for pets using the searchTerm
        try {
            const searchResults = await TamagotchiApi.getPets(searchTerm);
            setSearchResults(searchResults);
        } catch (error) {
            console.error('Error looking for pokemon! :', error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">Pets</h1>
            <Button href="/"> Back </Button>
            <PetSearch onSearch={handleSearch} /> 
            {searchResults.map(c => ( 
                <Card key={c.handle} className="my-3">
                    <CardBody>
                        <Link to={`/pets/${c.handle}`} className="text-decoration-none">
                            <CardTitle tag="h5">{c.name}</CardTitle>
                        </Link>
                    </CardBody>
                </Card>
            ))}

        </Container>
    );
};

export default PetList;
