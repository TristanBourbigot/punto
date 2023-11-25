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
    }
  });
  res.json({ message: "data insert", data: req.body.name , status: 200});
});

app.get("/addUserMysql", (req, res) => {
  users.addUserSqlite("test3", (err) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
  });
  res.json({ message: "Welcome to punto application." });
});



// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});