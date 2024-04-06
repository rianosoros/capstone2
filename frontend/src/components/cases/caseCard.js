import React, { useState } from 'react';
import { Card, CardBody, CardText, Button } from 'reactstrap';

function CaseCard({ caseData, handleApply }) {
    const { id, caseColor } = caseData;
    const [applied, setIsApplied] = useState(false);

    const apply = async () => {
        console.log('Applying to case:', id); // Log the case ID before applying
        try {
            await handleApply(id); // Pass the case ID to the handleApply function
            setIsApplied(true); // Update isApplied to true after applying successfully

            // Update local storage with applied case ID
            const appliedCases = JSON.parse(localStorage.getItem('appliedCases')) || [];
            localStorage.setItem('appliedCases', JSON.stringify([...appliedCases, id]));
        } catch (error) {
            console.error('Error applying to case:', error);
        }
    }

    return (
        <Card className="my-3">
            <CardBody>
                <CardText>Case Color: {caseColor}</CardText>
                <Button
                    color={applied ? "secondary" : "primary"}
                    disabled={applied}
                    onClick={apply}
                >
                    {applied ? "Applied" : "Apply"}
                </Button>
            </CardBody>
        </Card>
    );
}

export default CaseCard;
