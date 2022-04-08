import React, { useState } from 'react';
import { createChallenge } from '../services/challengeServices.js';
import { useNavigate } from 'react-router-dom';
import fire from '../fire.js';

function CreateChallenge(){

    const [weight, setWeight] = useState();
    const [description, setDescription] = useState();

    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (description) {
            createChallenge(fire.auth().currentUser.email, description, weight).then((challenge) => {
                nav("/challenges/")
            }).catch((error) => {
                alert("there was an error. Please try again.")
            });
        }
        else{
            alert("please fill out a description");
        }
    }

    return(
        <div className="App">
            <br/><h4 className="words">Create a new Challenge</h4><br/>
            <div className="upload">
                <div className="card border-primary text-centr" style={{backgroundColor: 'aliceblue', textAlign: 'center', marginLeft: '7%', width: '86%'}}>
                    <div className="card-body">

                        <form onSubmit={handleSubmit} className="form-inline" style={{marginLeft: '10%', marginRight: '10%', width: '80%'}}>
                            <h6 className="words">Weight:</h6>
                            <input className="form-control"label="Weight (optional)" value={weight}
                                    onChange={event => setWeight(event.target.value)}></input>
                            <p></p>
                            <h6 className="words">Challenge Description:</h6>
                            <textarea className="form-control"label="Challenge description" value={description}
                                    onChange={event => setDescription(event.target.value)}></textarea>
                            <p></p>
                            <input type="submit" value="Post Challenge" onClick={handleSubmit} className="btn btn-info"></input>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(CreateChallenge);