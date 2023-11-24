var userModel = require('../models/users.js');

var usersControler = function (){

    this.getUserSqlite = function(id, callback){
        userModel.getUserSqlite(id, callback);
    };

    this.getUserByNameSqlite = function(name,callback){
        userModel.getUserByNameSqlite(name, callback);
    }

    this.addUserSqlite = function(values, callback){
        userModel.getUserByNameSqlite(values, function (err, data) {
            
            if (data.length > 0) {
                callback(null, data);
            } else {
                userModel.addUserSqlite(values, callback);
            }
        });
    }

}


var usersControler = new usersControler();
module.exports = usersControler;