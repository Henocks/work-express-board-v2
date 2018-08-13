const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("./config/passport");
const dbconn = require("./config/dbconn");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret"}));

app.use(passport.initialize());
app.use(passport.session());

// DB setting
dbconn.init(mongoose);
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
});
db.on("error", (err) => {
  console.log("DB ERROR : ", err);
});

app.use((req,res,next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

app.listen(3000, function(){
  console.log("server on!");
});
