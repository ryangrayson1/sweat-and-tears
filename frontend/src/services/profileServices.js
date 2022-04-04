import fire from '../fire.js';
import axios from 'axios';

var local = "http://localhost:3001";

export const enterNewUser = (fname, lname, email) => {
    const userData = {
        email,
        fname,
        lname
    }
    axios.post(local + '/pro/p/', userData).then((response) => {
        console.log(response);
    }).catch((err) => {
        console.error(err);
    });
};

export const getUserData = async () => {
    return new Promise((resolve, reject) => {
        const e = fire.auth().currentUser.email;
        const options = {
            method: 'GET',
            url: local + '/pro/g/',
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