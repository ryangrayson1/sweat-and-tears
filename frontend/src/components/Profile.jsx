import React, { useState, useEffect } from "react";
import { getUserData } from '../services/accountServices.js';
import { deleteWorkout } from '../services/workoutServices.js';
import '../css/workout.css';

function Profile() {

    const [userData, setUserData] = useState(null);

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
                                <div className="card workout-card bg-transparent border-primary words">
                                    <div className="card-header bg-transparent border-primary">
                                        <b><h3>{workout.name}</h3></b>
                                        <h6>by {workout.email}</h6>
                                    </div>
                                    <div className="card-body bg-transparent border-primary">
                                        <p>{workout.description}</p>
                                        Time: {workout.time} min  |  Difficulty: {workout.difficulty}/10
                                    </div>

                                    <div className="card-footer bg-transparent border-primary">
                                        <ul className="list-group list-group-flush bg-transparent border-success">
                                            {workout.exercises.map((exercise) => (
                                                <li className="list-group-item bg-transparent border-success"><div className="words">{exercise.exerciseName}: {exercise.sets} sets of {exercise.reps} reps.</div></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <button onClick={() => delWorkout(workout.w_id, workout.email)} className="btn btn-danger active">
                                    Delete this Workout
                                </button>
                                <br/>
                                <br/>
                            </>
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default React.memo(Profile);