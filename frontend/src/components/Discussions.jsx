import React, { useState, useEffect } from 'react';
import { getDiscussions, voteDisc, deleteDisc, createFollowUp } from '../services/discussionServices.js';
import fire from '../fire.js';

function Discussions(){
    const [discData, setDiscData] = useState(null);
    const [searchValue, setSearchValue] = useState();

    const [votes, setVotes] = useState()
    const [voteUpdate, setVoteUpdate] = useState(0);

    const [followingUp, setFollowingUp] = useState();
    const [followUpContent, setFollowUpContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          const data = await getDiscussions(fire.auth().currentUser.email);
          setDiscData(data["Discussions"]);

          var uservotes = {}
          for (const d of data["Discussions"]){
              uservotes[d.id] = [d.user_vote, d.votes];
          }

          setVotes(uservotes);
        };

        fetchData();
      }, []);

      const delDiscussion = (id) => {
          deleteDisc(id);
      }

      const upvote = (d_id) => {
        if (votes[d_id][0] === 1){
            return;
        }
        setVoteUpdate(voteUpdate + 1);
        var newvotes = votes;
        var toadd = 1;
        if (votes[d_id][0] === -1){
            toadd = 2;
        }
        newvotes[d_id] = [1, votes[d_id][1] + toadd];
        setVotes(newvotes);
        voteDisc(d_id, fire.auth().currentUser.email, toadd);
      };

      const downvote = (d_id) => {
        if (votes[d_id][0] === -1) {
            return;
        }
        setVoteUpdate(voteUpdate - 1);
        var newvotes = votes;
        var toadd = -1
        if (votes[d_id][0] === 1) {
            toadd = -2;
        }
        newvotes[d_id] = [-1, votes[d_id][1] + toadd];
        setVotes(newvotes);
        voteDisc(d_id, fire.auth().currentUser.email, toadd);
    };

    const writeFollowUp = (d_id) => {
        createFollowUp(d_id, fire.auth().currentUser.email, followUpContent);
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
                                        <div>
                                            {votes && 
                                                <>
                                                {votes[disc.id][0] === -1 ?
                                                <button className="btn-danger" onClick={() => downvote(disc.id)}>
                                                    - <div hidden>{voteUpdate}</div>
                                                </button> : 
                                                <button className="btn-outline-danger" onClick={() => downvote(disc.id)}>
                                                    - <div hidden>{voteUpdate}</div>
                                                </button>}
                                                &emsp;
                                                <span>{votes[disc.id][1]}</span>
                                                &emsp;
                                                {votes[disc.id][0] === 1 ? 
                                                <button className="btn-success" onClick={() => upvote(disc.id)}>
                                                    + <div hidden>{voteUpdate}</div>
                                                </button> :
                                                <button className="btn-outline-success" onClick={() => upvote(disc.id)}>
                                                    + <div hidden>{voteUpdate}</div>
                                                </button>}
                                                </>
                                            }
                                        </div>
                                        <div className="card workout-card bg-transparent border-primary words workout">
                                            <div className="card-header bg-transparent border-primary align-items-center">
                                                <div>
                                                    <i className="fas fa-user-alt"></i> <h3>{disc.topic}</h3>
                                                </div>
                                                <div>
                                                    by {disc.u_email}
                                                </div>
                                                <br/>
                                                {disc.u_email === fire.auth().currentUser.email &&
                                                    <button onClick={() => delDiscussion(disc.id)} className="btn btn-danger active del">
                                                        Delete this Discussion
                                                    </button>}
                                            </div>

                                            <div className="card-body bg-transparent border-primary">
                                                <h3>{disc.content}</h3>
                                            </div>
                                            <div className="card-footer bg-transparent border-primary">
                                            {!followingUp &&
                                            <button className="btn btn-info" onClick={() => setFollowingUp(disc.id)}>
                                                    <h6 className="clean">Write a Follow-Up</h6>
                                            </button>}
                                            <br/>
                                            {followingUp === disc.id &&
                                                <form>
                                                    Follow up content:
                                                    <textarea style={{width: "90%"}} value={followUpContent} onChange={(e) => setFollowUpContent(e.target.value)}/>
                                                    <br/>
                                                    <input type="submit" className="btn btn-success" value="Post" onClick={() => writeFollowUp(disc.id)}/>
                                                </form>
                                            }
                                            <br/>
                                            {disc.followUps !== undefined && disc.followUps.length !== 0 ?
                                                <>
                                                <ul className="list-group list-group-flush bg-transparent border-success">
                                                    Follow Ups:
                                                    {disc.followUps.map((fu) => (
                                                        <>
                                                        <div className="card workout-card bg-transparent border-primary words workout">
                                                            <li className="list-group-item bg-transparent border-success"><div className="words">Follow up by {fu.u_email}: <h6>{fu.content}</h6></div></li>
                                                        </div>
                                                        <br/>
                                                        </>
                                                    ))}
                                                </ul>
                                                </>
                                            :   <>
                                                    No Follow Ups yet.
                                                    <br/>
                                                </>
                                            } 
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