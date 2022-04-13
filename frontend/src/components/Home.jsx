import React from 'react';

function Home() {

    return (
        <div className="App">
            <br/>
            <h2 style={{color: "darkblue"}}>Welcome to Sweat && Tears!</h2>
            <br/><br/>
            <h4>This site presents a revolutionary new way to interact with your friends and keep up with their workout routines.</h4>
            <br/><br/>
            <div className="card workout-card bg-transparent border-primary words workout">
                <div>
                    <br/>
                    <h5 className="text-primary">To view all workouts or post your own, navigate to the <a href="/workouts/">Workouts</a> Page</h5>
                    <br/>
                    <h5 className="text-success">To view your workouts and edit them, navigate to the <a href="/profile/">Profile</a> Page</h5>
                    <br/>
                    <h5 className="text-primary">To view challenges or post your own, navigate to the <a href="/challenges/">Challenges</a> Page</h5>
                    <br/>
                    <h5 className="text-success">To view discussions or talk about something new, navigate to the <a href='/discussions/'>Discussions</a> Page</h5>
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Home);