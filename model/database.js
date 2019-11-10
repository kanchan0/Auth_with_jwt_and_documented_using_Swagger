const mySQL = require("mysql");
const keys = require("../config/keys")
const Bluebird = require('bluebird');



var connection = mySQL.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : keys.db_password,
    database : keys.db_name
  });
   
connection.connect((err)=>{
    if(err) throw err;
    console.log("connected to the MySQL")
})   
//connection.end();        //disconnects from mysql

global.db  = Bluebird.promisifyAll(connection);
module.exports = db;