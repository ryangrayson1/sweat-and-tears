
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const workoutRouter = require('./controllers/workoutController.js');
var mysql = require('mysql');
const bodyParser = require('body-parser')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './frontend/build')));
//app.use('/wor/', workoutRouter);

const PORT = process.env.PORT || 3001;
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const pool = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.HOST,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PWORD,
  database        : process.env.DB_NAME
});

app.get('/wor/', (req, res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err;
      console.log('connected as id ' + connection.threadId);
      connection.query('SELECT * from Workouts', (err, rows) => {
          connection.release() // return the connection to pool

          if (!err) {
              res.send(rows);
          } else {
              console.log(err);
          }

          // if(err) throw err
          console.log('The data from User table are: \n', rows);
      })
  })
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});
  
module.exports = app;