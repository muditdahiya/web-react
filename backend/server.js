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

// ========================================================= END OF IMPORT =========================================================

// port
var port = process.env.PORT || 4000;

const app = express();

// ========================================================= START OF MIDDLEWARE =========================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cors());
// ========================================================= END OF MIDDLEWARE =========================================================

// ========================================================= START OF ROUTES =========================================================
app.get("/api/posts", (req, res) => {
  Post.find((err, posts) => {
    if (err) res.send(err);
    res.json(posts);
  });
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

// ======================================================== END OF ROUTES =========================================================

if (connectDB()) {
  app.listen(port, () => {
    console.log("====================================");
    console.log(`Server has started on port ${port}`);
    console.log("====================================");
  });
}
