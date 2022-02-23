'use strict';

const workoutRouter = require('express').Router();
const pool = require('./pool.js');

workoutRouter.get('/g/', async (req, res) => {

    try{
        var qry1 = "SELECT * FROM Workouts";
        var wData = await getData(qry1);

        for (const wrkout of wData) {
            var qry3 = "SELECT * FROM Exercises WHERE wr_id = '"+wrkout.w_id+"' ORDER BY e_id";
            var exs = await getData(qry3);
            wrkout["exercises"] = exs;
        }

        console.log(wData);
        res.send(wData);
    }
    catch(err){
        console.log(err);
    }

    async function getData(qry) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) throw err;
                connection.query(qry, (err, data) => {
                    connection.release();
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        });
    };
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
                    //res.send(rows);
                    resolve(rows);
                } else {
                    console.log(err);
                    reject("query failed");
                }
            });
        });

        function step2(id){
            return new Promise((resolve, reject) => {
                console.log("STEP2! ID = " + id);
                
                console.log(req.body);
                req.body.exercises.forEach((ex) => {
                    var qry = "INSERT INTO Exercises (wr_id, e_name, sets, reps) VALUES ('"+id+"', '"+ex.exerciseName+"', '"+ex.sets+"', '"+ex.reps+"')";
                    connection.query(qry, (err, rows) => {
                        if (!err) {
                            // res.send(rows);
                        } else {
                            console.log(err);
                            reject("error creating the workout");
                        }
                    });   
                });
                resolve("success!");
            });
        }

        step1.then((rows) => {
            var workID = rows.insertId; //get id from insert response
            step2(workID)
            .then((result) => {
                console.log(result);
                res.send(rows);
                connection.release();
            })
            .catch((err) => {
                console.log(err);
                connection.release();
            });
        })
        .catch((err) => {
            console.log(err);
        });       
    });
});

workoutRouter.delete('/d/', async (req, res) => {

    try{
        await deleteWorkout();
        return true;
    }
    catch(err) {
        console.log(err);
    }

    async function deleteWorkout(){
        //delete from workout table
        pool.getConnection((err, connection) => {
            if (err){ throw err; }
            var qry = "DELETE FROM Workouts WHERE w_id = '"+req.query.w_id+"'";
            connection.query(qry, (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(result);
                }
            });
        });
        //delete from exercise table
        pool.getConnection((err, connection) => {
            if (err){ throw err; }
            var qry = "DELETE FROM Exercises WHERE wr_id = '"+req.query.w_id+"'";
            connection.query(qry, (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(result);
                }
            });
        });
    };
});

module.exports = workoutRouter;
