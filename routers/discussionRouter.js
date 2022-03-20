'use strict';

const discussionRouter = require('express').Router();
const { executeQuery } = require('./executeQuery.js');

discussionRouter.get('/g/', async (req, res) => {

    var allData = {}

    try{
        var q1 = "SELECT * FROM Discussions";
        var discs = await executeQuery(q1);
        allData["Discussions"] = discs

        for (const disc of allData.Discussions) {
            var q2 = "SELECT * FROM DiscFollowUps WHERE d_id = '"+disc.id+"'";
            var fus = await executeQuery(q2);
            disc["followUps"] = fus;
        }
        
        res.send(allData);
    }
    catch(err){
        res.send('failed')
        console.log(err)
    }

});

discussionRouter.post('/p/', async (req, res) => {

    try{
        var q = "INSERT INTO Discussions (u_email, topic, content) VALUES ('"+req.body.email+"','"+req.body.topic+"', '"+req.body.content+"')";
        var insertDisc = await executeQuery(q);
        res.send(insertDisc);
    }
    catch(err){
        res.send("failed");
        console.log(err);
    }

});

module.exports = discussionRouter;