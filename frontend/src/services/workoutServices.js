import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3001';
}

export const createNewWorkout = async (u_email, name, description, time, difficulty, exercises) => {
    const wdata = {
        u_email,
        name,
        description,
        time,
        difficulty,
        exercises
      };
      try {
        const res = await axios.post('/wor/p/', wdata);
        if (res.data !== "failed") {
          alert("workout successfully created");
        }
        return res;
    } catch (e) {
        alert("There was a problem creating your workout. please try again.")
        console.error(e);
      }
}

export const getWorkoutData = async (u_email, filter) => {
  try {
      const res = await axios.get('/wor/g/', {params: {u_email, filter}});
      return res.data;
    } catch (e) {
      console.error(e);
    }
};

export const deleteWorkout = async (id, email) => {
  const sure = window.confirm("Are you sure you want to delete this workout?");
  if (sure){
      try {
          const r = await axios.delete('/wor/d/', {params:{w_id: id}});
          if (r.data !== "failed") {
            alert("Workout successfully deleted. Refresh to view changes.");
          }
      } catch (e) {
          alert("workout deletion failed. Please try again.");
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
    await axios.post('/wor/e/', data);
    alert("Workout successfully edited! Refresh to view changes.");
  }
  catch{
    alert("There was an error editing this workout. Changes not saved.")
  }
}

export const createComment = async (w_id, u_email, content) => {
  try{
    await axios.post('/wor/c/', {w_id, u_email, content});
    alert("Comment Posted!");
  }
  catch(err){
    console.log(err);
    alert("There was an error posting your comment. Please try again.");
  }
};