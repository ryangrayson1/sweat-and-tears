import React, { useState } from 'react';

function CreateDiscussion(){
    const [topic, setTopic] = useState();
    const [content, setContent] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="App">
            <br/><h4 className="words">Create a new Discussion</h4><br/>
            <div className="upload">
                <div className="card border-primary text-centr" style={{backgroundColor: 'aliceblue', textAlign: 'center'}}>
                    <div clasName="card-body">
                        <form onSubmit={handleSubmit} style={{marginLeft: '15%', marginRight: '15%', width: '70%'}}>
                            <input name="topic" label="Topic" variant="filled" value={topic}
                                    onChange={event => setTopic(event.target.value)}></input>
                            <textarea name="content" label="Discussion" variant="filled" value={content}
                                    onChange={event => setContent(event.target.value)}></textarea>
                            <input type="submit" onClick={handleSubmit} className="btn btn-info"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CreateDiscussion);