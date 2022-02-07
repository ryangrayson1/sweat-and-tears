import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import './css/App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element={<Login/>}/>
        </Routes>
      </Router>
      {!loggedIn ? 
      (
        <>
          <h1>not logged in</h1>
          <button onClick={login}>Login</button>
        </>
      )
      :
      (
        <>
          <h1>logged in</h1>
          <Navbar logout={logout} />
        </>
      )
      }

    </div>
  );
}

export default App;
