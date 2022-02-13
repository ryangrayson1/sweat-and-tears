'use strict';

const workoutRouter = require('express').Router();
var mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PWORD,
    database        : process.env.DB_NAME
});

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
