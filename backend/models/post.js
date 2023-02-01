const mongoose = require("mongoose");

const post = new mongoose.Schema({
  title: String,
});

module.exports = mongoose.model("Post", post);
