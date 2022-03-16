import React, { useState, useEffect } from 'react';
import { getDiscussions } from '../services/discussionServices.js';
import fire from '../fire.js';

function Discussions(){
    const [discData, setDiscData] = useState(null);
    const [searchValue, setSearchValue] = useState();

    useEffect(() => {
        const fetchData = async () => {
          const data = await getDiscussions();
          setDiscData(data["Discussions"]);
        };

        fetchData();
      }, []);

      const delDiscussion = () => {
          return 0;
      }

    return(
        <div className="App">
            <br/>
            <h3 className="words">Welcome to the Discussions page!</h3>

            <button className="btn btn-success">
                <a className="clean" href="/create-discussion/">Create a Discussion</a>
            </button>
            <br/><br/>

            {!discData ? 
                    <h3 className="words">Loading discussions...</h3> : 
                    <>

                        {!searchValue ? 
                            <>
                                {discData.map((disc) => (

                                    <>
                                        <div className="card workout-card bg-transparent border-primary words workout">
                                            <div className="card-header bg-transparent border-primary d-flex justify-content-between align-items-center">
                                                <div>
                                                    <i class="fas fa-user-alt"></i> <h3>{disc.topic}</h3>
                                                </div>
                                                {disc.u_email == fire.auth().currentUser.email &&
                                                    <button onClick={() => delDiscussion(disc.id, disc.u_email)} className="btn btn-danger active del">
                                                        Delete this Discussion
                                                </button>}
                                            </div>
                                            <div className="card-body bg-transparent border-primary">
                                                <h6>by {disc.u_email}</h6>
                                            </div>


                                            <div className="card-body bg-transparent border-primary">
                                                <h3>{disc.content}</h3>
                                            </div>

                                            {disc.followUps ? 
                                            <div className="card-footer bg-transparent border-primary">
                                                <ul className="list-group list-group-flush bg-transparent border-success">
                                                    {disc.followUps.map((fu) => (
                                                        <li className="list-group-item bg-transparent border-success"><div className="words">Follow up by {fu.u_email}: <h6>{fu.content}</h6></div></li>
                                                    ))}
                                                </ul>
                                            </div>
                                            :
                                            <div className="card-footer bg-transparent border-primary">
                                                No follow ups yet.
                                            </div>} 


                                            <br/>
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

export default React.memo(Discussions)