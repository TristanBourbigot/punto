var dbSqlite = require('./sqliteConnection');
var dbMysql = require('./mysqlConnection');
var dbMongo = require('./mongoConnection');
var ObjectId = require('mongodb').ObjectId;
var dbNeo = require('./neo4jConnection');

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
        var sql = "UPDATE Party SET winnerId = ?  WHERE partyId = ?";
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
        return await dbMongo.collection("Party").find({_id: new ObjectId(id)}).toArray();
    }

    this.getPartyByWinnerMongo = async function(winnerId){
        return await dbMongo.collection("Party").find({winnerId: winnerId}).toArray();
    }

    this.addPartyMongo = async function(id){
        return await dbMongo.collection("Party").insertOne({winnerId : id});
    }

    this.updatePartyMongo = async function(values){
        return await dbMongo.collection("Party").updateOne({_id : new ObjectId(values[0])},{ $set:{winnerId : values[1]}});
    }

    this.delPartyMongo = async function(id){
        return await dbMongo.collection("Party").deleteOne({_id: new ObjectId(id)});
    }

    this.delAllPartyMongo = async function(){
        return await dbMongo.collection("Party").deleteMany();
    }

    // Neo4j

    this.getAllPartyNeo4j = async function(){
        return await dbNeo.run("MATCH (u:User)-[:WIN]->(p:Party) RETURN p, u as user UNION MATCH (p:Party) WHERE NOT EXISTS((:User)-[:WIN]->(p)) RETURN p, null as user");
    }

    this.getPartyNeo4j = async function(id){
        return await dbNeo.run("MATCH (n:Party) WHERE ID(n) = $id RETURN n", {id : id});
    }

    this.addPartyNeo4j = async function(){
        data = await dbNeo.run("CREATE (n:Party) RETURN n");
        return {partyId : data.records[0]._fields[0].identity.low};
    }

    this.updatePartyNeo4j = async function(values){
        return await dbNeo.run("MATCH (u:User), (p:Party) WHERE ID(u) = $userId AND ID(p)=$partyId MERGE (u)-[:WIN]->(p) RETURN u,p", { userId : values[1], partyId: values[0] });
    }

    this.delPartyNeo4j = async function(id){
        return await dbNeo.run("MATCH (n:Party) WHERE ID(n) = $id DETACH DELETE n", {id : id});
    }

    this.delAllPartyNeo4j = async function(){
        return await dbNeo.run("MATCH (n:Party) DETACH DELETE n");
    }

}


var party = new party();
module.exports = party;