'use strict';

const workoutRouter = require('express').Router();
const pool = require('./pool.js');
const { executeQuery } = require('./executeQuery.js');

workoutRouter.get('/g/', async (req, res) => {
    try{
        if (req.query.filter === null || req.query.filter === undefined || req.query.filter === ""){
            var filter = "";
        }
        else{
            var filter = "";//" WHERE name LIKE '%"+req.query.filter+"%' OR description LIKE '%"+req.query.filter+"%' or u_email LIKE '%"+req.query.filter+"%'";
        }
        var qry1 = "SELECT * FROM Workouts" + filter;
        var wData = await executeQuery(qry1);

        for (const wrkout of wData) {
            var qry2 = "SELECT * FROM Exercises WHERE w_id = '"+wrkout.id+"' ORDER BY id";
            var exs = await executeQuery(qry2);
            wrkout["exercises"] = exs;

            var qry3 = "SELECT * FROM WorkoutLikes WHERE w_id = '"+wrkout.id+"' and u_email = '"+req.query.u_email+"'";
            var user_liked = await executeQuery(qry3);
            if (user_liked.length > 0){
                wrkout["user_liked"] = true;
            }
            else{
                wrkout["user_liked"] = false;
            }

            var qry4 = "SELECT * FROM WorkoutComments WHERE w_id = '"+wrkout.id+"'";
            var c = await executeQuery(qry4);
            wrkout["comments"] = c;
        }

        res.send(wData);
    }
    catch(err){
        console.log(err);
    }
});

workoutRouter.post('/p/', async (req, res) => {
    const em = req.body.u_email;
    const n = req.body.name;
    const d = req.body.description;
    const t = req.body.time;
    const di = req.body.difficulty;
    const l = 0;
        
    try{
        var q1 = "INSERT INTO WORKOUTS (u_email, name, description, time, difficulty, likes) VALUES ('"+em+"','"+n+"','"+d+"','"+t+"','"+di+"','"+l+"')";
        var r1 = await executeQuery(q1);
        
        for (const e of req.body.exercises) {
            var q2 = "INSERT INTO EXERCISES (w_id, name, sets, reps) VALUES ('"+r1.insertId+"','"+e.exerciseName+"','"+e.sets+"','"+e.reps+"')";
            var r2 = await executeQuery(q2);
        }

        res.send(r1);

    }
    catch(err){
        console.log(err);
        res.send("failed");
    }
});

workoutRouter.post('/e/', async (req, res) => {
    console.log(req.body);
    try{
        var q1 = "UPDATE Workouts SET name = '"+req.body.name+"', description = '"+req.body.description+"', difficulty = '"+req.body.difficulty+"', time = '"+req.body.time+"' WHERE id = '"+req.body.id+"'";
        await executeQuery(q1);

        for (const ex of req.body.exercises){
            var q2 = "UPDATE Exercises SET name = '"+ex.name+"', sets = '"+ex.sets+"', reps ='"+ex.reps+"' WHERE id = '"+ex.id+"'";
            await executeQuery(q2);
        }
        res.send("success");
    }
    catch(err) {
        console.log(err);
        res.send("failed");
    }

});

workoutRouter.delete('/d/', async (req, res) => {
    try{
        var q = "DELETE FROM Workouts WHERE id = '"+req.query.w_id+"'";
        var r = await executeQuery(q);
        res.send(r);
    }
    catch(err) {
        console.log(err);
        res.send("failed");
    }
});

workoutRouter.post('/c/', async (req, res) => {
    try{
        var q = "INSERT INTO WorkoutComments (w_id, u_email, content) VALUES ('"+req.body.w_id+"','"+req.body.u_email+"','"+req.body.content+"')";
        var r = await executeQuery(q);
        res.send(r);
    }
    catch(err){
        console.log(err);
        res.send("failed");
    }
});

module.exports = workoutRouter;
