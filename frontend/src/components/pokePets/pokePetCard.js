import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle} from 'reactstrap';

function PokePetCard({ pokePet }) {
    return (
        <Card className="my-3">
            <CardBody>
                <Link to={`/pokePet/${pokePet.id}`} className="text-decoration-none">
                    <CardTitle tag="h5">{pokePet.name}</CardTitle>
                </Link>
            </CardBody>
        </Card>
    );
}

export default PokePetCard;
