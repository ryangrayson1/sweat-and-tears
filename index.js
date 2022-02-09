
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const workoutRouter = require('./controllers/workoutController.js');
var mysql = require('mysql');

var connection;
if (process.env.LOCAL_DEV == 1){
  connection= mysql.createConnection({
  host: 'localhost',
  
  });
}
else {

}

app.use(cors());
app.use(express.json());
//app.use(express.static(path.resolve(__dirname, './frontend/build')));
//app.use('/wor/', workoutRouter);
app.use(express.urlencoded({ extended: false }));

// app.get('/wor', (req, res) => {
//   res.send("workouts api endpoint");
// });

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
// });
  
const PORT = process.env.PORT || 3001;
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
module.exports = app;