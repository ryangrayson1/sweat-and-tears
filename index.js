'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const workoutRouter = require('./routers/workoutRouter.js');
const profileRouter = require('./routers/profileRouter.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './frontend/build')));
app.use('/wor/', workoutRouter);
app.use('/pro/', profileRouter);

const PORT = process.env.PORT || 3001;
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});
  
module.exports = app;