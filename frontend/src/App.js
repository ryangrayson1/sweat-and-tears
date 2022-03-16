import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import NewUser from './components/NewUser.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import Workouts from './components/Workouts.jsx'; 
import CreateWorkout from './components/CreateWorkout.jsx';
import Discussions from './components/Discussions.jsx';
import Challenges from './components/Challenges.jsx';
import './css/App.css';
import fire from './fire.js';
import { createNewUser } from './services/profileServices.js';

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
      return fire.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error('Incorrect username or password');
        alert("incorrect username or password");
    });
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
              <Route exact path="/" element={<Login loginProp={login} li={loggedIn}/>}/>
              <Route exact path="/new-user/" element={<NewUser createUserProp={createUser}/>}/>
              <Route path="*" element={<Login loginProp={login} li={loggedIn}/>}/>
            </Routes>
          </>
        )
        :
        (
          <>
            <Navbar logoutProp={logout} />
            <Routes>
              <Route exact path="/home/" element={<Home/>}/>
              <Route exact path="/profile/" element={<Profile/>}/>
              <Route exact path="/workouts/" element={<Workouts/>}/>
              <Route exact path="/create-workout/" element={<CreateWorkout/>}/>
              <Route exact path="/discussions/" element={<Discussions/>}/>
              <Route exact path="/challenges/" element={<Challenges/>}/>
              <Route path="*" element={<Home/>}/>
            </Routes>
          </>
        )
        }
      </Router>
    </div>
  );
}

export default React.memo(App);
