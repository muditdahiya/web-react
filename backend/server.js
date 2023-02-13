const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const { connectDB } = require("./config/database");
const Post = require("./models/post");

// ========================================================= END OF IMPORT =========================================================

// port
var port = process.env.PORT || 4000;

const app = express();

// ========================================================= START OF MIDDLEWARE =========================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // location of the app we are connecting to
    credentials: true,
  })
);

// ========================================================= END OF MIDDLEWARE =========================================================

// ========================================================= START OF ROUTES =========================================================

// posts
// get all posts
app.get("/api/posts", (req, res) => {
  Post.find((err, posts) => {
    if (err) res.send(err);
    res.json(posts);
  });
});

// create post
app.post("/api/create-post", (req, res) => {
  Post.findOne({ title: req.body.title }, async (err, post) => {
    if (err) res.send(err);
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content
    });
    await newPost.save();
    res.send("Post has been added successfully");
  });
 })

// get single post
app.get("/api/posts/post/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err) res.status(404).send("Sorry, cant find that");
    res.json(post);
  });
});

// update post
app.put("/api/update-post/:id", (req, res) => {});

// delete post
app.post("/api/delete-post/:id", (req, res) => {});

// users
// create user
app.post("/api/create-user", (req, res) => {});

// get user
app.get("/api/user/:id", (req, res) => {});

// update user
app.put("/api/update-user/:id", (req, res) => {});

// delete user
app.post("/api/delete-user/:id", (req, res) => {});

// ========================================================= END OF ROUTES =========================================================

if (connectDB()) {
  app.listen(port, () => {
    console.log("====================================");
    console.log(`Server has started on port ${port}`);
    console.log("====================================");
  });
}
