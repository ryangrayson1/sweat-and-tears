'use strict';

const pool = require('./pool.js');
const profileRouter = require('express').Router();

profileRouter.get('/g/', (req, res) => {
    const eml = req.query.email;
    console.log(eml);
    var allUserData = {};
    var w_ids = [];

    pool.getConnection((err, connection) => {
        if (err) throw err;
        //getting user data
        var qry1 = "SELECT * FROM Users WHERE email = '"+eml+"'";
        connection.query(qry1, (err, rows) => {
            if (!err) {
                allUserData["userInfo"] = rows;
            } else {
                console.log(err);
            }
        });

        //get workouts created by this user, exercises will have to wait on this result
        var workoutData = new Promise((resolve, reject) => {
            var qry1 = "SELECT * FROM Workouts WHERE email = '"+eml+"'";
            connection.query(qry1, (err, rows) => {
                if (!err) {
                    allUserData["userWorkouts"] = rows;
                    resolve("workouts data retrieved successfully");
                } else {
                    reject(err);
                }
            });
        });

        workoutData.then((message) => {
            console.log(message);
        }).catch((err) => {
            console.log(err);
        });


    });
});

profileRouter.post('/p/', (req, res) => {
    const e = req.body.email;
    const fn = req.body.fname;
    const ln = req.body.lname;
    const bio = "";
    pool.getConnection((err, connection) => {
        if (err) throw err;
        var qry = "INSERT INTO Users (email, first_name, last_name, bio) VALUES('"+e+"', '"+fn+"', '"+ln+"', '"+bio+"')";
        connection.query(qry, (err, rows) => {
            connection.release();
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    });
});

module.exports = profileRouter;
