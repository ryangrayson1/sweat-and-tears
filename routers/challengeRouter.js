'use strict';

const challengeRouter = require('express').Router();
const { executeQuery } = require('./executeQuery.js');

challengeRouter.post('/p/', async (req, res) => {

    try{
        var q = "INSERT INTO Challenges (u_email, description, weight) VALUES ('"+req.body.u_email+"','"+req.body.descr+"', '"+req.body.weight+"')";
        var insertC = await executeQuery(q);
        res.send(insertC);
    }
    catch(err){
        res.send("failed");
        console.log(err);
    }

});

challengeRouter.get('/g/', async (req, res) => {
    try{
        var q = "SELECT * FROM Challenges";
        var c = await executeQuery(q);

        for (const challenge of c) {
            var q2 = "SELECT * FROM ChallengeComplete WHERE c_id = '"+challenge.id+"' and u_email = '"+req.query.u_email+"'";
            var likes = await executeQuery(q2);
            if (likes.length > 0) {
                challenge["user_completed"] = true;
            }
            else{
                challenge["user_completed"] = false;
            }
        }
        res.send(c);
    }
    catch(err){
        res.send("failed");
        console.log(err);
    }
});

challengeRouter.delete('/d/', async (req, res) => {
    try{
        var q = "DELETE FROM Challenges WHERE id = '"+req.query.c_id+"'";
        var r = await executeQuery(q);
        res.send(r);
    }
    catch(err){
        res.send("failed");
        console.log(err);
    }
});

challengeRouter.post('/p/c/', async (req, res) => {
    try{
        var q = "INSERT INTO ChallengeComplete (c_id, u_email) VALUES ('"+req.body.c_id+"','"+req.body.u_email+"')";
        var r = await executeQuery(q);
        res.send(r);
    }
    catch(err){
        res.send("failed");
        console.log(err);
    }
});

challengeRouter.delete('/d/c/', async (req, res) => {
    try{
        var q = "DELETE FROM ChallengeComplete WHERE c_id = '"+req.query.c_id+"' and u_email = '"+req.query.u_email+"'";
        var r = await executeQuery(q);
        res.send(r);
    }
    catch(err){
        res.send("failed");
        console.log(err);
    }
});

module.exports = challengeRouter;