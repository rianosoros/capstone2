import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TamagotchiApi from '../../api'; 
import PetCard from './petCard';
import { Container, Card, CardBody, Button, Spinner } from 'reactstrap';

function PetDetail() {
    const { handle } = useParams();
    const [pet, setPet] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getPet() {
            try {
                let res = await TamagotchiApi.getPet(handle);
                setPet(res);
            } catch (error) {
                console.error("Error catching pokemon! :", error);
            } finally {
                setIsLoading(false);
            }

        }
        getPet();
    }, [handle]);

    return (
        <Container>
            {isLoading ? (
                <Spinner color="primary" />
            ) : (
                <>
                    <h1 className="my-4">{pet.name}</h1>
                    <Button href="/pet"> Back </Button>
                    <Card className="my-3">   
                        <CardBody>
                            <PetCard pet={pet} />
                        </CardBody>
                    </Card>
                </>
            )}
        </Container>
    );
}

export default PetDetail;
