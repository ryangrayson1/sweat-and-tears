import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import './css/App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <h2>Welcome! Sweat && Tears is Currently under construction</h2>
    
      <Router>
      </Router>
      {!loggedIn ? 
      (
        <h1>not logged in</h1>
      )
      :
      (
        <>
          <h1>logged in</h1>
        </>
      )
      }

    </div>
  );
}

export default App;
