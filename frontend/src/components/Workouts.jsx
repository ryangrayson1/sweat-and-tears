import React, { useState, useEffect } from 'react';
import { getWorkoutData, deleteWorkout, createComment } from '../services/workoutServices';
import '../css/workout.css';
import { like, dislike } from '../services/likeServices';
import fire from '../fire.js';

function Workouts() {

    const [searchValue, setSearchValue] = useState("");
    const [workoutData, setWorkoutData] = useState(null);
    const [commenting, setCommenting] = useState(null);
    const [comment, setComment] = useState("");

    const [likes, setLikes] = useState(); // to immediately update like button

    const [l, setL] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getWorkoutData(fire.auth().currentUser.email);
          setWorkoutData(data);
          var liked = {}
            for (const w of data){
                liked[w.id] = [w.user_liked, w.likes];
            }
            setLikes(liked);
        };
        fetchData();
        
      }, []);

    const delWorkout = (w_id) => {
        deleteWorkout(w_id);
    };

    const likeWorkout = (w_id) => {
        setL(l + 1);
        var newlikes = likes;
        newlikes[w_id] = [true, likes[w_id][1] + 1];
        setLikes(newlikes);
        like(w_id, fire.auth().currentUser.email);
    };

    const unlikeWorkout = (w_id) => {
        setL(l - 1);
        var newlikes = likes;
        newlikes[w_id] = [false, likes[w_id][1] - 1];
        setLikes(newlikes);
        dislike(w_id, fire.auth().currentUser.email);
    };

    const writeComment = (w_id) => {
        createComment(w_id, fire.auth().currentUser.email, comment);
    }

    console.log(searchValue);

    return (
        <div className="App">
            <br/>
            <h3 className="words">Welcome to the Workouts page!</h3>

            <button className="btn btn-success">
                <a className="clean" href="/create-workout/">Create a Workout</a>
            </button>
            <br/><br/>
            <form>
                <h5>Filter by Keyword: </h5>
                <input type="text" className="form-control" placeholder="Search for workout names, creators, or descriptions" style={{float: 'left', marginLeft: '30%', width: '40%'}}
                value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            </form>
            <br/><br/>
            {!workoutData ? 
                    <h3 className="words">Loading workouts...</h3> : 
                    <>

                        {searchValue !== null && searchValue !== undefined && searchValue !== "" &&
                            <h4>Workouts matching "{searchValue}"</h4>}
                            <>
                                {workoutData.map((workout) => (
                                    <>
                                        {(workout.name.toLowerCase().includes(searchValue.toLowerCase()) || workout.description.toLowerCase().includes(searchValue.toLowerCase()) || workout.u_email.toLowerCase().includes(searchValue.toLowerCase())) && <>
                                        <div className="card workout-card bg-transparent border-primary words workout">
                                            <div className="card-header bg-transparent border-primary">
                                                
                                                <b><h3>{workout.name}</h3></b>

                                                {likes && 
                                                (likes[workout.id][0] ?
                                                    <button className="btn-success" onClick={() => unlikeWorkout(workout.id)}>Liked {likes[workout.id][1]}</button> :
                                                    <button className="btn-ouline-success" onClick={() => likeWorkout(workout.id)}>Like {likes[workout.id][1]}</button>)
                                                }

                                                <h6>by {workout.u_email}</h6>
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
                                            <div className="card bg-transparent border-primary" style={{marginLeft: "10%", width: "80%"}}>
                                                <h4>Comments:</h4>
                                                {!commenting &&
                                                    <button className="btn btn-info" onClick={() => setCommenting(workout.id)} style={{marginLeft: '35%', width: '30%'}}>
                                                        <h6 className="clean">Write a Comment</h6>
                                                    </button>}
                                                    <br/>
                                                    {commenting === workout.id &&
                                                    <form>
                                                        Comment to add:
                                                        <textarea style={{width: "90%"}} value={comment} onChange={(e) => setComment(e.target.value)}/>
                                                        <br/>
                                                        <input type="submit" className="btn btn-success" value="Post" onClick={() => writeComment(workout.id)}/>
                                                    </form>
                                                }
                                            <br/>
                                                
                                                <ul className="list-group list-group-flush bg-transparent border-success">
                                                    {workout.comments.map((comment) => (
                                                        <li className="list-group-item bg-transparent border-success"><div className="words">{comment.u_email}: {comment.content}</div></li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {workout.u_email === fire.auth().currentUser.email &&
                                            <button onClick={() => delWorkout(workout.id)} className="btn btn-danger active del">
                                                Delete this Workout
                                            </button>}
                                            <br/>
                                        </div>
                                        <br/>
                                        </>}
                                    </>

                                ))}
                            </> 
                    </>
                }
        </div>
    )
}

export default React.memo(Workouts);