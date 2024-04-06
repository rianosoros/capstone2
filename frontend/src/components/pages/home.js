import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "reactstrap";

function Home() {
    const currentUser = localStorage.getItem("username");
    
    return (
        <div className="Homepage">
            <Container className="text-center">
                <h1 className="mb-4 font-weight-bold">Pokegotchi Central</h1>
                {currentUser ? (
                    <h2 className="mb-4">
                        Welcome Back, {localStorage.getItem("username")}!
                    </h2>
                ) : (
                    <p className="lead mb-4">
                        It's good to see you back in Pokegotchi Central - the place where you can catch em' all and take care of your virtual pets!
                    </p>
                )}
                <div className="d-flex justify-content-center">
                    {currentUser ? (
                        <div className="d-flex">
                            <Button tag={Link} to={`/profile/${currentUser}`} color="primary" className="font-weight-bold mr-3">
                                Profile
                            </Button>
                            <Button tag={Link} to={`/pets/${currentUser}`} color="primary" className="font-weight-bold">
                                Pets
                            </Button>
                        </div>
                    ) : (
                        <Button tag={Link} to="/login" color="primary" className="font-weight-bold mr-3">
                            Log in
                        </Button>
                    )}
                    {!currentUser && (
                        <Button tag={Link} to="/signup" color="primary" className="font-weight-bold">
                            Sign up
                        </Button>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;
