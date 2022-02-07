import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login(props){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
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
                <button type="submit" className="btn btn-primary active">
                    Sign in
                </button>
            </form>
        </div>
    )
}