import axios from 'axios';

export const createNewWorkout = async (name, description, timeInMinutes, difficulty, exercises, creatorEmail) => {
    const payload = {
        name,
        description,
        timeInMinutes,
        difficulty,
        exercises,
        creatorEmail
      };
      console.log(payload);
      try {
        const res = await axios.post('/wor/', payload);
        alert("workout successfully created");
    } catch (e) {
        alert("There was a problem creating your workout. please try again.")
        console.error(e);
      }
}