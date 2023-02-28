const mongoose = require("mongoose");

const DB_NAME = "Hospital_API_Covid_19";

const connectionString =
  "mongodb://127.0.0.1:27017/" +
  DB_NAME;
// mongodb+srv://msahilranjan:mHABrjC9AQe09rRt@cluster0.mgh2yf6.mongodb.net/"

//connect to the database
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//acquire the connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

// once the connection is established
db.once("open", function () {
  console.log("Connected to Database :: MongoDB - " + DB_NAME);
});

module.exports = db;
