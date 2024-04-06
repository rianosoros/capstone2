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

    const handleApply = async (caseId) => {
        // Logic to handle case application
        console.log('Applying to case:', caseId);
        try {
            await TamagotchiApi.applyToCase(caseId);
            setPokePet(pokePet.map(j => {
                if (j.id === caseId) {
                    return { ...j, state: 'applied' };
                }
                return j;
            }));
        }
        catch (error) {
            console.error('Error applying to case:', error);
        }
    }

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
                            {pokePet.case.map(petCase => (
                                <PokePetCard key={petCase.id} case={petCase} handleApply={handleApply} /> 
                            ))}
                        </CardBody>
                    </Card>
                </>
            )}
        </Container>
    );
}

export default PetDetail;
