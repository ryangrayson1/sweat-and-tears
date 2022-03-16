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
        console.log(user);
        const res = await axios.post('/pro/p/', userData);
        if (res){
            alert("account successfully created");
        }
        console.log("user " + user.uid + " successfully created");
        return "success";
    } catch (error) {
        console.log(error.message);
        var errname = error.message;

        if (errname === "Firebase: The email address is already in use by another account. (auth/email-already-in-use).") {
            alert("Account already exists. Please sign in.")
            return "exists";
        }
        else {
            alert("There was an error. Account creation Failed. Please check that you have entered a valid email.");
            return "failed";
        }
    }
};

export const getUserData = async () => {
    return new Promise((resolve, reject) => {
        const e = fire.auth().currentUser.email;
        const options = {
            method: 'GET',
            url: '/pro/g/',
            params: {email: e},
        }

        axios.request(options).then((response) => {
            console.log(response.data);
            resolve(response.data);

        }).catch((error) => {
            reject(error);
        });

    });
};