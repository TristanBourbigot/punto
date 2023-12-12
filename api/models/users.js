var dbSqlite = require('./sqliteConnection');
var dbMysql = require('./mysqlConnection');
var dbMongo = require('./mongoConnection');
var dbNeo4j = require('./neo4jConnection');

var users = function (){

    this.getAllUserSqlite = function(callback){
        var sql = "SELECT * FROM Users";
        dbSqlite.all(sql, callback);
    };

    this.getUserSqlite = function(id, callback){
        var sql = "SELECT * FROM Users WHERE userId = ?";
        dbSqlite.all(sql, [id], callback);
    };

    this.getUserByNameSqlite = function(name,callback){
        var sql = "SELECT * FROM Users WHERE nameUser = ?";
        dbSqlite.all(sql, [name], callback);
    }

    this.addUserSqlite = function(values, callback){
        var sql = "INSERT INTO Users(nameUser) VALUES (?)";
        dbSqlite.run(sql, [values], callback);
    }

    this.updateUserSqlite = function(values, callback){
        var sql = "UPDATE Users SET userId = ? WHERE nameUser = ?";
        dbSqlite.run(sql, values, callback);
    }

    this.delUserSqlite = function(id, callback){
        var sql = "DELETE FROM Users WHERE userId = ?";
        dbSqlite.run(sql, [id], callback);
    }

    this.delAllUserSqlite = function(callback){
        var sql = "DELETE FROM Users";
        dbSqlite.run(sql, callback);
    }

    // MySQL

    this.getAllUserMySQL = function(callback){
        this.use(null)
        var sql = "SELECT * FROM Users";
        dbMysql.query(sql, callback);
    };

    this.getUserMySQL = function(id, callback){
        this.use(null)
        var sql = "SELECT * FROM Users WHERE userId = ?";
        dbMysql.query(sql, [id], callback);
    };

    this.getUserByNameMySQL = function(name,callback){
        this.use(null)
        var sql = "SELECT * FROM Users WHERE nameUser = ?";
        dbMysql.query(sql, [name], callback);
    }

    this.addUserMySQL = function(values, callback){
        this.use(null)
        var sql = "INSERT INTO Users(nameUser) VALUES (?)";
        dbMysql.query(sql, [values], callback);
    }

    this.updateUserMySQL = function(values, callback){
        this.use(null)
        var sql = "UPDATE Users SET userId = ? WHERE nameUser = ?";
        dbMysql.query(sql, values, callback);
    }

    this.delUserMySQL = function(id, callback){
        this.use(null)
        var sql = "DELETE FROM Users WHERE userId = ?";
        dbMysql.query(sql, [id], callback);
    }

    this.delAllUserMySQL = function(callback){
        this.use(null)
        var sql = "DELETE FROM Users";
        dbMysql.query(sql, callback);
    }

    this.use = function(callback){
        var sql7 = "USE punto;";
        dbMysql.query(sql7, callback);
    };
    
    // MongoDB

    this.getAllUserMongo = async function(){
        return await dbMongo.collection('users').find({}).toArray();
    };

    this.getUserMongo = async function(id){
        return await dbMongo.collection('users').find({userId: id}).toArray();
    };

    this.getUserByNameMongo = async function(name){
        return await dbMongo.collection('users').find({nameUser: name}).toArray();
    };

    this.addUserMongo = async function(name){
        return await dbMongo.collection('users').insertOne({nameUser: name});
    };

    this.updateUserMongo = async function(id, name){
        return await dbMongo.collection('users').updateOne({userId: id}, {$set: {nameUser: name}});
    };

    this.delUserMongo = async function(id){
        return await dbMongo.collection('users').deleteOne({userId: id});
    };

    this.delAllUserMongo = async function(){
        return await dbMongo.collection('users').deleteMany({});
    };

    // Neo4j

    this.getAllUserNeo4j = async function(){
        return await dbNeo4j.run('MATCH (n:User) RETURN n');
    };

    this.getUserNeo4j = async function(id){
        return await dbNeo4j.run('MATCH (n:User) WHERE ID(n) = $id RETURN n', {id: id});
    };

    this.getUserByNameNeo4j = async function(name){
        return await dbNeo4j.run('MATCH (n:User) WHERE n.nameUser = $name RETURN n', {name: name});
    };

    this.addUserNeo4j = async function(name){
        data = await dbNeo4j.run('CREATE (n:User {nameUser: $name}) RETURN n', {name: name});
        return  {userId : data.records[0]._fields[0].identity.low, name : data.records[0]._fields[0].properties.nameUser};
    };

    this.updateUserNeo4j = async function(id, name){
        return await dbNeo4j.run('MATCH (n:User) WHERE ID(n) = $id SET n.nameUser = $name RETURN n', {id: id, name: name});
    };

    this.delUserNeo4j = async function(id){
        return await dbNeo4j.run('MATCH (n:User) WHERE ID(n) = $id DELETE n', {id: id});
    };

    this.delAllUserNeo4j = async function(){
        return await dbNeo4j.run('MATCH (n:User) DELETE n');
    };
}


var users = new users();
module.exports = users;