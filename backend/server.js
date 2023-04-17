const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./config/database");
const Post = require("./models/post");
const User = require("./models/user");
const Contact = require("./models/contact");
const Favourites = require("./models/favourites");

// ========================================================= END OF IMPORT =========================================================

// port
var port = process.env.PORT || 4000;

const app = express();

// ========================================================= START OF MIDDLEWARE =========================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    // origin: "*",
    // origin: "http://muditdahiya.com",
    // origin: "http://localhost:3000",
    // credentials: true,
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
    let tags = req.body.tags.split(" ");

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
      tags: tags,
      username: req.body.username,
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
app.delete("/api/delete-post/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Post.findOne({ _id: id }).exec();
  if (user) {
    await Post.deleteOne({ _id: id }).exec();
    res.status(200).json({ message: "Article deleted" });
  } else {
    res.status(404).json({ message: "Article doesnt exist" });
    console.log("Test");
  }
});

// add favourite
app.post("/api/add-fav/:id", function (req, res) {
  Post.findOne({ _id: req.params.id }, async (err, post) => {
    if (err) res.send(err);
    if (post) {
      const newFav = new Favourites({
        username: req.body.username,
        postID: req.params.id,
      });
      await newFav.save();
      const fav = await Favourites.findOne({
        username: req.body.username,
        postID: req.params.id,
      }).exec();
      if (fav) {
        res.send(fav);
      } else {
        res.send("Failed to add to favorites");
      }
    }
  });
});

// get all user's favorites
app.get("/api/favs/:username", async function (req, res) {
  const favs = await Favourites.find({ username: req.params.username }).exec();
  if (favs) {
    let favArray = [];
    for (let fav of favs) {
      const temp = await Post.findOne({ _id: fav.postID }).exec();
      if (temp) {
        favArray.push(temp);
      }
    }
    res.send(favArray);
  } else {
    res.send("Failed to get favorites");
  }
});

// delete favourite
app.delete("/api/delete-fav/:username/:id", async function (req, res) {
  const { id, username } = req.params;

  const fav = await Favourites.findOne({
    postID: id,
    username: username,
  }).exec();

  if (fav) {
    await Favourites.deleteOne({ postID: id, username: username }).exec();
    res.status(200).json({ message: "Favourite deleted successfully" });
  } else {
    res.status(404).json({ message: "No such favourite exists" });
  }
});

// console.log("Mudit");

// users
// create user

app.get("/signup", (req, res) => {
  res.send("Please click on registration form");
});

app.post("/signup", async (req, res) => {
  const data = req.body;
  const email = req.body.email;
  try {
    await User.create(data);
    // Create token
    const token = jwt.sign(
      { user_id: User._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // save user token
    await res.send(token);
  } catch (err) {
    console.log(err);
  }
});

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   return res.json(user);

// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // if (!user) {
  //   return res.status(401).json({ message: "Authentication failed" });
  // }
  // if (user.password !== password) {
  //   return res.status(401).json({ message: "Authentication failed" });
  // }
  if (user) {
    if (user.email === email && user.password === password) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      await res.send(user);
    } else {
      res.send(false);
    }
  } else {
    res.status(401).json({ message: "Authentication failed!" });
    console.log("User not found");
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

app.post("/contactus", async (req, res) => {
  const data = req.body;
  try {
    await Contact.create(data);
    res.send("Query Submitted");
  } catch (error) {
    res.send({ status: "Error" });
  }
});

//API call to load about us content
app.get("/api/about", (req, res) => {
  res.json({
    title: "About Us",
    content:
      "Welcome to our book reading blog! We are a group of avid readers who love to share our thoughts and recommendations with the world.",
    content2:
      "Our goal is to create a community of book lovers who can connect and share their own reading experiences. We believe that reading is one of the most powerful ways to expand your knowledge and empathy, and we want to help people discover new books and authors that they will love.",
    content3:
      "We will be posting book reviews, recommendations, and other reading-related content on a regular basis. We also welcome guest posts from fellow readers, so if you have something to say about a book you have read feel free to post a review or for any other questions, please get in touch using our Contact us page!",
    content4: "Thanks for visiting our blog, and happy reading!",
  });
});

// ========================================================= END OF ROUTES =========================================================

if (connectDB()) {
  app.listen(port, () => {
    console.log("====================================");
    console.log(`Server has started on port ${port}`);
    console.log("====================================");
  });
}
