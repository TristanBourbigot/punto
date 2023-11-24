var dbSqlite = require('./sqliteConnection');

var partyUsers = function (){

    this.getPartyUsers = function(partyId, userId, callback){
        var sql = "SELECT * FROM PartyUsers WHERE partyId = ? and userId = ?";
        dbSqlite.all(sql, [partyId,userId], callback);
    };


    this.getPartyUsersByPartyId = function(partyId, callback){
        var sql = "SELECT * FROM PartyUsers WHERE partyId = ?";
        dbSqlite.all(sql, [partyId], callback);
    };

    this.getPartyUsersByUserId = function(userId, callback){
        var sql = "SELECT * FROM PartyUsers WHERE userId = ?";
        dbSqlite.all(sql, [userId], callback);
    };

    this.addPartyUsers = function(values, callback){
        var sql = "INSERT INTO PartyUsers(partyId,userId) VALUES (?,?)";
        dbSqlite.run(sql, values, callback);
    }

    this.countUserParty = function(id, callback){
        var sql = "SELECT COUNT(*) FROM PartyUsers WHERE userId = ?"
        dbSqlite.run(sql, [id], callback);
    }
}


var partyUsers = new partyUsers();
module.exports = partyUsers;