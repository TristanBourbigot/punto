var dbSqlite = require('./sqliteConnection');

var party = function (){

    this.getParty = function(id, callback){
        var sql = "SELECT * FROM Party WHERE partyId = ?";
        dbSqlite.all(sql, [id], callback);
    };

    this.getPartyByWinner = function(winnerId,callback){
        var sql = "SELECT * FROM Party WHERE winnerId = ?";
        dbSqlite.all(sql, [winnerId], callback);
    }

    this.addParty = function(values, callback){
        var sql = "INSERT INTO Party(partyId,winnerId) VALUES (?,?)";
        dbSqlite.run(sql, values, callback);
    }
}


var users = new users();
module.exports = users;