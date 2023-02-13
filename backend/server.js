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
app.post("/api/create-post", (req, res) => {});

// get single post
app.get("/api/post/:id", (req, res) => {});

// update post
app.put("/api/post/:id", (req, res) => {});

// delete post
app.post("/api/post/:id", (req, res) => {});

// users
// create user
app.post("/api/create-user", (req, res) => {});

// get user
app.get("/api/user/:id", (req, res) => {});

// update user
app.put("/api/user/:id", (req, res) => {});

// delete user
app.post("/api/user/:id", (req, res) => {});

// ========================================================= END OF ROUTES =========================================================

if (connectDB()) {
  app.listen(port, () => {
    console.log("====================================");
    console.log(`Server has started on port ${port}`);
    console.log("====================================");
  });
}
