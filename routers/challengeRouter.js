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

module.exports = challengeRouter;