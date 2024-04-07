import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TamagotchiApi from '../../api'; 
import PokePetCard from './pokePetCard';
import { Container, Card, CardBody, Button, Spinner } from 'reactstrap';

function PokePetDetail() {
    const { handle } = useParams();
    const [pokePet, setPokePet] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getPokePet() {
            try {
                let res = await TamagotchiApi.getPet(handle);
                setPokePet(res);
            } catch (error) {
                console.error("Error catching pokemon! :", error);
            } finally {
                setIsLoading(false);
            }

        }
        getPokePet();
    }, [handle]);

    return (
        <Container>
            {isLoading ? (
                <Spinner color="primary" />
            ) : (
                <>
                    <h1 className="my-4">{pokePet.name}</h1>
                    <Button href="/pokePet"> Back </Button>
                    <Card className="my-3">   
                        <CardBody>
                            <PokePetCard pokePet={pokePet} />
                        </CardBody>
                    </Card>
                </>
            )}
        </Container>
    );
}

export default PetDetail;
