const express = require("express");
const app = express();

// defining PORT to run my express server
const PORT = 8040;

// requiring mongoose library to be able to perform operations on mongoDB
const db = require("./config/mongoose");

// Parse incoming request bodies in a middleware
const bodyParser = require("body-parser");

//require passport and JWT Strategy for auth
const passport = require("passport");

//use of JWT token
const passportJWT = require("./config/passport-jwt-strategy");

//parse both application/json and  raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

// initializing passport middleware
app.use(passport.initialize());

//use express router
app.use("/", require("./routes/index"));

//server running on port 8040
app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on PORT : ${PORT}..........`);
});
