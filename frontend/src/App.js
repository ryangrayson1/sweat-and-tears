import React, { useState, useEffect } from 'react';
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
import CreateDiscussion from './components/CreateDiscussion.jsx';
import './css/App.css';
import fire from './fire.js';

function App() {
  document.body.style = 'background: aliceblue;';
  const [currentUser, setCurrentUser] = useState(fire.auth().currentUser);
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
     })
  }, []);

  const logout = () => {
    fire.auth().signOut();
    setCurrentUser(null);
  };

  console.log("Current user: " + currentUser);

  return (
    <div className="App">
      <Router>
        {!currentUser ? 
        (
          <>
            <h1 className="display-1">Sweat && Tears</h1>
            <Routes>
              <Route path="*" element={<Login setCurrentUser={setCurrentUser}/>}/>
              <Route exact path="/new-user/" element={<NewUser/>}/>
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
              <Route exact path="/create-discussion/" element={<CreateDiscussion/>}/>
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
