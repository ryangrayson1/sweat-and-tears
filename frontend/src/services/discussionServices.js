import axios from 'axios';

export const getDiscussions = async () => {
    return new Promise((resolve, reject) => {
        axios.get('/dis/g/').then((response) => {
            console.log(response.data);
            resolve(response.data);

        }).catch((error) => {
            reject(error);
        });

    });
};