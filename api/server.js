const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./controler/users");

const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.post("/addUserSqlite", (req, res) => {
  users.addUserSqlite(req.body.name, (err) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the punto SQLITE database.');
    }
  });
  res.json({ message: "Welcome to punto application." });
});

app.get("/addUserMysql", (req, res) => {
  users.addUserSqlite("test2", (err) => {
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