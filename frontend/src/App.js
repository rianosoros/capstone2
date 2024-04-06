import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import Navigation from "../src/components/navbar";
import Routes from "../src/components/routes";
import TamagotchiApi from "./api";
import jwt from "jsonwebtoken";
import "../src/styles/App.css";
export const TOKEN_STORAGE_ID = "tamagotchi-token";


const UserContext = React.createContext();

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [caseId, setCaseIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      "token=", token,
  );

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
        
          TamagotchiApi.token = token;
          let currentUser = await TamagotchiApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setCaseIds(new Set(currentUser.cases));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await TamagotchiApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await TamagotchiApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function hasAppliedCase(id) {
    return caseId.has(id);
  }

  function applyCase(id) {
    if (hasAppliedCase(id)) return;
    TamagotchiApi.applyCase(currentUser.username, id);
    setCaseIds(new Set([...caseId, id]));
  }

  if (!infoLoaded) return <div>Loading...</div>;

  return (
      <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser, hasAppliedCase: hasAppliedCase, applyCase: applyCase }}>
          <div className="App">
            <Navigation logout={logout} />
            <Routes login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
