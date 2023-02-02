const mongoose = require("mongoose");

// username is primary key
const user = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  country: String,
});

module.exports = mongoose.model("User", user);
