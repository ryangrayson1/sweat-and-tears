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
        const res = await axios.post('http://localhost:3001/wor/', payload);
        alert("workout successfully created");
        return res;
    } catch (e) {
        alert("There was a problem creating your workout. please try again.")
        console.error(e);
      }
}

export const getWorkoutData = async () => {
  try {
      const res = await axios.get('/wor');
      return res.data;
    } catch (e) {
      console.error(e);
    }
}