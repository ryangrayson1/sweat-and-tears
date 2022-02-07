import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NewUser(props){
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const nav = useNavigate();

    const handleSubmit = () => {
        if (firstName && lastName && email && password) {
            if (props.createUserProp(firstName, lastName, email, password)){
                nav("/home/");
            }
        }
    }

    return(
        <div>
            <h3 className="clean">Create New Profile</h3>

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