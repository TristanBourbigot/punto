var dbSqlite = require('./sqliteConnection');
var dbMysql = require('./mysqlConnection');
var dbMongo = require('./mongoConnection');


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

    this.getUserMySQL = function(id, callback){
        this.use(null)
        var sql = "SELECT * FROM Users WHERE userId = ?";
        dbMysql.query(sql, [id], callback);
    };

    this.getUserByNameMySQL = function(name,callback){
        this.use(null)
        var sql = "SELECT * FROM Users WHERE nameUser = ?";
        dbMysql.query(sql, [name], callback);
    }

    this.addUserMySQL = function(values, callback){
        this.use(null)
        var sql = "INSERT INTO Users(nameUser) VALUES (?)";
        dbMysql.query(sql, [values], callback);
    }

    this.use = function(callback){
        var sql7 = "USE punto;";
        dbMysql.query(sql7, callback);
    };

    // MongoDB

    this.getUserMongo = async function(id){
        return await dbMongo.collection('users').find({userId: id}).toArray();
    };

    this.getUserByNameMongo = async function(name){
        return await dbMongo.collection('users').find({nameUser: name}).toArray();
    };

    this.addUserMongo = async function(name){
        return await dbMongo.collection('users').insertOne({nameUser: name});
    };
}


var users = new users();
module.exports = users;