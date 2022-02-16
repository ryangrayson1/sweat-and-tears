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

profileRouter.post('/p/', (req, res) => {
    const e = req.body.email;
    const fn = req.body.fname;
    const ln = req.body.lname;
    const bio = "";
    pool.getConnection((err, connection) => {
        if (err) throw err;
        var qry = "INSERT INTO Users (email, first_name, last_name, bio) VALUES('"+e+"', '"+fn+"', '"+ln+"', '"+bio+"')";
        connection.query(qry, (err, rows) => {
            connection.release();
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    });
});

module.exports = profileRouter;
