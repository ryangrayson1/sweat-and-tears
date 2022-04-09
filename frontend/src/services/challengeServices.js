import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:3001';
  }

  export const createChallenge = async (u_email, descr, weight) => {
    var data = {
        u_email,
        descr,
        weight
    }
    if (descr !== "" && descr !== null){
        axios.post('/cha/p/', data).then((response) => {
            console.log(response);
            if (response.data === "failed"){
                alert("Challenge creation failed. Please try again.");
            }
            else{
                alert("Challenge successfully created!");
            }
            return response.data;
        }).catch((error) => {
            alert("Challenge creation failed. Please try again.");
            console.error(error);
        });
    }
    else {
        alert("Creation failed. Challenge description cannot be blank");
    }
};

export const getChallenges = async (u_email) => {
    return new Promise((resolve, reject) => {
        axios.get('/cha/g/', {params: {u_email}}).then((response) => {
            console.log(response.data);
            resolve(response.data);

        }).catch((error) => {
            reject(error);
        });
    });
};

export const deleteChal = async (id) => {
    const sure = window.confirm("Are you sure you want to delete this challenge?");
    if (sure){
        try {
            await axios.delete('/cha/d/', {params:{c_id: id}});
            alert("Challenge successfully deleted. Refresh to view changes.");
        } catch (e) {
            console.error(e);
            alert("challenge deletion failed. Please try again.");
        }
    }
}

export const completeChal = async (id, u_email) => {
    var data = {
        c_id: id,
        u_email
    }
    axios.post('/cha/p/c/', data).then((response) => {
        if (response.data !== "failed"){
            alert("Well done! Challenge successfully completed!");
        }
        return response.data;
    }).catch((error) => {
        console.error(error);
    });
}

export const delCompleteChal = async (c_id, u_email) => {
    var data = {
        c_id,
        u_email
    }
    axios.delete('/cha/d/c/', {params: data}).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
    });
}