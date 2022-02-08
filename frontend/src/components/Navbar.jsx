import React from "react";

function Navbar(props){
        
        return (
        <div>
            <button className="btn btn-home active">
                <a className="clean" href="/home/">Home</a>
            </button>&ensp;

            <button className="btn btn-workouts active">
                <a className="clean" href="/workouts/">Workouts</a>
            </button>&emsp;

            <button className="btn btn-profile active">
                <a className="clean" href="/profile/"><h2 className="words">Sweat && Tears</h2></a>
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