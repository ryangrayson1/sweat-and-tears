import React, { useState } from 'react';
import { createDiscussion } from '../services/discussionServices.js';
import { useNavigate } from 'react-router-dom';
import fire from '../fire.js';

function CreateDiscussion(){
    const [topic, setTopic] = useState();
    const [content, setContent] = useState();

    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (topic && content) {
            createDiscussion(fire.auth().currentUser.email, topic, content).then((discussion) => {
                nav("/discussions/")
                alert("Discussion successfully posted!");
            }).catch((error) => {
                alert("there was an error. Please try again.")
            });
        }
        else{
            alert("please fill out all fields");
        }
    }
    return (
        <div className="App">
            <br/><h4 className="words">Create a new Discussion</h4><br/>
            <div className="upload">
                <div className="card border-primary text-centr" style={{backgroundColor: 'aliceblue', textAlign: 'center'}}>
                    <div className="card-body">

                        <form onSubmit={handleSubmit} className="form-inline" style={{marginLeft: '10%', marginRight: '10%', width: '80%'}}>
                            <h6 className="words">Topic:</h6>
                            <input className="form-control" name="topic" label="Topic" value={topic}
                                    onChange={event => setTopic(event.target.value)}></input>
                            <p></p>
                            <h6 className="words">Discussion content:</h6>
                            <textarea className="form-control" name="content" label="Discussion" value={content}
                                    onChange={event => setContent(event.target.value)}></textarea>
                            <p></p>
                            <input type="submit" value="Post Discussion" onClick={handleSubmit} className="btn btn-info"></input>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CreateDiscussion);