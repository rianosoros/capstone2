import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "reactstrap";
import TamagotchiApi from "../../api";
import "../../styles/home.css";
import  logo  from "./pokegotchiTwoLines.png"
import tamagotchi from './tamagotchi.png'


function Home() {
    const currentUser = localStorage.getItem("username");
    // const userId = TamagotchiApi.getCurrentUser(currentUser).id;
    return (
        <Container className="text-center home-page">

            <img
                src={logo}
                alt="Pokegotchi Central Logo"
                className="mt-4 mb-4"
            />

            {currentUser ? (
                <h1 className="mb-4 lead">
                    Welcome Back, {localStorage.getItem("username")}!
                </h1>
            ) : (
                <p className="lead mb-4">
                    Pokegotchi Central - <span>the place where you can catch em' all and take care of your virtual pets!</span>
                </p>
            )}

            <div className="d-flex justify-content-center">
                {currentUser ? (
                    <div className="d-flex">
                        <Button tag={Link} to={`/profile/${currentUser}`} color="primary" className="font-weight-bold mr-3">
                            Profile
                        </Button>
                        <Button tag={Link} to={`/pet/${currentUser}`} color="primary" className="font-weight-bold">
                            My Pets
                        </Button>
                        <Button tag={Link} to={`/pokePets`} color="primary" className="font-weight-bold ml-3">
                            PokePets
                        </Button>
                    </div>
                ) : (
                    <Button tag={Link} to="/login" color="primary" className="font-weight-bold mr-3">
                        Log in
                    </Button>
                )}
                {!currentUser && (
                    <Button tag={Link} to="/register" color="primary" className="font-weight-bold">
                        Register
                    </Button>
                )}
            </div>

            <div>
                <img 
                    src={tamagotchi}
                    alt="Snorlax in a tamagotchi with pink hearts around"
                    className = "bottom-image"
                    />
            </div>
        </Container>
    );
}

export default Home;
