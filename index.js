'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const workoutRouter = require('./routers/workoutRouter.js');
const profileRouter = require('./routers/profileRouter.js');
const likeRouter = require('./routers/likeRouter.js');
const discussionRouter = require('./routers/discussionRouter.js');
const challengeRouter = require('./routers/challengeRouter.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './frontend/build')));
app.use('/wor/', workoutRouter);
app.use('/pro/', profileRouter);
app.use('/lik/', likeRouter);
app.use('/dis/', discussionRouter);
app.use('/cha/', challengeRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

if (process.env.LOCAL_DEV == 0) {
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
    });
}
  
module.exports = app;