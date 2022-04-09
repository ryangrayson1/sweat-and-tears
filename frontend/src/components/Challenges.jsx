import React, { useState, useEffect } from 'react';
import fire from '../fire.js';
import { getChallenges, deleteChal, completeChal } from '../services/challengeServices.js';

function Challenges(){

    const [chalData, setChalData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getChallenges(fire.auth().currentUser.email);
          setChalData(data);
        };

        fetchData();
      }, []);

      const delChallenge = (id) => {
          deleteChal(id);
      }

      const completeChallenge = (id) => {
          completeChal(id, fire.auth().currentUser.email);
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
                {chalData.map((chal) => (
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
                    {chal.user_completed}
                    {!chal.user_completed &&
                    <button className="btn btn-outline-success" onClick={() => completeChallenge(chal.id)}>
                        Complete Challenge
                    </button>}
                </>
                ))}
                </>}
        </div>
    )
}

export default React.memo(Challenges)