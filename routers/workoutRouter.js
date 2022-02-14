'use strict';

const workoutRouter = require('express').Router();
var mysql = require('mysql');

if (process.env.LOCAL_DEV == 1){ // local db connection
    const pool = mysql.createPool({
        connectionLimit : 10,
        host            : process.env.HOST,
        user            : process.env.MYSQL_USER,
        password        : process.env.MYSQL_PWORD,
        database        : process.env.DB_NAME
    });
}
else { //google cloud connection
    const pool = async config => {
        // Extract host and port from socket address
        const dbSocketAddr = process.env.CLOUD_HOST.split(':');
      
        // Establish a connection to the database
        return mysql.createPool({
          user: process.env.CLOUD_USER,
          password: process.env.CLOUD_USER_PWORD, 
          database: process.env.CLOUD_DB_NAME, 
          host: dbSocketAddr[0], 
          port: dbSocketAddr[1], 
        });
      };
}

workoutRouter.get('/g/', (req, res) => {
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
        });
    })
});

workoutRouter.post('/p/', (req, res) => {
    const n = req.body.name;
    const e = req.body.creatorEmail;
    const d = req.body.description;
    const t = req.body.timeInMinutes;
    const di = req.body.difficulty;
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        var qry = "INSERT INTO Workouts (email, w_name, description, time, difficulty) VALUES ('"+e+"', '"+n+"', '"+d+"', '"+t+"', '"+di+"')";
        connection.query(qry, (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
            console.log('The data from User table are: \n', rows);
        });
    });
});

module.exports = workoutRouter;
