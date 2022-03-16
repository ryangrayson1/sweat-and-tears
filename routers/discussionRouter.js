'use strict';

const discussionRouter = require('express').Router();
const { executeQuery } = require('./executeQuery.js');

discussionRouter.get('/g/', async (req, res) => {

    try{
        var q1 = "SELECT * FROM Discussions";
        var discs = await executeQuery(q1);
        res.send(discs)
    }
    catch(err){
        res.send('failed')
        console.log(err)
    }

});

module.exports = discussionRouter;