var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var moment = require("moment");
var datetime = require("date-time-string");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User = require("./models/user");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");


mongoose.connect(process.env.DBURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+ "/public"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride('_method'));
app.use(flash());


app.set("view engine","ejs");


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comment",commentRoutes);

app.listen("2700",function(){
    console.log("Yelpcamp server has started!!!");
});