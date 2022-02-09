import React from 'react';

function Workouts() {
    return (
        <div className="App">
            <h3 className="words">Welcome to the Workouts page! (under construction - pending DB setup)</h3>

            <button className="btn btn-success">
                <a className="clean" href="/create-workout/">Create a Workout</a>
            </button>
            <br/><br/>
        </div>
    )
}

export default React.memo(Workouts);