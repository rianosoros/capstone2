// PetDetail.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

const PetDetail = ({ pets }) => {
    const { userId, petId } = useParams();
    const selectedPet = pets.find(pet => pet.userId === userId && pet.id === petId);

    if (!selectedPet) {
        return <div>Pet not found</div>;
    }

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
                <CardTitle tag="h5">{selectedPet.name}</CardTitle>
                <img src={selectedPet.image} alt={selectedPet.name} />
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
