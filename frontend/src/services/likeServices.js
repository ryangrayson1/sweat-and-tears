import axios from 'axios';

export const like = async (wid, email) => {
    try{
        const resp = await axios.post('/lik/', {wid: wid, email: email});
        console.log(resp);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};