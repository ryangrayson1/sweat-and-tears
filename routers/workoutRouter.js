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
  
            //if(err) throw err
            //console.log('The data from User table are: \n', rows);
        });
    })
});

workoutRouter.post('/p/', (req, res) => {
    console.log(req.body);
    const n = req.body.name;
    const e = req.body.creatorEmail;
    const d = req.body.description;
    const t = req.body.timeInMinutes;
    const di = req.body.difficulty;
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        
        let step1 = new Promise( (resolve, reject) => { //inserting new workout into database
            var qry = "INSERT INTO Workouts (email, w_name, description, time, difficulty) VALUES ('"+e+"', '"+n+"', '"+d+"', '"+t+"', '"+di+"')";
            connection.query(qry, (err, rows) => {
                if (!err) {
                    res.send(rows);
                    resolve(rows);
                } else {
                    console.log(err);
                    reject("query failed");
                }
            });
        });

        function step2(id){
            console.log("STEP2! ID = " + id);
            
            req.body.exercises.forEach((ex) => {
                console.log(ex.name);
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
        }

        step1.then((rows) => {
            var workID = rows.insertId; //get id from insert response
            step2(workID);
        })
        .catch((err) => {
            console.log(err);
        });       
    });
});

module.exports = workoutRouter;
