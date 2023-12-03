var dbSqlite = require('./sqliteConnection');
var dbMysql = require('./mysqlConnection');
var dbMongo = require('./mongoConnection');

var partyUsers = function (){

    // SQLite

    this.getAllPartyUsersSqlite = function(callback){
        var sql = "SELECT * FROM PartyUsers";
        dbSqlite.all(sql, callback);
    };
    
    this.getPartyUsersSqlite = function(partyId, userId, callback){
        var sql = "SELECT * FROM PartyUsers WHERE partyId = ? and userId = ?";
        dbSqlite.all(sql, [partyId,userId], callback);
    };


    this.getPartyUsersByPartyIdSqlite = function(partyId, callback){
        var sql = "SELECT * FROM PartyUsers WHERE partyId = ?";
        dbSqlite.all(sql, [partyId], callback);
    };

    this.getPartyUsersByUserIdSqlite = function(userId, callback){
        var sql = "SELECT * FROM PartyUsers WHERE userId = ?";
        dbSqlite.all(sql, [userId], callback);
    };

    this.addPartyUsersSqlite = function(values, callback){
        var sql = "INSERT INTO PartyUsers(partyId,userId) VALUES (?,?)";
        dbSqlite.run(sql, values, callback);
    }

    this.countUserPartySqlite = function(id, callback){
        var sql = "SELECT COUNT(*) FROM PartyUsers WHERE userId = ?"
        dbSqlite.run(sql, [id], callback);
    }

    this.delPartyUsersSqlite = function(partyId, userId, callback){
        var sql = "DELETE FROM PartyUsers WHERE partyId = ? and userId = ?";
        dbSqlite.run(sql, [partyId,userId], callback);
    }

    this.delAllPartyUsersSqlite = function(callback){
        var sql = "DELETE FROM PartyUsers";
        dbSqlite.run(sql, callback);
    }

    // MySQL
    
    this.getAllPartyUsersMySQL = function(callback){
        this.use(null)
        var sql = "SELECT * FROM PartyUsers";
        dbMysql.query(sql, callback);
    }

    this.getPartyUsersMySQL = function(partyId, userId, callback){
        this.use(null)
        var sql = "SELECT * FROM PartyUsers WHERE partyId = ? and userId = ?";
        dbMysql.query(sql, [partyId,userId], callback);
    }

    this.getPartyUsersByPartyIdMySQL = function(partyId, callback){
        this.use(null)
        var sql = "SELECT * FROM PartyUsers WHERE partyId = ?";
        dbMysql.query(sql, [partyId], callback);
    }

    this.getPartyUsersByUserIdMySQL = function(userId, callback){   
        this.use(null)
        var sql = "SELECT * FROM PartyUsers WHERE userId = ?";
        dbMysql.query(sql, [userId], callback);
    }

    this.addPartyUsersMySQL = function(values, callback){
        this.use(null)
        var sql = "INSERT INTO PartyUsers(partyId,userId) VALUES (?,?)";
        dbMysql.query(sql, values, callback);
    }

    this.countUserPartyMySQL = function(id, callback){
        this.use(null)
        var sql = "SELECT COUNT(*) FROM PartyUsers WHERE userId = ?"
        dbMysql.query(sql, [id], callback);
    }

    this.delPartyUsersMySQL = function(partyId, userId, callback){
        this.use(null)
        var sql = "DELETE FROM PartyUsers WHERE partyId = ? and userId = ?";
        dbMysql.query(sql, [partyId,userId], callback);
    }

    this.delAllPartyUsersMySQL = function(callback){
        this.use(null)
        var sql = "DELETE FROM PartyUsers";
        dbMysql.query(sql, callback);
    }

    this.use = function(callback){
        var sql7 = "USE punto;";
        dbMysql.query(sql7, callback);
    };

    // MongoDB

    this.getAllPartyUsersMongo = async function(){
       return await dbMongo.collection("PartyUsers").find({}).toArray();
    }
    
    this.getPartyUsersMongo = async function(partyId, userId){
        return await dbMongo.collection("PartyUsers").find({partyId: partyId, userId: userId}).toArray();
    }

    this.getPartyUsersByPartyIdMongo = async function(partyId){
        return await dbMongo.collection("PartyUsers").find({partyId: partyId}).toArray();
    }

    this.getPartyUsersByUserIdMongo = async function(userId){
        return await dbMongo.collection("PartyUsers").find( {userId: userId}).toArray();
    }

    this.addPartyUsersMongo = async function(values){
        return await dbMongo.collection("PartyUsers").insertOne({partyId : values[0] ,userId: values[1]});
    }

    this.countUserPartyMongo = async function(id){
        return await dbMongo.collection("PartyUsers").count({userId: id});
    }

    this.delPartyUsersMongo = async function(partyId, userId){
        return await dbMongo.collection("PartyUsers").deleteMany({partyId: partyId, userId: userId});
    }

    this.delAllPartyUsersMongo = async function(){
        return await dbMongo.collection("PartyUsers").deleteMany({});
    }

}


var partyUsers = new partyUsers();
module.exports = partyUsers;