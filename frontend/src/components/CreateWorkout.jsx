import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import fire from '../fire.js';
import '../css/workout.css';
import { v4 as uuidv4 } from 'uuid';
import { createNewWorkout } from '../services/workoutServices.js';

function CreateWorkout() {
    const nav = useNavigate();

    const [name, setName] = useState('');

    const [description, setDescription] = useState('');

    const [timeInMinutes, setTimeInMinutes] = useState('');

    const [difficulty, setDifficulty] = useState('');

    const [exercises, setExercises] = useState([
        { id: uuidv4(), exerciseName: '', sets: '', reps: ''},
    ]);
    
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
            nav("/workouts/");
            return createNewWorkout(fire.auth().currentUser.email, name, description, timeInMinutes, difficulty, exercises);
        }
        else{
            alert("Workout not created. Please check that all fields have the correct format.");
        }
    };
    
    const handleChangeInput = (id, event) => {
        const newexercises = exercises.map(i => {
        if(id === i.id) {
            i[event.target.name] = event.target.value;
        }
        return i;
        });
        
        setExercises(newexercises);
    }
    
    const handleAddFields = () => {
        setExercises([...exercises, { id: uuidv4(), exerciseName: '', sets: '', reps: '' }]);
    }
    
    const handleRemoveFields = id => {
        const values  = [...exercises];
        values.splice(values.findIndex(value => value.id === id), 1);
        setExercises(values);
    }

    return(
        <div className="App">
            <br/><h4 className="words">Create a new Workout</h4><br/>

            <Container>
                <form onSubmit={handleSubmit}>

                    <TextField
                        className="wn"
                        name="workoutName"
                        label="Workout Name"
                        variant="filled"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <br/>
                    <TextField
                        className="wn"
                        name="description"
                        label="Description"
                        variant="filled"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <br/>
                    <TextField
                        className="half"
                        name="timeInMinutes"
                        label="Time in Minutes"
                        variant="filled"
                        value={timeInMinutes}
                        onChange={event => setTimeInMinutes(event.target.value)}
                    />
                    <TextField
                        className="half"
                        name="difficulty"
                        label="Difficulty (1-10)"
                        variant="filled"
                        value={difficulty}
                        onChange={event => setDifficulty(event.target.value)}
                    />
                    <br/><br/>
                    <h5 className="words">Add Exercises</h5>
                    { exercises.map(inputField => (
                    <div key={inputField.id}>
                        <TextField
                        className="exerciseform"
                        name="exerciseName"
                        label="Exercise Name"
                        variant="filled"
                        value={inputField.exerciseName}
                        onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <TextField
                        className="exerciseform"
                        name="sets"
                        label="Sets"
                        variant="filled"
                        value={inputField.sets}
                        onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <TextField
                        className="exerciseform"
                        name="reps"
                        label="Reps"
                        variant="filled"
                        value={inputField.reps}
                        onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <IconButton disabled={exercises.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                        <RemoveIcon className="add-exercise"/>
                        </IconButton>
                        <IconButton
                        onClick={handleAddFields}
                        >
                        <AddIcon className="add-exercise"/>
                        </IconButton>
                    </div>
                    )) }
                    <br/>
                    <Button
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    onClick={handleSubmit}
                    >Create Workout</Button>
                </form>
            </Container>
        </div>
    )
}

export default React.memo(CreateWorkout);