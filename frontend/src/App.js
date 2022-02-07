import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import NewUser from './components/NewUser.jsx';
import './css/App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const login = (email, password) => {
    let auth = true;
    if (auth) {
      setLoggedIn(true);
      return true;
    }
    console.log(email);
    console.log(password);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const createUser = (fname, lname, email, pword) => {
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(pword);
    return login(email, pword);
  };

  return (
    <div className="App">
      <Router>
      {!loggedIn ? 
      (
        <>
          <h1 className="display-1">Sweat && Tears</h1>
          <Routes>
            <Route path = "/" element={<Login loginProp={login}/>}/>
            <Route path = "/new-user/" element={<NewUser createUserProp={createUser}/>}/>
          </Routes>
        </>
      )
      :
      (
        <>
          <h1>Sweat && Tears</h1>
          <Navbar logoutProp={logout} />
        </>
      )
      }
      </Router>

    </div>
  );
}

export default App;
