var dbSqlite = require('./sqliteConnection');
var dbMysql = require('./mysqlConnection');
var dbMongo = require('./mongoConnection');

var party = function (){

    // SQLite

    this.getAllPartySqlite = function(callback){
        var sql = "SELECT * FROM Party";
        dbSqlite.all(sql, callback);
    }

    this.getPartySqlite = function(id, callback){
        var sql = "SELECT * FROM Party WHERE partyId = ?";
        dbSqlite.all(sql, [id], callback);
    };

    this.getPartyByWinnerSqlite = function(winnerId,callback){
        var sql = "SELECT * FROM Party WHERE winnerId = ?";
        dbSqlite.all(sql, [winnerId], callback);
    }

    this.addPartySqlite = function(values, callback){
        var sql = "INSERT INTO Party(winnerId) VALUES (?)";
        dbSqlite.run(sql, [values], callback);
    }

    this.updatePartySqlite = function(values, callback){
        var sql = "UPDATE Party SET partyId = ? WHERE winnerId = ?";
        dbSqlite.run(sql, values, callback);
    }

    this.delPartySqlite = function(id, callback){
        var sql = "DELETE FROM Party WHERE partyId = ?";
        dbSqlite.run(sql, [id], callback);
    }

    this.delAllPartySqlite = function(callback){
        var sql = "DELETE FROM Party";
        dbSqlite.run(sql, callback);
    }

    // MySQL

    this.getAllPartyMySQL = function(callback){
        this.use(null)
        var sql = "SELECT * FROM Party";
        dbMysql.query(sql, callback);
    }

    this.getPartyMySQL = function(id, callback){
        this.use(null)
        var sql = "SELECT * FROM Party WHERE partyId = ?";
        dbMysql.query(sql, [id], callback);
    }

    this.getPartyByWinnerMySQL = function(winnerId,callback){
        this.use(null)
        var sql = "SELECT * FROM Party WHERE winnerId = ?";
        dbMysql.query(sql, [winnerId], callback);
    }

    this.addPartyMySQL = function(values, callback){
        this.use(null)
        var sql = "INSERT INTO Party(winnerId) VALUES (?)";
        dbMysql.query(sql, [values], callback);
    }

    this.updatePartyMySQL = function(values, callback){
        this.use(null)
        var sql = "UPDATE Party SET winnerId = ? WHERE partyId = ?";
        dbMysql.query(sql, values, callback);
    }

    this.delPartyMySQL = function(id, callback){
        this.use(null)
        var sql = "DELETE FROM Party WHERE partyId = ?";
        dbMysql.query(sql, [id], callback);
    }

    this.delAllPartyMySQL = function(callback){
        this.use(null)
        var sql = "DELETE FROM Party";
        dbMysql.query(sql, callback);
    }

    this.use = function(callback){
        var sql7 = "USE punto;";
        dbMysql.query(sql7, callback);
    };

    // MongoDB

    this.getAllPartyMongo = async function(){
        return await dbMongo.collection("Party").find({}).toArray();
    }

    this.getPartyMongo = async function(id){
        return await dbMongo.collection("Party").find({partyId: id}).toArray();
    }

    this.getPartyByWinnerMongo = async function(winnerId){
        return await dbMongo.collection("Party").find({winnerId: winnerId}).toArray();
    }

    this.addPartyMongo = async function(id){
        return await dbMongo.collection("Party").insertOne({winnerId : id});
    }

    this.updatePartyMongo = async function(id){
        return await dbMongo.collection("Party").updateOne({winnerId : id});
    }

    this.delPartyMongo = async function(id){
        return await dbMongo.collection("Party").deleteOne(id);
    }

    this.delAllPartyMongo = async function(){
        return await dbMongo.collection("Party").deleteMany();
    }
}


var party = new party();
module.exports = party;