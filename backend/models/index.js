let mysql = require('mysql');

let sqlLogin = process.env.CLEARDB_DATABASE_URL||{
    host:'localhost',
    user:'root',
    password:'root',
    database:'DenverAAMap',
    port:8889
}

let connection = mysql.createPool(sqlLogin);

module.exports = connection;