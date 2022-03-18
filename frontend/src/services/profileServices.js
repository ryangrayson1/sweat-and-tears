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
        const res = await axios.post('/pro/p/', userData);
        console.log(res);
        console.log(user);
        return "success";
    } catch (error) {
        var errname = error.message;
        console.log(errname);

        if (errname === "Firebase: The email address is already in use by another account. (auth/email-already-in-use).") {
            return "exists";
        }
        else {
            return "failed";
        }
    }
};

export const loginAttempt = async (email, password) => {
    try{
      var user = await fire.auth().signInWithEmailAndPassword(email, password);
      if (user){ 
        return "success";
      }
    }
    catch (error) {
        return "failed";
    };
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