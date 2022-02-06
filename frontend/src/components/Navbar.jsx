import React from 'react';

export default function Navbar(){
    return (
        <div>
            <button className="btn btn-success active">
                <a className="clean" href="/">Home</a>
            </button>&nbsp;
            <button className="btn btn-info active">
                <a className="clean" href="/profile/">Profile</a>
            </button>&nbsp;
            <button className="btn btn-workouts active">
                <a className="clean" href="/workouts/">Workouts</a>
            </button>&nbsp;
            <button className="btn btn-about active">
                <a className="clean" href="/about/">About</a>
            </button>&nbsp;
            <button onClick={signOut} className="btn btn-danger active">
                <a className="clean" href="/">Sign out</a>
            </button>
        </div>
    )
}