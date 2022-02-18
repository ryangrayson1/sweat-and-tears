import React, { useState, useEffect } from "react";
import { getUserData } from '../services/accountServices.js';
import '../css/workout.css';

function Profile() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getUserData();
          setUserData(data);
        };

        fetchData();
      }, []);
 
    return (
        <div className="App">
            <h1>Profile page under construction</h1>
            {!userData ? 
                (
                    <>
                        <h1>Loading user data...</h1>
                    </>
                ) :
                (
                    <>
                        <h2 className="words">Welcome, {userData.userData[0].first_name}</h2><br/>
                        <h2 className="words dataexample">Personal Info</h2>
                        <table id="dataTable" className="table words profiletable">
                            <tbody className="words">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Bio</th>
                                </tr>
                                <tr>
                                    <th>{userData.userData[0].first_name} {userData.userData[0].last_name}</th>
                                    <th>{userData.userData[0].email}</th>
                                    <th>{userData.userData[0].bio}</th>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )
            }
        </div>
    )
}

export default React.memo(Profile);