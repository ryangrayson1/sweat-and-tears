'use strict';

const pool = require('./pool.js');
const profileRouter = require('express').Router();

profileRouter.get('/g/', async (req, res) => {
    const eml = req.query.email;
    console.log(eml);
    
    var allData = {};

    try{
        var qry1 = "SELECT * FROM Users WHERE email = '"+eml+"'";
        var userData = await getData(qry1);
        allData["userData"] = userData;

        var qry2 = "SELECT * FROM Workouts WHERE u_email = '"+eml+"' ORDER BY id DESC";
        var userWorkouts = await getData(qry2);
        allData["userWorkouts"] = userWorkouts;

        for (const wrkout of allData.userWorkouts) {
            var qry3 = "SELECT * FROM Exercises WHERE w_id = '"+wrkout.id+"' ORDER BY id";
            var exs = await getData(qry3);
            console.log(exs)
            wrkout["exercises"] = exs;
        }

        console.log(allData);
        res.send(allData);
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

profileRouter.post('/p/', async (req, res) => {
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
