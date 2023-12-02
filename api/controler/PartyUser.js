var partyUserModel = require('../models/partyUsers');

var partyUserControler = function (){

    // SQLite

    this.getAllPartyUsersSqlite = function(callback){
        partyUserModel.getAllPartyUsersSqlite(callback);
    }

    this.getPartyUsersSqlite = function(partyId, userId, callback){
        partyUserModel.getPartyUsersSqlite(partyId, userId, callback);
    }

    this.getPartyUsersByPartyIdSqlite = function(partyId, callback){
        partyUserModel.getPartyUsersByPartyIdSqlite(partyId, callback);
    }

    this.getPartyUsersByUserIdSqlite = function(userId, callback){
        partyUserModel.getPartyUsersByUserIdSqlite(userId, callback);
    }

    this.addPartyUsersSqlite = function(values, callback){
        partyUserModel.addPartyUsersSqlite(values, function (err, data) {
            partyUserModel.getAllPartyUsersSqlite(function (err, data) {
                callback(null, data[data.length - 1]);
            });
        });
    }

    this.countUserPartySqlite = function(id, callback){
        partyUserModel.countUserPartySqlite(id, callback);
    }

    this.delPartyUsersSqlite = function(partyId, userId, callback){
        partyUserModel.delPartyUsersSqlite(partyId, userId, callback);
    }

    this.delAllPartyUsersSqlite = function(callback){
        partyUserModel.delAllPartyUsersSqlite(callback);
    }

    // MySQL

    this.getAllPartyUsersMySQL = function(callback){
        partyUserModel.getAllPartyUsersMySQL(callback);
    }

    this.getPartyUsersMySQL = function(partyId, userId, callback){
        partyUserModel.getPartyUsersMySQL(partyId, userId, callback);
    }

    this.getPartyUsersByPartyIdMySQL = function(partyId, callback){
        partyUserModel.getPartyUsersByPartyIdMySQL(partyId, callback);
    }

    this.getPartyUsersByUserIdMySQL = function(userId, callback){
        partyUserModel.getPartyUsersByUserIdMySQL(userId, callback);
    }

    this.addPartyUsersMySQL = function(values, callback){
        partyUserModel.addPartyUsersMySQL(values, callback);
    }

    this.countUserPartyMySQL = function(id, callback){
        partyUserModel.countUserPartyMySQL(id, callback);
    }

    this.delPartyUsersMySQL = function(partyId, userId, callback){
        partyUserModel.delPartyUsersMySQL(partyId, userId, callback);
    }

    this.delAllPartyUsersMySQL = function(callback){
        partyUserModel.delAllPartyUsersMySQL(callback);
    }


    // MongoDB

    this.getAllPartyUsersMongo = function(callback){
        partyUserModel.getAllPartyUsersMongo(callback);
    }

    this.getPartyUsersMongo = function(partyId, userId, callback){
        partyUserModel.getPartyUsersMongo(partyId, userId, callback);
    }

    this.getPartyUsersByPartyIdMongo = function(partyId, callback){
        partyUserModel.getPartyUsersByPartyIdMongo(partyId, callback);
    }

    this.getPartyUsersByUserIdMongo = function(userId, callback){
        partyUserModel.getPartyUsersByUserIdMongo(userId, callback);
    }

    this.addPartyUsersMongo = function(values, callback){
        partyUserModel.addPartyUsersMongo(values, callback);
    }

    this.countUserPartyMongo = function(id, callback){
        partyUserModel.countUserPartyMongo(id, callback);
    }

    this.delPartyUsersMongo = function(partyId, userId, callback){
        partyUserModel.delPartyUsersMongo(partyId, userId, callback);
    }

    this.delAllPartyUsersMongo = function(callback){
        partyUserModel.delAllPartyUsersMongo(callback);
    }

}


var partyUserControler = new partyUserControler();
module.exports = partyUserControler;