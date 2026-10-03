const {Pool} = require("pg");


const pool = new Pool( {
    user :'authentication_database_user',
    password: 'authentication@123',
    port : 5432,
    host: 'localhost',
    database:'signuploginapi_database'
})

module.exports = pool;
