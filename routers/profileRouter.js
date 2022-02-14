'use strict';

const pool = require('./pool.js');
const profileRouter = require('express').Router();

// profileRouter.get('/g/', (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         var qry = "SELECT "
//         connection.query()
//     });
// });

module.exports = profileRouter;
