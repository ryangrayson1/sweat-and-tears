import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import NewUser from './components/NewUser.jsx';
import Home from './components/Home.jsx';
import './css/App.css';
import fire from './fire.js';
import { createNewUser } from './services/accountServices.js';

function App() {
  document.body.style = 'background: aliceblue;';

  const [loggedIn, setLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setLoggedIn(true) : setLoggedIn(false);
  });

  const createUser = (fname, lname, email, pword) => {
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(pword);
    try {
      createNewUser(fname, lname, email, pword);
      return true;
    } catch (e) {
      console.error(e);
      alert("account creation failed");
    }
  };

  const login = (email, password) => {
    try{
      fire.auth().signInWithEmailAndPassword(email, password)
      return true;
    }
    catch(e){
      console.error('Incorrect username or password');
      alert("incorrect username or password");
     }
  };

  const logout = () => {
    fire.auth().signOut();
    setLoggedIn(false);
  };

  console.log("Logged In: " + loggedIn);

  return (
    <div className="App">
      <Router>
        {!loggedIn ? 
        (
          <>
            <h1 className="display-1">Sweat && Tears</h1>
            <Routes>
              <Route exact path="/" element={<Login loginProp={login}/>}/>
              <Route exact path="/new-user/" element={<NewUser createUserProp={createUser}/>}/>
              <Route path="*" element={<Login loginProp={login}/>}/>
            </Routes>
          </>
        )
        :
        (
          <>
            <h1>Sweat && Tears</h1>
            <Navbar logoutProp={logout} />
            <Routes>
              <Route exact path="/home/" element={<Home/>}/>
              <Route path="*" element={<Home/>}/>
            </Routes>
          </>
        )
        }
      </Router>

    </div>
  );
}

export default App;
