const { MongoClient } = require('mongodb');

class MongoConnection {
  constructor() {
    const uri = 'mongodb://root:root@localhost:27017';
    const client = new MongoClient(uri);


    client.connect()
      .then(() => {
        console.log('Connected to the punto MONGO database.');
      })
      .catch(err => {
        console.error(err.message);
      });

    this.db = client.db('punto');
  }

  getConnection() {
    return this.db;
  }
}

// Create an instance of the MongoConnection class
const db = new MongoConnection();

// Export the connection for external use
module.exports = db.getConnection();
