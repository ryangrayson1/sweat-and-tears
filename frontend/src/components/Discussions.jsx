import React, { useState, useEffect } from 'react';
import { getDiscussions } from '../services/discussionServices.js';
import fire from '../fire.js';

function Discussions(){
    const [discData, setDiscData] = useState(null);
    const [searchValue, setSearchValue] = useState();

    useEffect(() => {
        const fetchData = async () => {
          const data = await getDiscussions();
          setDiscData(data);
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

            {!discData ? 
                    <h3 className="words">Loading discussions...</h3> : 
                    <>

                        {!searchValue ? 
                            <>
                                {discData.map((disc) => (

                                    <>
                                        <div className="card workout-card bg-transparent border-primary words workout">
                                            <div className="card-header bg-transparent border-primary d-flex justify-content-between align-items-center">
                                                <b/><h3>{disc.topic}</h3>
                                                <h6>by {disc.u_email}</h6>
                                                <button type="button" class="btn btn-sm btn-primary">Button</button>
                                            </div>
                                            {disc.u_email == fire.auth().currentUser.email &&
                                            <button onClick={() => delDiscussion(disc.id, disc.u_email)} className="btn btn-danger active del">
                                                Delete this Discussion
                                            </button>}

                                            <div className="card-body bg-transparent border-primary">
                                                <h6>{disc.content}</h6>
                                            </div>


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