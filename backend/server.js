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
const User = require("./models/user");

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
      content: req.body.content,
    });
    await newPost.save();
    res.send("Post has been added successfully");
  });
});

// get single post
app.get("/api/posts/post/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err) res.status(404).send("Sorry, cant find that");
    res.json(post);
  });
});

// update post
app.put("/api/update-post/:id", (req, res) => {
  const updateObject = req.body;
  Post.findByIdAndUpdate(
    req.params.id,
    updateObject,
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("Updated Docs : ", docs);
        res.send(docs);
      }
    }
  );
});

// delete post
app.delete("/api/delete-post/:id", (req, res) => {});

// users
// create user

app.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    await User.create(data);
    res.send({ status: "User created" });
  } catch (error) {
    res.send({ status: "Error in creating user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if ((user = "")) {
    res.json({ error: "User not Found" });
  } else if (user != "") {
    return res.json({ status: "./" });
  } else {
    return res.json({
      status: "error",
      error: "Invalid Password,Please Try again!",
    });
  }
});

// get user
app.get("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).exec();
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "No such user exists" });
  }
});

// update user
app.put("/api/update-user/:id", (req, res) => {
  const updateObject = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    updateObject,
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("Updated Docs : ", docs);
        res.send(docs);
      }
    }
  );
});

// delete user
app.delete("/api/delete-user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).exec();
  if (user) {
    await User.deleteOne({ _id: id }).exec();
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "No such user exists" });
  }
});


app.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    await User.create(data);
    res.send({ status: "User created" });
  } catch (error) {
    res.send({ status: "Error in creating user" });
  }
});

app.post("/login",async(req,res)=>{
  const {email,password} =req.body;
  const user=await User.findOne({email});
  if(user =""){
    res.json({error:"User not Found"});
  }else if(user!=""){
    return res.json({status:'./'});
  }
  else{
    return res.json({status:"error",error:"Invalid Password,Please Try again!"});
  }
})
// ========================================================= END OF ROUTES =========================================================

if (connectDB()) {
  app.listen(port, () => {
    console.log("====================================");
    console.log(`Server has started on port ${port}`);
    console.log("====================================");
  });
}
