var dbSqlite = require('./sqliteConnection');
var dbMysql = require('./mysqlConnection');

var users = function (){

    this.getUserSqlite = function(id, callback){
        this.use(null)
        var sql = "SELECT * FROM Users WHERE userId = ?";
        dbSqlite.all(sql, [id], callback);
    };

    this.getUserByNameSqlite = function(name,callback){
        this.use(null)
        var sql = "SELECT * FROM Users WHERE nameUser = ?";
        dbSqlite.all(sql, [name], callback);
    }

    this.addUserSqlite = function(values, callback){
        this.use(null)
        var sql = "INSERT INTO Users(nameUser) VALUES (?)";
        dbSqlite.run(sql, [values], callback);
    }

    this.use = function(callback){
        var sql7 = "USE punto;";
        dbMysql.query(sql7, callback);
    };
}


var users = new users();
module.exports = users;