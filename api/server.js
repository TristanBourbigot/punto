const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./controler/users");
const party = require("./controler/party");
const partyUser = require("./controler/PartyUser");

const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// simple route

  // SQLite
app.get("/getAllUserSqlite", (req, res) => {
  users.getAllUserSqlite((err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
    res.send(data);
  });
});

app.get("/getUserSqlite/:id", (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  users.getUserSqlite(req.params.id, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
    res.send(data);
  });
});

app.get("/getUserByNameSqlite/:name", (req, res) => {
  if(!req.params.name){
    return res.status(400).send({
        message: "Name can not be empty"
    });
  }
  users.getUserByNameSqlite(req.params.name, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
    res.send(data);
  });
});

app.post("/addUserSqlite", (req, res,next) => {
  if(!req.body.name){
    return res.status(400).send({
        message: "Name can not be empty"
    });
  }
  users.addUserSqlite(req.body.name, (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data[0]);
    }
  });
});

app.put("/updateUserSqlite", (req, res) => {
  if(!req.body.name || !req.body.id){
    return res.status(400).send({
        message: "Name or IDcan not be empty"
    });
  }
  users.updateUserSqlite([req.body.id,req.body.name], (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data);
    }
  });
});
  
app.delete("/delUserSqlite/:id", (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  users.delUserSqlite(req.params.id, (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data);
    }
  });
});

app.delete("/delAllUserSqlite", (req, res) => {
  users.delAllUserSqlite((err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data);
    }
  });
});

app.get("/getAllPartySqlite", (req, res) => {
  party.getAllPartySqlite((err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
    res.send(data);
  });
});

app.get("/getPartySqlite/:id", (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  party.getPartySqlite(req.params.id, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
    res.send(data);
  });
});

app.get("/getPartyByWinnerSqlite/:winnerId", (req, res) => {
  if(!req.params.winnerId){
    return res.status(400).send({
        message: "WinnerId can not be empty"
    });
  }
  party.getPartyByWinnerSqlite(req.params.winnerId, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
    res.send(data);
  });
});

app.post("/addPartySqlite", (req, res) => {
  party.addPartySqlite(req.body.winnerId, (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data);
    }
  });
});

app.put("/updatePartySqlite", (req, res) => {
  if(!req.body.winnerId || !req.body.id){
    return res.status(400).send({
        message: "WinnerId or IDcan not be empty"
    });
  }
  party.updatePartySqlite([req.body.id,req.body.winnerId], (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data);
    }
  });
});

app.delete("/delPartySqlite/:id", (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  party.delPartySqlite(req.params.id, (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data);
    }
  });
});

app.delete("/delAllPartySqlite", (req, res) => {
  party.delAllPartySqlite((err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data);
    }
  });
});

app.get("/getAllPartyUsersSqlite", (req, res) => {
  partyUser.getAllPartyUsersSqlite((err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
    res.send(data);
  });
});

app.get("/getPartyUsersSqlite", (req, res) => {
  if(!req.body.userId || !req.body.partyId){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  partyUser.getPartyUsersSqlite(req.body.partyId,req.body.id, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
    res.send(data);
  });
});


app.post("/addPartyUsersSqlite", (req, res) => {
  if(!req.body.userId || !req.body.partyId){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  partyUser.addPartyUsersSqlite([req.body.partyId,req.body.userId], (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data);
    }
  });
});


app.delete("/delPartyUserSqlite", (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  partyUser.delPartyUserSqlite(req.params.id, (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json(data);
    }
  });
});


// MySQL

app.get("/getAllUserMysql", (req, res) => {
  users.getAllUserMySQL((err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.send(data);
  });
});

app.get("/getUserMysql/:id", (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  users.getUserMySQL(req.params.id, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.send(data);
  });
});

app.get("/getUserByNameMysql/:name", (req, res) => {
  if(!req.params.name){
    return res.status(400).send({
        message: "Name can not be empty"
    });
  }
  users.getUserByNameMySQL(req.params.name, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.send(data);
  });
});

