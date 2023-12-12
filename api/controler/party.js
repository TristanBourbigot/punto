var partyModel = require('../models/party');

var partyControler = function (){

    // SQLite

    this.getAllPartySqlite = function(callback){
        partyModel.getAllPartySqlite(callback);
    } 

    this.getPartySqlite = function(id, callback){
        partyModel.getPartySqlite(id, callback);
    };

    this.getPartyByWinnerSqlite = function(winnerId,callback){
        partyModel.getPartyByWinnerSqlite(winnerId, callback);
    }

    this.addPartySqlite = function(values, callback){
        partyModel.addPartySqlite(values, function (err, data) {
            partyModel.getAllPartySqlite(function (err, data) {
                callback(null, data[data.length - 1]);
            });
        });
    }

    this.updatePartySqlite = function(values, callback){
        partyModel.updatePartySqlite(values, callback);
    }

    this.delPartySqlite = function(id, callback){
        partyModel.delPartySqlite(id, callback);
    }

    this.delAllPartySqlite = function(callback){
        partyModel.delAllPartySqlite(callback);
    }

    // MySQL

    this.getAllPartyMySQL = function(callback){
        partyModel.getAllPartyMySQL(callback);
    }

    this.getPartyMySQL = function(id, callback){
        partyModel.getPartyMySQL(id, callback);
    }

    this.getPartyByWinnerMySQL = function(winnerId,callback){
        partyModel.getPartyByWinnerMySQL(winnerId, callback);
    }

    this.addPartyMySQL = function(values, callback){
        partyModel.addPartyMySQL(values, callback);
    }

    this.updatePartyMySQL = function(values, callback){
        partyModel.updatePartyMySQL(values, callback);
    }

    this.delPartyMySQL = function(id, callback){
        partyModel.delPartyMySQL(id, callback);
    }

    this.delAllPartyMySQL = function(callback){
        partyModel.delAllPartyMySQL(callback);
    }

    // MongoDB

    this.getAllPartyMongo = async function(){
        return await partyModel.getAllPartyMongo();
    }

    this.getPartyMongo = async function(id){
        return await partyModel.getPartyMongo(id);
    }

    this.getPartyByWinnerMongo = async function(winnerId){
        return await partyModel.getPartyByWinnerMongo(winnerId);
    }

    this.addPartyMongo = async function(values){
        return await partyModel.addPartyMongo(values);
    }

    this.updatePartyMongo = async function(values){
        return await partyModel.updatePartyMongo(values);
    }

    this.delPartyMongo = async function(id){
        return await partyModel.delPartyMongo(id);
    }

    this.delAllPartyMongo = async function(){
        return await partyModel.delAllPartyMongo();
    }

    // Neo4j

    this.getAllPartyNeo4j = async function(){
        return await partyModel.getAllPartyNeo4j();
    }

    this.getPartyNeo4j = async function(id){
        return await partyModel.getPartyNeo4j(id);
    }

    this.addPartyNeo4j = async function(){
        return await partyModel.addPartyNeo4j();
    }

    this.updatePartyNeo4j = async function(values){
        return await partyModel.updatePartyNeo4j(values);
    }

    this.delPartyNeo4j = async function(id){
        return await partyModel.delPartyNeo4j(id);
    }

    this.delAllPartyNeo4j = async function(){
        return await partyModel.delAllPartyNeo4j();
    }

}


var partyControler = new partyControler();
module.exports = partyControler;