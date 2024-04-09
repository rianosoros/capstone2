import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, Container, Row } from 'reactstrap';
import TamagotchiApi from '../../api'; 


const PetDetail = () => {
    const [pet, setPet] = useState(null);
    const { userId, petId } = useParams(); // Get userId and petId from URL params
    const [error, setError] = useState(null);
    const [hunger, setHunger] = useState(null);
    const [happiness, setHappiness] = useState(null);
    const [health, setHealth] = useState(null);

    // Fetch pet details when component mounts
    useEffect(() => {
        async function getPetDetails() {
            try {
                const petData = await TamagotchiApi.getPetDetails(parseInt(petId));
                setPet(petData["pet"]); // Set the pet state to the pet data
                setHunger(petData.pet.hunger);
                setHappiness(petData.pet.happiness);
                setHealth(petData.pet.health);
            } catch (error) {
                console.error('Error fetching pet details:', error);
                setError('Error fetching pet details. Please try again later.');
            }
        }        
        getPetDetails();
    }, [userId, petId]);

    // function to handle the feed button click
    const handleInteraction = async (type) => {
        try {
            const interactionResult = await TamagotchiApi.interactWithPet(parseInt(petId), type);
            setHunger(interactionResult.hunger);
            setHappiness(interactionResult.happiness);
            setHealth(interactionResult.health);
        } catch (error) {
            console.error(`Error interacting with pet (${type}):`, error);
            setError(`Error interacting with pet. Please try again later.`);
        }
    };

    return (
        <Container className="card-center">
            <Card className="my-3">
                <CardBody>
                    <CardTitle tag="h3">{pet ? pet.name : 'Loading...'}</CardTitle>
                    {pet && <img src={pet.image} alt={pet.name} className="pet-img"/>}
                    {error && <p>{error}</p>}
                    <h4>Stats</h4>
                    <h5>Hunger: {hunger}  |  Happiness: {happiness}  |  Health: {health}</h5>
                    {/* Add tamagotchi buttons here */}
                    <Row className='button-row'>
                        <button className="blue-button" onClick={() => handleInteraction('feed')}>Feed</button>
                        <button className="blue-button" onClick={() => handleInteraction('play')}>Play</button>
                        <button className="blue-button" onClick={() => handleInteraction('scold')}>Scold</button>
                    </Row>
                    {/* STRETCH GOAL */}
                    {/* <Button color="primary" onClick={() => handleInteraction('abandon')}>Abandon</Button> */}
                </CardBody>
            </Card>
        </Container>
        
    );
};

export default PetDetail;
