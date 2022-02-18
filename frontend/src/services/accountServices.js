import fire from '../fire.js';
import axios from 'axios';

export const createNewUser = async (fname, lname, email, pword) => {
    const userData = {
        email,
        fname,
        lname
    }
    try{
        const user = await fire.auth().createUserWithEmailAndPassword(email, pword);
        console.log("user " + user.uid + " successfully created");
        const res = await axios.post('/pro/p/', userData);
        if (res){
            alert("account successfully created");
        }
        return res;
    } catch (error) {
        console.log(error);
        alert("account already exists. please sign in");
    }
};

export const getUserData = () => {
    const e = fire.auth().currentUser.email;
    const options = {
        method: 'GET',
        url: '/pro/g/',
        params: {email: e},
    }

    axios.request(options).then((response) => {
        console.log(response.data);
        return response.data;

    }).catch((error) => {
        console.error(error);
    });
}