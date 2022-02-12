import React, { useState, useEffect } from 'react';
import { getWorkoutData } from '../services/workoutServices';

function Workouts() {

    const [searchValue, setSearchValue] = useState();
    const [filteredData, setFilteredData] = useState();
    const [workoutData, setWorkoutData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getWorkoutData();
          setWorkoutData(data);
        };

        fetchData();
      }, []);

      if (workoutData){
      console.log(workoutData);}

    return (
        <div className="App">
            <h3 className="words">Welcome to the Workouts page!</h3>

            <button className="btn btn-success">
                <a className="clean" href="/create-workout/">Create a Workout</a>
            </button>
            <br/><br/>
            {!workoutData ? 
                    <h3 className="words">Loading workouts...</h3> : 
                    <>

                        {!searchValue ? 
                            <>
                                {workoutData.map((workout) => (

                                    <>
                                        <div className="card workout-card bg-transparent border-primary words">
                                            <div className="card-header bg-transparent border-primary">
                                                <b><h3>{workout.w_name}</h3></b>
                                                <h6>by *name here*</h6>
                                            </div>
                                            <div className="card-body bg-transparent border-primary">
                                                <p>{workout.description}</p>
                                                Time: {workout.timeInMinutes} min  |  Difficulty: {workout.difficulty}/10
                                            </div>

                                            {/* <div className="card-footer bg-transparent border-primary">
                                                <ul className="list-group list-group-flush bg-transparent border-success">
                                                    {workout.exercises.map((exercise) => (
                                                        <li className="list-group-item bg-transparent border-success"><div className="words">{exercise.exerciseName}: {exercise.sets} sets of {exercise.reps} reps.</div></li>
                                                    ))}
                                                </ul>
                                            </div> */}
                                        </div>
                                        <br/>
                                    </>

                                ))}
                            </> : 

                            <>
                                <h6>filtered data will be here</h6>
                            </>
                        }   
                    </>
                }
        </div>
    )
}

export default React.memo(Workouts);