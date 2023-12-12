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

    this.getAllPartyUsersMongo = async function(){
        return await partyUserModel.getAllPartyUsersMongo();
    }

    this.getPartyUsersMongo = async function(partyId, userId){
        return await partyUserModel.getPartyUsersMongo(partyId, userId);
    }

    this.getPartyUsersByPartyIdMongo = async function(partyId){
        return await partyUserModel.getPartyUsersByPartyIdMongo(partyId);
    }

    this.getPartyUsersByUserIdMongo = async function(userId){
        return await partyUserModel.getPartyUsersByUserIdMongo(userId);
    }

    this.addPartyUsersMongo = async function(values){
        return await partyUserModel.addPartyUsersMongo(values);
    }

    this.countUserPartyMongo = async function(id){
        return await partyUserModel.countUserPartyMongo(id);
    }

    this.delPartyUsersMongo = async function(partyId, userId){
        return await partyUserModel.delPartyUsersMongo(partyId, userId);
    }

    this.delAllPartyUsersMongo = async function(){
        return await partyUserModel.delAllPartyUsersMongo();
    }

    // Neo4j

    this.getAllPartyUsersNeo4j = async function(){
        return await partyUserModel.getAllPartyUsersNeo4j();
    }

    this.getPartyUsersNeo4j = async function(partyId, userId){
        return await partyUserModel.getPartyUsersNeo4j(partyId, userId);
    }

    this.getPartyUsersByPartyIdNeo4j = async function(partyId){
        return await partyUserModel.getPartyUsersByPartyIdNeo4j(partyId);
    }

    this.getPartyUsersByUserIdNeo4j = async function(userId){
        return await partyUserModel.getPartyUsersByUserIdNeo4j(userId);
    }

    this.addPartyUsersNeo4j = async function(values){
        return await partyUserModel.addPartyUsersNeo4j(values);
    }

    this.delPartyUsersNeo4j = async function(partyId, userId){
        return await partyUserModel.delPartyUsersNeo4j(partyId, userId);
    }

    this.delAllPartyUsersNeo4j = async function(){
        return await partyUserModel.delAllPartyUsersNeo4j();
    }

}


var partyUserControler = new partyUserControler();
module.exports = partyUserControler;