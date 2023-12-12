const neo4j = require('neo4j-driver');

class neo4jConnection{

    constructor(){
        this.driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "root"));
        this.session = this.driver.session();
    }

    getSession(){
        return this.session;
    }

    getDriver(){
        return this.driver;
    }

}

var db = new neo4jConnection();
module.exports = db.getSession();