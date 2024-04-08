import React, { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import TamagotchiApi from '../../api'; // Import TamagotchiApi module


const PetDetail = () => {
    const [pet, setPet] = useState(null);
    const { userId, petId } = useParams(); // Get userId and petId from URL params
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getPetDetails() {
            try {
                const petData = await TamagotchiApi.getPetDetails(petId);
                setPet(petData); // Update state with the pet details
            } catch (error) {
                console.error('Error fetching pet details:', error);
                setError('Error fetching pet details. Please try again later.');
            }
        }        
        getPetDetails();
    }, [userId, petId]);

    const handleFeed = () => {
        console.log('Feed button clicked');
    };

    const handlePlay = () => {
        console.log('Play button clicked');
    };

    const handleScold = () => {
        console.log('Scold button clicked');
    };

    const handleAbandon = () => {
        console.log('Abandon button clicked');
    };

    return (
        <Card className="my-3">
            <CardBody>
                <CardTitle tag="h5">{pet ? pet.name : 'Loading...'}</CardTitle>
                {pet && <img src={pet.image} alt={pet.name} />}
                {/* Add tamagotchi buttons here */}
                <Button color="primary" onClick={handleFeed}>Feed</Button>
                <Button color="primary" onClick={handlePlay}>Play</Button>
                <Button color="primary" onClick={handleScold}>Scold</Button>
                <Button color="primary" onClick={handleAbandon}>Abandon</Button>
            </CardBody>
        </Card>
    );
};

export default PetDetail;
