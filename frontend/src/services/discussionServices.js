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

export const getDiscussions = async (u_email) => {
    return new Promise((resolve, reject) => {
        axios.get(local + '/dis/g/', {params: {u_email}}).then((response) => {
            console.log(response.data);
            resolve(response.data);

        }).catch((error) => {
            reject(error);
        });
    });
};

export const voteDisc = async (d_id, u_email, vote) => {
    return new Promise((resolve, reject) => {
        var data = {
            d_id,
            u_email,
            vote
        }
        axios.post(local + '/dis/p/v/', data).then((response) => {
            resolve(response.data);

        }).catch((error) => {
            reject(error);
        });
    });
}