import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fire from '../fire.js';

function Login(props){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const nav = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        fire.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.error('Incorrect username or password');
                alert("incorrect username or password");
        });
        nav("/home/");
    }

    return (
    <div>    
        <h2 className="words">
            Please Sign In or &nbsp;
            <button className="btn btn-success">
                <Link className="clean" to="/new-user/">
                    Create Account
                </Link>
            </button>
        </h2>
            
            <form onSubmit={handleSubmit} className="form-inline signin">
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
                <button type="submit" href="/home/" className="btn btn-primary active">
                    Sign in
                </button>
            </form>
        </div>
    )
}

export default React.memo(Login);