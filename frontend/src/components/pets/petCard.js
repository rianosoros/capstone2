import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle} from 'reactstrap';

function PetCard({ pet }) {
    return (
        <Card className="my-3">
            <CardBody>
                <Link to={`/pet/${pet.id}`} className="text-decoration-none">
                    <CardTitle tag="h5">{pet.name}</CardTitle>
                    {/* image of pet here */} 
                </Link>
            </CardBody>
        </Card>
    );
}

export default PetCard;
