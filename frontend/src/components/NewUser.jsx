import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createNewUser } from '../services/profileServices.js';

function NewUser(props){
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const nav = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (firstName && lastName && email && password) {
            if (createNewUser(firstName, lastName, email, password) === "success"){
                alert("Account successfully created!");
                nav("/home/");
            }
            else if (createNewUser(firstName, lastName, email, password) === "exists"){
                alert("Account already exists. Please sign in.");
                nav("/login/");
            }
            else{
                alert("Account creation Failed. Please check that you have entered a valid email.");
            }
        }
        else {
            alert("please fill out all fields");
        }
    }

    return(
        <div>
            <h3>Create New Profile</h3>

            <form onSubmit={handleSubmit} className="form-inline signin">
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