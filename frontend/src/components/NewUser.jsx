import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { enterNewUser } from '../services/profileServices.js';
import fire from '../fire.js';

function NewUser(props){
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const nav = useNavigate();

    const createNewUser = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (firstName && lastName && email && password) {

            fire.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                console.log(user);
                enterNewUser(firstName, lastName, email);
                alert("Account successfully created!");
                nav("/home/");   
            }).catch((error) => {
                console.log(error.message);
                if (error.message === "Firebase: The email address is already in use by another account. (auth/email-already-in-use).") {
                    alert("Account already exists. Please sign in.");
                    nav("/login/");
                }
                else{
                    alert("Account creation Failed. Please check that you have entered a valid email.");
                }
            });
        }
        else {
            alert("please fill out all fields");
        }
    }

    return(
        <div>
            <h3>Create New Profile</h3>

            <form onSubmit={createNewUser} className="form-inline signin">
                <input
                    type="text"
                    className="form-control"
                    onChange={({ target }) =>     
                    setFirstName(target.value)}
                    placeholder="First Name"
                />
                <br />
                <input
                    type="text"
                    className="form-control"
                    onChange={({ target}) => 
                    setLastName(target.value)}
                    placeholder="Last Name"
                />
                <br />
                <input
                    type="text"
                    className="form-control"
                    onChange={({ target }) =>     
                    setEmail(target.value)}
                    placeholder="Email"
                />
                <br />
                <input
                    type="password"
                    className="form-control"
                    onChange={({ target}) => 
                    setPassword(target.value)}
                    placeholder="Password"
                />
                <br />
                <button type="submit" className="btn btn-primary active">
                    Create Account
                </button>
            </form>
            <br/>
            <button className="btn btn-danger" href="/">
                <Link className="clean" to="/">
                    Back
                </Link>
            </button>
        </div>
    )
}

export default React.memo(NewUser);