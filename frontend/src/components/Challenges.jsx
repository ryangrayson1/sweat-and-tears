import React, { useState, useEffect } from 'react';
import fire from '../fire.js';
import { getChallenges, deleteChal, completeChal, delCompleteChal } from '../services/challengeServices.js';

function Challenges(){

    const [chalData, setChalData] = useState(null);
    const [hasCompleted, setHasCompleted] = useState();
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getChallenges(fire.auth().currentUser.email);
          setChalData(data);

        var user_complete = {}
          for (const c of data){
              user_complete[c.id] = c.user_completed;
          }
          setHasCompleted(user_complete);
        };

        fetchData();
      }, []);

    const delChallenge = (id) => {
        deleteChal(id);
    }

    const completeChallenge = (id) => {
        var newComp = hasCompleted;
        newComp[id] = true;
        setHasCompleted(newComp);
        setUpdate(update + 1);
        completeChal(id, fire.auth().currentUser.email);
    }

    const uncompleteChallenge = (id) => {
        var newComp = hasCompleted;
        newComp[id] = false;
        setHasCompleted(newComp);
        setUpdate(update - 1);
        delCompleteChal(id, fire.auth().currentUser.email);
    }
    
    return(
        <div className="App">
            <br/>
            <h3 className="words">Welcome to the Challenges page!</h3>
            <h6>Here you can challenge other users to complete difficult physical activities!</h6>
            <button className="btn btn-success">
                <a className="clean" href="/create-challenge/">Create a Challenge</a>
            </button>
            <br/><br/>
            {!chalData ?
                <div>Loading...</div> :
                <>
                {chalData && chalData.map((chal) => (
                <>
                    <div className="card workout-card bg-transparent border-primary words workout">
                        <div className="card-header bg-transparent border-primary align-items-center">
                            <div>
                                Challenge by {chal.u_email}
                            </div>
                            <br/>
                            {chal.u_email === fire.auth().currentUser.email &&
                                <button onClick={() => delChallenge(chal.id)} className="btn btn-danger active del">
                                    Delete
                                </button>}
                            <br/>
                            <br/>
                            {chal.weight && <div>Weight: {chal.weight}</div>}
                        </div>
                        <div className="card-body bg-transparent border-primary">
                            <h4>{chal.description}</h4>
                        </div>
                    </div>
                    {hasCompleted &&
                    <>
                    {!hasCompleted[chal.id] ?
                        <button className="btn btn-outline-success" onClick={() => completeChallenge(chal.id)}>
                            Complete Challenge
                        </button> :
                        <button className="btn btn-success" onClick={() => uncompleteChallenge(chal.id)}>
                            Challenge Complete!
                        </button>}
                    </>}
                    <br/><br/>
                </>
                ))}
                </>}
        </div>
    )
}

export default React.memo(Challenges)