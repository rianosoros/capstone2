import React, { useState, useEffect } from 'react';
import TamagotchiApi from '../../api';
import { Container, Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

const PetList = () => {
    const [userId, setUserId] = useState(null);
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getUserPets() {
            try {
                const username = localStorage.getItem('username');
                const currentUser = await TamagotchiApi.getCurrentUser(username);
                const userId = currentUser.id;
                setUserId(userId); // Set userId state
                const res = await TamagotchiApi.getPetsByUserId(userId);
                setPets(res.userPet); // Update state with the userPet array
            } catch (error) {
                console.error('Error fetching pets:', error);
                setError('Error fetching pets. Please try again later.');
            }
        }
        getUserPets();
    }, []);

    return (
        <Container>
            <h1 className="my-4">Pets</h1>
            <button className="blue-button" href="/"> Back </button>
            {error && <p>{error}</p>}

            <div className='pet-grid'>
                {pets.map((pet) => (
                    <Card key={pet.id} className="poke-cards">
                        <CardBody>
                            <CardTitle tag="h5">{pet.name}</CardTitle>
                            <img src={pet.image} alt={pet.name} />
                            {userId && (
                                <Link to={`/pet/${userId}/${pet.id}`}>
                                    <button className="blue-button">Play</button>
                                </Link>
                            )}
                        </CardBody>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default PetList;
