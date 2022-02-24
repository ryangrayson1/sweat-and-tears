'use strict';

const likeRouter = require('express').Router();
const { executeQuery } = require('./executeQuery.js');

likeRouter.post('', async (req, res) => {
    console.log(req.body.wid);

    try{
        var q1 = "INSERT INTO Likes VALUES('"+req.body.wid+"', '"+req.body.email+"')";
        var resp = await executeQuery(q1);

        var q2 = "UPDATE Workouts SET likes = likes + 1 WHERE w_id = '"+req.body.wid+"'";
        var resp2 = await executeQuery(q2);

        res.send({resp, resp2});

    }
    catch(e){
        console.log(e);
        res.send("failed");
    }


});

module.exports = likeRouter;