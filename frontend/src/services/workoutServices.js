import axios from 'axios';

export const createNewWorkout = async (name, description, timeInMinutes, difficulty, exercises, creatorEmail) => {
    const payload = {
        name,
        description,
        timeInMinutes,
        difficulty,
        creatorEmail,
        exercises
      };
      try {
        const res = await axios.post('/wor/p/', payload);
        alert("workout successfully created");
        return res;
    } catch (e) {
        alert("There was a problem creating your workout. please try again.")
        console.error(e);
      }
}

export const getWorkoutData = async () => {
  try {
      const res = await axios.get('/wor/g/');
      return res.data;
    } catch (e) {
      console.error(e);
    }
}