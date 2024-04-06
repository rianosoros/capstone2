import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "reactstrap";
import "../styles/navbar.css";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("tamagotchi-token");
    const storedUsername = localStorage.getItem("username");
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setCurrentUser(storedUsername);
    } else {
      setIsLoggedIn(false);
      setCurrentUser("");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tamagotchi-token");
    localStorage.removeItem("username");
    localStorage.removeItem("appliedCases");
    setIsLoggedIn(false);
    setCurrentUser("");
    // Redirect to the home page after logout
    window.location.href = "/";
  }

  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          Pokegotchi Central
        </NavLink>
        <Nav className="ml-auto">
          {isLoggedIn ? (
            <>
              <NavLink to="/pets" className="nav-link">Owned Pets</NavLink>
              <NavLink to="/case" className="nav-link">Cases</NavLink>
              <NavLink to="/pokePets" className="nav-link">Poke Pets</NavLink>
              {/* Use currentUser state to generate the profile link */}
              <NavLink to={`/profile/${currentUser}`} className="nav-link">Profile</NavLink>
              <Button className="logout-button" color="link" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <NavLink to="/register" className="nav-link">Sign Up</NavLink>
              <NavLink to="/login" className="nav-link">Login</NavLink>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;