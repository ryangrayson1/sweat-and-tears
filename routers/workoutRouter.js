'use strict';

const workoutRouter = require('express').Router();
const pool = require('./pool.js');

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

        // var qry2 = "INSERT INTO Exercises ("
        // connection.query(qry2, (err, rows) => {
        //     connection.release() // return the connection to pool
        //     if (!err) {
        //         res.send(rows);
        //     } else {
        //         console.log(err);
        //     }
        //     console.log('The data from User table are: \n', rows);
        // });
    });
});

module.exports = workoutRouter;
