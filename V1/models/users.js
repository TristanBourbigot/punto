var dbSqlite = require('./sqliteConnection');

var users = function (){

    this.getUser = function(id, callback){
        var sql = "SELECT * FROM Users WHERE userId = ?";
        dbSqlite.all(sql, [id], callback);
    };

    this.getUserByName = function(name,callback){
        var sql = "SELECT * FROM Users WHERE userName = ?";
        dbSqlite.all(sql, [name], callback);
    }

    this.addUser = function(values, callback){
        var sql = "INSERT INTO Users(userId,userName) VALUES (?,?)";
        dbSqlite.run(sql, values, callback);
    }

}


var users = new users();
module.exports = users;