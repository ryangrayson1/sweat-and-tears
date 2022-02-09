const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const workoutRouter = require('./controllers/workoutController.js')

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './frontend/build')));
//app.use('/wor/', workoutRouter);

app.get('/wor', (req, res) => {
  res.send("workouts api endpoint");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});
  
const PORT = process.env.PORT || 3001;
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
  module.exports = app;