app.post("/addUserMysql", (req, res) => {
  if(!req.body.name){
    return res.status(400).send({
        message: "Name can not be empty"
    });
  }
  users.addUserMySQL(req.body.name, (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.put("/updateUserMysql", (req, res) => {
  if(!req.body.name || !req.body.id){
    return res.status(400).send({
        message: "Name or IDcan not be empty"
    });
  }
  users.updateUserMySQL([req.body.id,req.body.name], (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.delete("/delUserMysql/:id", (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  users.delUserMySQL(req.params.id, (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.delete("/delAllUserMysql", (req, res) => {
  users.delAllUserMySQL((err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.get("/getAllPartyMysql", (req, res) => {
  party.getAllPartyMySQL((err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.send(data);
  });
});

app.get("/getPartyMysql/:id", (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  party.getPartyMySQL(req.params.id, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.send(data);
  });
});


app.get("/getPartyByWinnerMysql/:winnerId", (req, res) => {
  if(!req.params.winnerId){
    return res.status(400).send({
        message: "WinnerId can not be empty"
    });
  }
  party.getPartyByWinnerMySQL(req.params.winnerId, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.send(data);
  });
});

app.post("/addPartyMysql", (req, res) => {
  party.addPartyMySQL(req.body.winnerId, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.put("/updatePartyMysql", (req, res) => {
  if(!req.body.winnerId || !req.body.id){
    return res.status(400).send({
        message: "WinnerId or IDcan not be empty"
    });
  }
  party.updatePartyMySQL([req.body.winnerId,req.body.id], (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.delete("/delPartyMysql/:id", (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  party.delPartyMySQL(req.params.id, (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.delete("/delAllPartyMysql", (req, res) => {
  party.delAllPartyMySQL((err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.get("/getAllPartyUsersMySQL", (req, res) => {
  partyUser.getAllPartyUsersMySQL((err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.send(data);
  });
});

app.get("/getPartyUsersMySQL", (req, res) => {
  if(!req.body.userId || !req.body.partyId){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  partyUser.getPartyUsersMySQL( req.body.partyId, req.body.userId, (err, data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.send(data);
  });
});


app.post("/addPartyUsersMysql", (req, res) => {
  if(!req.body.userId || !req.body.partyId){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  partyUser.addPartyUsersMySQL([req.body.partyId, req.body.userId], (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.delete("/delPartyUserMysql", (req, res) => {
  if(!req.body.userId || !req.body.partyId){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  partyUser.delPartyUserMySQL(req.body.partyId , req.body.userId, (err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});

app.delete("/delAllPartyUserMysql", (req, res) => {
  partyUser.delAllPartyUserMySQL((err,data) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
    res.json(data);
  });
});


// MongoDB

app.get("/getAllUserMongo", async (req, res) => {
  data = await users.getAllUserMongo();
  res.send(data);
});

app.get("/getUserMongo/:id", async (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  data = await users.getUserMongo(req.params.id);
  res.send(data);
});

app.get("/getUserByNameMongo/:name", async (req, res) => {
  if(!req.params.name){
    return res.status(400).send({
        message: "Name can not be empty"
    });
  }
  data = await users.getUserByNameMongo(req.params.name)
  res.send(data);
});


app.post("/addUserMongo", async (req,res) => {
  if(!req.body.name){
    return res.status(400).send({
        message: "Name can not be empty"
    });
  }
  data = await users.addUserMongo(req.body.name)
  res.json(data);
});

app.put("/updateUserMongo", async (req,res) => {
  if(!req.body.name || !req.body.id){
    return res.status(400).send({
        message: "Name or IDcan not be empty"
    });
  }
  data = await users.updateUserMongo([req.body.id,req.body.name])
  res.json(data);
});

app.delete("/delUserMongo/:id", async (req,res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  data = await users.delUserMongo(req.params.id)
  res.json(data);
});

app.delete("/delAllUserMongo", async (req,res) => {
  data = await users.delAllUserMongo()
  res.json(data);
});

app.get("/getAllPartyMongo", async (req, res) => {
  data = await party.getAllPartyMongo();
  res.send(data);
});

app.get("/getPartyMongo/:id", async (req, res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  data = await party.getPartyMongo(req.params.id);
  res.send(data);
});

app.get("/getPartyByWinnerMongo/:winnerId", async (req, res) => {
  if(!req.params.winnerId){
    return res.status(400).send({
        message: "WinnerId can not be empty"
    });
  }
  data = await party.getPartyByWinnerMongo(req.params.winnerId);
  res.send(data);
});

app.post("/addPartyMongo", async (req,res) => {
  data = await party.addPartyMongo(req.body.winnerId);
  res.json(data);
});

app.put("/updatePartyMongo", async (req,res) => {
  if(!req.body.winnerId || !req.body.id){
    return res.status(400).send({
        message: "WinnerId or IDcan not be empty"
    });
  }
  data = await party.updatePartyMongo([req.body.id,req.body.winnerId]);
  res.json(data);
});

app.delete("/delPartyMongo/:id", async (req,res) => {
  if(!req.params.id){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  data = await party.delPartyMongo(req.params.id);
  res.json(data);
});

app.delete("/delAllPartyMongo", async (req,res) => {
  data = await party.delAllPartyMongo();
  res.json(data);
});

app.get("/getAllPartyUsersMongo", async (req, res) => {
  data = await partyUser.getAllPartyUsersMongo();
  res.send(data);
});

app.get("/getPartyUserMongo", async (req, res) => {
  if(!req.body.partyId || !req.body.userId){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  data = await partyUser.getPartyUserMongo(req.body.partyId ,req.body.userId);
  res.send(data);
});

app.post("/addPartyUsersMongo", async (req,res) => {
  if(!req.body.partyId || !req.body.userId){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  data = await partyUser.addPartyUsersMongo([req.body.partyId ,req.body.userId]);
  res.json(data);
});

app.delete("/delPartyUserMongo", async (req,res) => {
  if(!req.body.partyId || !req.body.userId){
    return res.status(400).send({
        message: "Id can not be empty"
    });
  }
  data = await partyUser.delPartyUserMongo(req.body.partyId ,req.body.userId);
  res.json(data);
});

app.delete("/delAllPartyUserMongo", async (req,res) => {
  data = await partyUser.delAllPartyUserMongo();
  res.json(data);
});


// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});