var mongoose = require("mongoose");
const dbURL = require("../environment").dbUrl;

var connection = global.connection;

if (!connection) {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useFindAndModify: false
  });
  connection = mongoose.connection;
  global.connection = connection;
  connection.on("error", console.error.bind(console, "connection error:"));
  connection.on("connected", function() {
    console.log(`default connection is open to ${dbURL}`);
  });
  connection.on("reconnected", function() {
    console.log(`default connection is reconnected to ${dbURL}`);
  });

  connection.on("error", function(err) {
    console.log("default connection has occured " + err + " error");
  });

  connection.on("disconnected", function() {
    connection.removeAllListeners();
    console.log("default connection is disconnected");
  });
}
