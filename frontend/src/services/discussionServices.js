import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:3001';
  }

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

export const getDiscussions = async (u_email) => {
    return new Promise((resolve, reject) => {
        axios.get('/dis/g/', {params: {u_email}}).then((response) => {
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
        axios.post('/dis/p/v/', data).then((response) => {
            resolve(response.data);

        }).catch((error) => {
            reject(error);
        });
    });
}

export const deleteDisc = async (id) => {
    const sure = window.confirm("Are you sure you want to delete this workout?");
    if (sure){
        try {
            await axios.delete('/dis/d/', {params:{d_id: id}});
            alert("Discussion successfully deleted. Refresh to view changes.");
        } catch (e) {
            console.error(e);
        }
    }
    else{
        alert("Deletion Cancelled");
        return false;
    }
    return true;
  };

export const createFollowUp = async (d_id, u_email, content) => {
    var data = {
        d_id,
        u_email,
        content
    }
    console.log("content*   " + content + "   *content");
    if (content !== "" && content !== null){
        axios.post('/dis/p/f/', data).then((response) => {
            console.log(response);
            if (response.data === "failed"){
                alert("You cannot create a duplicate follow up.");
            }
            else {
                alert("Follow up successfully added. Refresh to view changes.");
            }
        }).catch((error) => {
            alert("Follow up creation failed. Please try again.");
            console.error(error);
        });
    }
    else {
        alert("Follow up creation failed. You cannot write an empy follow up.");
    }
};