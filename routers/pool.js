'use strict'

var mysql = require('mysql');
const dotenv = require('dotenv').config();

var pool = null;

if (process.env.LOCAL_DEV == 1){ // local db connection
    pool = mysql.createPool({
        connectionLimit : 10,
        host            : process.env.HOST,
        user            : process.env.MYSQL_USER,
        password        : process.env.MYSQL_PWORD,
        database        : process.env.DB_NAME
    });
}

else if (process.env.HEROKU == 1){ // heroku db connection
    pool = mysql.createPool({
        connectionLimit : 10,
        host            : process.env.HEROKU_DB_HOST,
        user            : process.env.HEROKU_DB_USER,
        password        : process.env.HEROKU_DB_PWORD,
        database        : process.env.HEROKU_DB_NAME
    });
}

else { //google cloud connection
  pool = async config => {
      // Extract host and port from socket address
      const dbSocketAddr = process.env.CLOUD_HOST.split(':');
    
      // Establish a connection to the database
      return mysql.createPool({
        user: process.env.CLOUD_USER,
        password: process.env.CLOUD_USER_PWORD, 
        database: process.env.CLOUD_DB_NAME, 
        host: dbSocketAddr[0], 
        port: dbSocketAddr[1], 
      });
    };
}

module.exports = pool;