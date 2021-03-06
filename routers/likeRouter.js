'use strict';

const likeRouter = require('express').Router();
const { executeQuery } = require('./executeQuery.js');

likeRouter.post('/p/', async (req, res) => {
    try{
        var q1 = "INSERT INTO WorkoutLikes VALUES('"+req.body.wid+"', '"+req.body.email+"')";
        var resp = await executeQuery(q1);

        if (process.env.HEROKU == 1){
            var q2 = "UPDATE Workouts SET likes = likes + 1 WHERE id = '"+req.body.wid+"'";
            var resp2 = await executeQuery(q2);
        }

        res.send({resp});

    }
    catch(e){
        console.log(e);
        res.send("failed");
    }
});

likeRouter.post('/p/unlike/', async (req, res) => {
    try{
        var q1 = "DELETE FROM WorkoutLikes WHERE w_id = '"+req.body.wid+"' and u_email = '"+req.body.email+"'";
        var resp = await executeQuery(q1);
        
        if (process.env.HEROKU == 1){
            var q2 = "UPDATE Workouts SET likes = likes - 1 WHERE id = '"+req.body.wid+"'";
            var resp2 = await executeQuery(q2);
        }

        res.send({resp});
    }
    catch(e){
        console.log(e);
        res.send("failed");
    }
});

module.exports = likeRouter;