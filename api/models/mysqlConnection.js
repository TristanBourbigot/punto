const mysql = require('mysql');

/**
 * MYSQL connection
 */
class mysqlConnection{

    
    /**
     * Initialize and create the connection to the database
     */
    constructor(){
        this.connection = mysql.createConnection({
            host: 'localhost', // adresse du serveur
            port: '3306', // port du serveur
            user: 'root', // nom de l'utilisateur de la base de donnee (a modifier si necessaire)
            password: 'root', // mot de passe de l'utilisateur de la base de donnee (a modifier si necessaire)
            database: 'punto' // nom de la base de donnee (a modifier si necessaire)
        });

        this.connection.connect(function(err) {
            if (err) throw err;
            else console.log("Connecter a la base de donnee");
        });
    }

    /**
     * getter of the connection to the database
     * @returns {mysqlConnection} connection to the database
     */
    getConnection(){
        return this.connection;
    }
    

}

var db = new mysqlConnection();
module.exports = db.getConnection();