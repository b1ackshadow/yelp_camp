var express = require('express');
var app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
Campground = require('./models/campground'),
Comment = require('./models/comment'),
passport = require('passport'),
LocalStrategy = require('passport-local'),
User = require('./models/user'),
methodOverride = require('method-override'),
flash = require('connect-flash'),
seedDB = require('./seeds');
// seedDB();

//reqruing routes

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//passport auth setup ikr annoying

app.use(require('express-session')({
  secret:"i am the one who knocks",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//database config

mongoose.connect('127.0.0.1/yelp_caamp');
mongoose.Promise = global.Promise;

app.use(flash());

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});
app.use(methodOverride("_method"));


//shortening the url for get and post

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(3000,function(){
console.log('listening to port 3000');
});
