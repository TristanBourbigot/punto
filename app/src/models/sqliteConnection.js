const sqlite3 = require('sqlite3').verbose();
class sqlite_connection{

    constructor(){
        

        this.db = new sqlite3.Database('./src/data/sqlite/punto_sqlite.db', (err) => {

            if (err) {

              console.error(err.message);

            }else{
                console.log('Connected to the punto SQLITE database.');
            }
            
        });

    }

    getConnection(){

        return this.db;

    }
    
}
var db = new sqlite_connection();
module.exports = db.getConnection();