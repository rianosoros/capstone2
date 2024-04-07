import React, { useState, useEffect } from 'react';
import TamagotchiApi from '../../api';
import { Container, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const PetList = () => {
    const [pet, setPet] = useState([]);

    useEffect(() => {
        async function getUserPets() {
            try {
                const username = localStorage.getItem('username');
                const res = await TamagotchiApi.getUserPets(username);
                setPet(res);

            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        }
        getUserPets();
    }, []);

    return (
        <Container>
            <h1 className="my-4">Pets</h1>
            <Button href="/"> Back </Button>
            {pet &&
                Array.isArray(pet) &&
                pet.map((pet) => (
                    <Card key={pet.id} className="my-3">
                        <CardBody>
                            <CardTitle tag="h5">{pet.name}</CardTitle>
                            <CardText tag="h5">{pet.type}</CardText>
                        </CardBody>
                    </Card>
                ))}

        </Container>
    );
};

export default PetList;
