import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editWorkout } from '../services/workoutServices.js';

function EditWorkout(props){

    const nav = useNavigate();

    const [name, setName] = useState(props.name);

    const [description, setDescription] = useState(props.description);

    const [timeInMinutes, setTimeInMinutes] = useState(props.time);

    const [difficulty, setDifficulty] = useState(props.difficulty);

    const [exercises, setExercises] = useState(props.exercises);

    const handleChangeInput = (id, attr, event) => {
        const newexercises = exercises.map(i => {
        if(id === i.id) {
            i[attr] = event.target.value;
        }
        return i;
        });
        
        setExercises(newexercises);
    }
        
    const handleSubmit = (e, id) => {
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
        else if (name && description && timeInMinutes && difficulty && exercises) {
            editWorkout(id, name, description, timeInMinutes, difficulty, exercises);
            props.setEditing(-1);
        }
        else{
            alert("Workout edit failed. Please check that all fields have the correct format.");
        }
    };

    return(
        <div className="App">
            <br/><h4 className="words">Edit Workout {name}</h4><br/>
                <div className="card workout-card bg-transparent border-primary words workout">
                    <form>
                        <div className="card-header bg-transparent border-primary">
                            <input type="text" className="form-control thinner" label="Workout Name:" value={name}
                            onChange={event => setName(event.target.value)}></input>
                            <h6>by {props.u_email}</h6>
                        </div>
                        <div className="card-body bg-transparent border-primary">
                            Description: <input type="text" className="form-control thinner" value={description}
                            onChange={event => setDescription(event.target.value)}></input> 
                            Time (minutes): <input type="text" className="form-control thinner" value={timeInMinutes}
                            onChange={event => setTimeInMinutes(event.target.value)}></input>  
                            Difficulty (/10): <input type="text" className="form-control thinner" value={difficulty}
                            onChange={event => setDifficulty(event.target.value)}></input>
                        </div>

                        <div className="card-footer bg-transparent border-primary">
                            <ul className="list-group list-group-flush bg-transparent border-success">
                                {exercises.map((ex, i) => (
                                    <li className="list-group-item bg-transparent border-success"><div className="words">
                                        <input type="text" className="form-control thinner" value={exercises[i].name}
                                        onChange={event => handleChangeInput(ex.id, 'name', event)}></input>: 
                                        <input type="text" className="form-control thinner" value={exercises[i].sets}
                                        onChange={event => handleChangeInput(ex.id, 'sets', event)}></input> sets of 
                                        <input type="text" className="form-control thinner" value={exercises[i].reps}
                                        onChange={event => handleChangeInput(ex.id, 'reps', event)}></input> reps.
                                    </div></li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={event => handleSubmit(event, props.w_id)} className="btn btn-success active">
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