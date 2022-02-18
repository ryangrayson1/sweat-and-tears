import React, { useState, useEffect } from "react";
import { getUserData } from '../services/accountServices.js';

function Profile() {

    const [userData, setUserData] = useState();
    const [userWorkouts, setUserWorkouts] = useState();

    useEffect(() => {
        const fetchData = async () => {
          const data = await getUserData();
          setUserData(data);
        };

        fetchData();
      }, []);

    return (
        <div className="App">
            <h1>Profile page under construction (pending DB setup)</h1>
        </div>
    )
}

export default React.memo(Profile);