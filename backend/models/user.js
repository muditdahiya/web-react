const mongoose = require("mongoose");

// username is primary key
const user = new mongoose.Schema({
  // username: String,
  fname: String,
  lname: String,
  email: String,
  password: String,
},
{
  collection:"users",
}
);

module.exports = mongoose.model("users", user);
