var userModel = require('../models/users.js');

var usersControler = function (){

    // SQLite

    this.getAllUserSqlite = function(callback){
        userModel.getAllUserSqlite(callback);
    };

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
                userModel.addUserSqlite(values, function (err, data) {
                    userModel.getUserByNameSqlite(values, callback)
                });
            }
        });
    }

    this.updateUserSqlite = function(values, callback){
        userModel.updateUserSqlite(values, callback);
    }   

    this.delUserSqlite = function(id, callback){
        userModel.delUserSqlite(id, callback);
    }

    this.delAllUserSqlite = function(callback){
        userModel.delAllUserSqlite(callback);
    }

    // MySQL

    this.getAllUserMySQL = function(callback){
        userModel.getAllUserMySQL(callback);
    };

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

    this.updateUserMySQL = function(values, callback){
        userModel.updateUserMySQL(values, callback);
    }

    this.delUserMySQL = function(id, callback){
        userModel.delUserMySQL(id, callback);
    }

    this.delAllUserMySQL = function(callback){
        userModel.delAllUserMySQL(callback);
    }

    // MongoDB

    this.getAllUserMongo = async function(){
        return await userModel.getAllUserMongo();
    };

    this.getUserMongo = async function(id){
        return await userModel.getUserMongo(id);
    };

    this.getUserByNameMongo = async function(name){
        return await userModel.getUserByNameMongo(name);
    };

    this.addUserMongo = async function(name, callback){
        data = await userModel.getUserByNameMongo(name);
        if(data.length > 0) return {userId : data[0]._id, name : data[0].nameUser}
        return await userModel.addUserMongo(name, callback);
    }

    this.updateUserMongo = async function(values, callback){
        return await userModel.updateUserMongo(values, callback);
    }

    this.delUserMongo = async function(id, callback){
        return await userModel.delUserMongo(id, callback);
    }

    this.delAllUserMongo = async function(callback){
        return await userModel.delAllUserMongo(callback);
    }

    // Neo4j

    this.getAllUserNeo4j = async function(){
        return await userModel.getAllUserNeo4j();
    };

    this.getUserNeo4j = async function(id){
        return await userModel.getUserNeo4j(id);
    };

    this.getUserByNameNeo4j = async function(name){
        return await userModel.getUserByNameNeo4j(name);
    };

    this.addUserNeo4j = async function(name, callback){
        data = await userModel.getUserByNameNeo4j(name);
        if(data.records.length > 0) return {userId : data.records[0]._fields[0].identity.low , name : data.records[0]._fields[0].properties.nameUser}
        return await userModel.addUserNeo4j(name, callback);
    }

    this.updateUserNeo4j = async function(values, callback){
        return await userModel.updateUserNeo4j(values, callback);
    }

    this.delUserNeo4j = async function(id, callback){
        return await userModel.delUserNeo4j(id, callback);
    }

    this.delAllUserNeo4j = async function(callback){
        return await userModel.delAllUserNeo4j(callback);
    }
    
}


var usersControler = new usersControler();
module.exports = usersControler;