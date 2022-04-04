import axios from 'axios';

var local = "http://localhost:3001";

export const createDiscussion = async (email, topic, content) => {
    return new Promise((resolve, reject) => {
        var discData = {
            email,
            topic,
            content
        }
        axios.post(local + '/dis/p/', discData).then((response) => {
            resolve(response.data);

        }).catch((error) => {
            reject(error);
        });
    });
};

export const getDiscussions = async () => {
    return new Promise((resolve, reject) => {
        axios.get(local + '/dis/g/').then((response) => {
            console.log(response.data);
            resolve(response.data);

        }).catch((error) => {
            reject(error);
        });
    });
};