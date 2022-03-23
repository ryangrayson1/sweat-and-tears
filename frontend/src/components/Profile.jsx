import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getUserData } from '../services/profileServices.js';
import { deleteWorkout } from '../services/workoutServices.js';
import EditWorkout from './EditWorkout.jsx';
import '../css/workout.css';

function Profile() {

    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(-1);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getUserData();
          setUserData(data);
        };

        fetchData();
      }, []);

      const delWorkout = (w_id, email) => {
          deleteWorkout(w_id, email);
      };

      console.log(editing)

    return (
        <div className="App">
            {!userData ? 
                (
                    <>
                        <h1>Loading user data...</h1>
                    </>
                ) :
                (
                    <>
                        <h2 className="words">Welcome, {userData.userData[0].first_name}</h2><br/>
                        <h2 className="words dataexample">Personal Info</h2>
                        <table id="dataTable" className="table words profiletable">
                            <tbody className="words">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Bio</th>
                                </tr>
                                <tr>
                                    <th>{userData.userData[0].first_name} {userData.userData[0].last_name}</th>
                                    <th>{userData.userData[0].email}</th>
                                    <th>{userData.userData[0].bio}</th>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="words">Your Workouts:</h3>
                        {userData.userWorkouts.map((workout) => (
                            <>
                                {(editing === workout.id) ? 
                                <EditWorkout w_id={workout.id} setEditing={setEditing} name={workout.name} 
                                u_email={workout.u_email} description={workout.description} time={workout.time}
                                difficulty={workout.difficulty} exercises={workout.exercises}/> :
                                <>
                                    <div className="card workout-card bg-transparent border-primary words workout">
                                        <div className="card-header bg-transparent border-primary">
                                            <b><h3>{workout.name}</h3></b>
                                            <h6>by {workout.u_email}</h6>
                                        </div>
                                        <div className="card-body bg-transparent border-primary">
                                            <p>{workout.description}</p>
                                            Likes: {workout.likes}
                                        </div>
                                        <div className="card-body bg-transparent border-primary">
                                            <p>{workout.description}</p>
                                            Time: {workout.time} min  |  Difficulty: {workout.difficulty}/10
                                        </div>

                                        <div className="card-footer bg-transparent border-primary">
                                            <ul className="list-group list-group-flush bg-transparent border-success">
                                                {workout.exercises.map((exercise) => (
                                                    <li className="list-group-item bg-transparent border-success"><div className="words">{exercise.name}: {exercise.sets} sets of {exercise.reps} reps.</div></li>
                                                ))}
                                            </ul>
                                        </div>
                                    
                                    <button onClick={() => setEditing(workout.id)} className="btn btn-warning active del">
                                        Edit
                                    </button>
                                    <button onClick={() => delWorkout(workout.id, workout.u_email)} className="btn btn-danger active del">
                                        Delete this Workout
                                    </button>
                                    <br/>
                                    </div>
                                    <br/>
                                </>}
                            </>
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default React.memo(Profile);