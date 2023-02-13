const mongoose = require("mongoose");

// username is primary key
const favourites = new mongoose.Schema({
  username: String,
  postID: String,
});

module.exports = mongoose.model("Favourites", favourites);
