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

            var q3 = "SELECT * FROM DiscVotes WHERE d_id = '"+disc.id+"' and u_email = '"+req.query.u_email+"'";
            var vote = await executeQuery(q3);
            if (vote.length > 0){
                disc["user_vote"] = vote[0].value;
            }
            else{
                disc["user_vote"] = 0;
            }
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

discussionRouter.post('/p/v/', async (req, res) => { 
    var vote = req.body.vote
    var truevote = vote
    if (vote == 2){
        truevote = 1;
    }
    else if (vote == -2){
        truevote = -1;
    }
    try{
        var q = "UPDATE Discussions SET votes = votes + '"+vote+"' WHERE id = '"+req.body.d_id+"'";
        var updateVotes = await executeQuery(q);

        var q2 = "SELECT * FROM DiscVotes WHERE d_id = '"+req.body.d_id+"' and u_email = '"+req.body.u_email+"'";
        var vote = await executeQuery(q2);
        if (vote.length > 0){
            var q3 = "UPDATE DiscVotes SET value = '"+truevote+"' WHERE d_id = '"+req.body.d_id+"' and u_email = '"+req.body.u_email+"'";
        }
        else{
            var q3 = "INSERT INTO DiscVotes VALUES ('"+req.body.d_id+"', '"+req.body.u_email+"', '"+truevote+"')";
        }
        var recordVote = await executeQuery(q3);

        res.send(recordVote);
    }
    catch(err){
            res.send("failed");
            console.log(err);
    }    
});
module.exports = discussionRouter;