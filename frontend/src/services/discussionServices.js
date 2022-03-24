import axios from 'axios';

export const createDiscussion = async (email, topic, content) => {
    return new Promise((resolve, reject) => {
        var discData = {
            email,
            topic,
            content
        }
        axios.post('/dis/p/', discData).then((response) => {
            resolve(response.data);

        }).catch((error) => {
            reject(error);
        });
    });
};

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