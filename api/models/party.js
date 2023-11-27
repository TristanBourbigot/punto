var dbSqlite = require('./sqliteConnection');
var dbMysql = require('./mysqlConnection');

var party = function (){

    this.getParty = function(id, callback){
        this.use(null)
        var sql = "SELECT * FROM Party WHERE partyId = ?";
        dbSqlite.all(sql, [id], callback);
    };

    this.getPartyByWinner = function(winnerId,callback){
        this.use(null)
        var sql = "SELECT * FROM Party WHERE winnerId = ?";
        dbSqlite.all(sql, [winnerId], callback);
    }

    this.addParty = function(values, callback){
        this.use(null)
        var sql = "INSERT INTO Party(winnerId) VALUES (?)";
        dbSqlite.run(sql, [values], callback);
    }

    this.use = function(callback){
        var sql7 = "USE punto;";
        dbMysql.query(sql7, callback);
    };
}


var party = new party();
module.exports = party;