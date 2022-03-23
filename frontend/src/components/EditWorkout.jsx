import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';

function EditWorkout(props){

    const nav = useNavigate();

    const [name, setName] = useState(props.name);

    const [description, setDescription] = useState(props.description);

    const [timeInMinutes, setTimeInMinutes] = useState(props.time);

    const [difficulty, setDifficulty] = useState(props.difficulty);

    const [exercises, setExercises] = useState(props.exercises);
        
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length > 75){
            alert("Workout name must be less than 75 chars");
        }
        else if (!(difficulty > 0 || difficulty <= 10)){
            alert("difficulty must be a number between 1 and 10, inclusive");
        }
        else if (exercises.length > 10){
            alert("The max number of exercises is 10");
        }
        else if (timeInMinutes > 600){
            alert("Workout time must be less than 10 hours");
        }
        else if (name && description && timeInMinutes && difficulty && exercises && typeof name === 'string') {
            // nav("/workouts/");
            return 1;//editWorkout(id, name, description, timeInMinutes, difficulty, exercises, creatorEmail, creatorName);
        }
        else{
            alert("Workout edit failed. Please check that all fields have the correct format.");
        }
    };

    return(
        <div className="App">
            <br/><h4 className="words">Edit Workout {props.w_id}</h4><br/>
                <div className="card workout-card bg-transparent border-primary words workout">
                    <form>
                        <div className="card-header bg-transparent border-primary">
                            <input type="text" value={props.name}></input>
                            <h6>by {props.u_email}</h6>
                        </div>
                        <div className="card-body bg-transparent border-primary">
                            <p>{props.description}</p>
                            Time: {props.time} min  |  Difficulty: {props.difficulty}/10
                        </div>

                        <div className="card-footer bg-transparent border-primary">
                            <ul className="list-group list-group-flush bg-transparent border-success">
                                {props.exercises.map((exercise) => (
                                    <li className="list-group-item bg-transparent border-success"><div className="words">{exercise.name}: {exercise.sets} sets of {exercise.reps} reps.</div></li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={handleSubmit} className="btn btn-success active">
                            Submit edits
                        </button>
                        <br/>
                    </form>
                </div>
                <br/>
            <button onClick={() => props.setEditing(-1)}>Cancel</button>
        </div>
    )
}

export default React.memo(EditWorkout);