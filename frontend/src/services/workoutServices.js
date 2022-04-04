import axios from 'axios';

var local = "http://localhost:3001";

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
        const res = await axios.post(local + '/wor/p/', payload);
        alert("workout successfully created");
        return res;
    } catch (e) {
        alert("There was a problem creating your workout. please try again.")
        console.error(e);
      }
}

export const getWorkoutData = async (u_email) => {
  try {
      const res = await axios.get(local + '/wor/g/', {params: {u_email}});
      return res.data;
    } catch (e) {
      console.error(e);
    }
};

export const deleteWorkout = async (id, email) => {
  const sure = window.confirm("Are you sure you want to delete this workout?");
  if (sure){
      try {
          await axios.delete(local + '/wor/d/', {params:{w_id: id, w_email: email}});
          alert("Workout successfully deleted. Refresh to view changes.");
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


export const editWorkout = async (id, name, description, difficulty, time, exercises) => {
  var data = {
    id,
    name,
    description,
    difficulty,
    time,
    exercises
  }
  console.log("HERE");
  try{
    await axios.post(local + '/wor/e/', data);
    alert("Workout successfully edited! Refresh to view changes.");
  }
  catch{
    alert("There was an error editing this workout. Changes not saved.")
  }
}