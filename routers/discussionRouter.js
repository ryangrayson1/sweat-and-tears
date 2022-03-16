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

module.exports = discussionRouter;