var dbSqlite = require('./sqliteConnection');
var dbMysql = require('./mysqlConnection');

var partyUsers = function (){

    this.getPartyUsers = function(partyId, userId, callback){
        this.use(null)
        var sql = "SELECT * FROM PartyUsers WHERE partyId = ? and userId = ?";
        dbSqlite.all(sql, [partyId,userId], callback);
    };


    this.getPartyUsersByPartyId = function(partyId, callback){
        this.use(null)
        var sql = "SELECT * FROM PartyUsers WHERE partyId = ?";
        dbSqlite.all(sql, [partyId], callback);
    };

    this.getPartyUsersByUserId = function(userId, callback){
        this.use(null)
        var sql = "SELECT * FROM PartyUsers WHERE userId = ?";
        dbSqlite.all(sql, [userId], callback);
    };

    this.addPartyUsers = function(values, callback){
        this.use(null)
        var sql = "INSERT INTO PartyUsers(partyId,userId) VALUES (?,?)";
        dbSqlite.run(sql, values, callback);
    }

    this.countUserParty = function(id, callback){
        this.use(null)
        var sql = "SELECT COUNT(*) FROM PartyUsers WHERE userId = ?"
        dbSqlite.run(sql, [id], callback);
    }

    
    this.use = function(callback){
        var sql7 = "USE punto;";
        dbMysql.query(sql7, callback);
    };
}


var partyUsers = new partyUsers();
module.exports = partyUsers;