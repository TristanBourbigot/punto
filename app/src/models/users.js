var dbSqlite = require('./sqliteConnection');

var users = function (){

    this.getUserSqlite = function(id, callback){
        var sql = "SELECT * FROM Users WHERE userId = ?";
        dbSqlite.all(sql, [id], callback);
    };

    this.getUserByNameSqlite = function(name,callback){
        var sql = "SELECT * FROM Users WHERE nameUser = ?";
        dbSqlite.all(sql, [name], callback);
    }

    this.addUserSqlite = function(values, callback){
        var sql = "INSERT INTO Users(nameUser) VALUES (?)";
        dbSqlite.run(sql, [values], callback);
    }

}


var users = new users();
module.exports = users;