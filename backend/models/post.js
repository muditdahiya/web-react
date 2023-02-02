const mongoose = require("mongoose");

// postID is primary key
const post = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  username: String,
  postID: String,
  tags: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Post", post);
