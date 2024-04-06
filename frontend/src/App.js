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

  //if token exists, get current user
    async function getCurrentUser() {
      console.debug("App getCurrentUser token", "token=", token);
      if (token) {
        console.debug("App getCurrentUser if token", "token=", token);
        try {
          let { username } = jwt.decode(token);
        
          TamagotchiApi.token = token;
          console.debug("App  api token", "token=", token);
          let currentUser = await TamagotchiApi.getCurrentUser(username);
          console.debug("App getCurrentUser currentUser", currentUser);
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

//logout function
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }


//register function
  async function register(registerData) {
    try {
      let token = await TamagotchiApi.register(registerData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("register failed", errors);
      return { success: false, errors };
    }
  }

//login function
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

//check if case has been applied
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
            <Routes login={login} register={register} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
