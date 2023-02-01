const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const uuid = require("uuid");

// ========================================================= END OF IMPORT =========================================================

// port
var port = process.env.PORT || 4000;
dotenv.config();

const app = express();

// ========================================================= START OF MIDDLEWARE =========================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ========================================================= END OF MIDDLEWARE =========================================================

// ========================================================= START OF ROUTES =========================================================

// ========================================================= END OF ROUTES =========================================================

app.listen(port, () => {
  console.log("====================================");
  console.log(`Server has started on port ${port}`);
  console.log("====================================");
});
