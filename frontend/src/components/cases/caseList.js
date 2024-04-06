//shows user the list of cases they can apply to their pet

import React, { useState, useEffect } from "react";
import CaseCard from "./caseCard";
import TamagotchiApi from "../../api";
import { Button, Container, Spinner } from "reactstrap";

function CaseList() {
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getCases() {
            try {
                let res = await TamagotchiApi.getCases();
                setCases(res);
            } catch (error) {
                console.error("Error fetching cases:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getCases();
    }, []);

    const handleApply = async (caseId) => {
        // Logic to handle case application
        console.log('Applying to case:', caseId);
        try {
            await TamagotchiApi.applyToCase(caseId);
            setCases(cases.map(j => {
                if (j.id === caseId) {
                    return { ...j, state: 'applied' };
                }
                return j;
            }));
        } catch (error) {
            console.error('Error applying to case:', error);
        }
    };

    return (
        <Container> 
            <h1 className="my-4">Cases</h1>
            <Button href="/"> Back </Button>
            {isLoading ? (
                <Spinner color="primary" />
            ) : (
                <div>
                    {cases.map(c => (
                        <CaseCard key={c.id} case={c} handleApply={handleApply} />
                    ))}
                </div>
            )}
        </Container>
    );
}

export default CaseList;
