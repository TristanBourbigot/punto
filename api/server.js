const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./controler/users");

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
  users.addUserSqlite(req.body.name, (err) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
      res.json({ message: "data insert", data: req.body.name , status: 200});
    }
  });
});

  

// MySQL

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
  users.addUserMySQL(req.body.name, (err) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto Mysql database.');
    }
  });
  res.json({ message: "data insert", data: req.body.name , status: 200});
});


// MongoDB

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


// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});