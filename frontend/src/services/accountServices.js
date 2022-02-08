import fire from '../fire.js';

export const createNewUser = async (fname, lname, email, pword) => {
    try {
        const user = await fire.auth().createUserWithEmailAndPassword(email, pword);
        console.log(user.uid);
        return true;
    } catch (error) {
        console.log(error.message);
        alert("account already exists. please sign in");
    }
};