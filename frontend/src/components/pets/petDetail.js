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

    const handleApply = async (caseId) => {
        // Logic to handle case application
        console.log('Applying to case:', caseId);
        try {
            await TamagotchiApi.applyToCase(caseId);
            setPet(pet.map(j => {
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
                    <h1 className="my-4">{pet.name}</h1>
                    <Button href="/pet"> Back </Button>
                    <Card className="my-3">   
                        <CardBody>
                            {pet.case.map(petCase => (
                                <PetCard key={petCase.id} case={petCase} handleApply={handleApply} /> 
                            ))}
                        </CardBody>
                    </Card>
                </>
            )}
        </Container>
    );
}

export default PetDetail;
