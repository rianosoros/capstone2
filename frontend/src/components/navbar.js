import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, Button, NavItem } from "reactstrap";
import "../styles/navbar.css";
import logo from './images/pokegotchiOneLine.png'
import githubLogo from './images/Github.png'
import linkedinLogo from './images/LinkedIn.png'

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
    setIsLoggedIn(false);
    setCurrentUser("");
    // Redirect to the home page after logout
    window.location.href = "/";
  }

  return (
    <div>
      <Nav expand="md" justified>
        <NavItem>
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              alt="Pokegotchi Central Logo"
              className="nav-logo"
            />
          </Link>
        </NavItem>
        
          {isLoggedIn ? (
            <NavItem>
              <NavLink to={`/pet/${currentUser}`} className="nav-link">Owned Pets</NavLink>
              <NavLink to="/pokePets" className="nav-link">Poke Pets</NavLink>
              {/* Use currentUser state to generate the profile link */}
              <NavLink to={`/profile/${currentUser}`} className="nav-link">Profile</NavLink>
              <button className="yellow-button" color="link" onClick={handleLogout}>Logout</button>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <Link to="/register" className="nav-link">Sign Up</Link>
                <Link to="/login" className="nav-link">Login</Link>
              </NavItem>

              <NavItem>
                <a href="https://github.com/rianosoros"><img src={githubLogo}/></a>
                <a href="https://www.linkedin.com/in/rian-gillard/"><img src={linkedinLogo}/></a>
              </NavItem>
            </>
          )}
      </Nav>
    </div>
  );
}

export default NavBar;