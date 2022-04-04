import axios from 'axios';

var local = "http://localhost:3001";

export const like = async (wid, email) => {
    try{
        const resp = await axios.post(local + '/lik/p/', {wid: wid, email: email});
        console.log(resp);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};

export const dislike = async (wid, email) => {
    try{
        const resp = await axios.post(local + '/lik/p/unlike/', {wid: wid, email: email});
        console.log(resp);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};