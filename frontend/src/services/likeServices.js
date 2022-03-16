import axios from 'axios';

export const like = async (wid, email) => {
    console.log(wid)
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