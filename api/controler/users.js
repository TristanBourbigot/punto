var userModel = require('../models/users.js');

var usersControler = function (){

    // SQLite

    this.getUserSqlite = function(id, callback){
        userModel.getUserSqlite(id, callback);
    };

    this.getUserByNameSqlite = function(name,callback){
        userModel.getUserByNameSqlite(name, callback);
    }

    this.addUserSqlite = function(values, callback){
        userModel.getUserByNameSqlite(values, function (err, data) {
            if (data.length > 0) {
                callback(null, data);
            } else {
                userModel.addUserSqlite(values, callback);
            }
        });
    }

    // MySQL

    this.getUserMySQL = function(id, callback){
        userModel.getUserMySQL(id, callback);
    };

    this.getUserByNameMySQL = function(name,callback){
        userModel.getUserByNameMySQL(name, callback);
    }

    this.addUserMySQL = function(values, callback){
        userModel.getUserByNameMySQL(values, function (err, rows) {
            if (rows && rows.length > 0) {
                callback(null, rows);
            } else {
                userModel.addUserMySQL(values, callback);
            }
        });
    }

    // MongoDB

    this.getUserMongo = async function(id){
        return await userModel.getUserMongo(id);
    };

    this.getUserByNameMongo = async function(name){
        return await userModel.getUserByNameMongo(name);
    };

    this.addUserMongo = async function(name, callback){
        data = await userModel.getUserByNameMongo(name);
        if(data.length > 0) return {message : "name all ready exist"}
        return await userModel.addUserMongo(name, callback);
    }
}


var usersControler = new usersControler();
module.exports = usersControler;