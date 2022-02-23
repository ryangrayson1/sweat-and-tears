'use strict';

const pool = require('./pool.js');

async function executeQuery(qry) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query(qry, (err, data) => {
                connection.release();
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    });
};

module.exports.executeQuery = executeQuery;