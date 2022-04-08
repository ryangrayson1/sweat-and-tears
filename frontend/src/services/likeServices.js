import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:3001';
}

export const like = async (wid, email) => {
    try{
        const resp = await axios.post('/lik/p/', {wid: wid, email: email});
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
        const resp = await axios.post('/lik/p/unlike/', {wid: wid, email: email});
        console.log(resp);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};