import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
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
        <Card className="my-3">
            <CardBody>
                <CardTitle tag="h5">{pet ? pet.name : 'Loading...'}</CardTitle>
                {pet && <img src={pet.image} alt={pet.name} />}
                {error && <p>{error}</p>}
                <h5>Stats</h5>
                <p>Hunger: {hunger}  |  Happiness: {happiness}  |  Health: {health}</p>
                {/* Add tamagotchi buttons here */}
                <Button color="primary" onClick={() => handleInteraction('feed')}>Feed</Button>
                <Button color="primary" onClick={() => handleInteraction('play')}>Play</Button>
                <Button color="primary" onClick={() => handleInteraction('scold')}>Scold</Button>
                {/* STRETCH GOAL */}
                {/* <Button color="primary" onClick={() => handleInteraction('abandon')}>Abandon</Button> */}
            </CardBody>
        </Card>
    );
};

export default PetDetail;
