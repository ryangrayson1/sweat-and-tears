import React from "react";

function Navbar(props){
        
        return (
        <div>
            <h1> </h1>
            <button className="btn btn-home active">
                <a className="clean" href="/home/">Home</a>
            </button>&ensp;

            <button className="btn btn-workouts active">
                <a className="clean" href="/workouts/">Workouts</a>
            </button>&emsp;

            <button className="btn btn-challenges active">
                <a className="clean" href="/challenges/">Challenges</a>
            </button>&emsp;

            <button className="btn btn-outline-primary active">
                <a className="clean" href="/home/"><h1 className="words">Sweat && Tears</h1></a>
            </button>&emsp;

            <button className="btn btn-discussions active">
                <a className="clean" href="/discussions/">Discussions</a>
            </button>&emsp;

            <button className="btn btn-profile active">
                <a className="clean" href="/profile/">Profile</a>
            </button>&ensp;

            <button onClick={props.logoutProp} className="btn btn-danger active">
                <a className="clean" href="/">Sign out</a>
            </button>
        </div>
    )
}

export default React.memo(Navbar);