var express = require('express');
var router = express.Router();
var Campground = require('../models/campground'),
    Comment = require('../models/comment');
var middleware = require("../middleware");// no eed to specify file name buz its an index.js file

//INDEX route

router.get('/',function(req,res){
console.log(req.user);
Campground.find({},function(err,allcampgrounds){
  if(err)
  console.log(err);
  else{
    res.render('campgrounds/index',{campgrounds:allcampgrounds});
  }
});
//res.render('campgrounds',{campgrounds:campgrounds});
});
//CREATE a new campground
router.post('/',middleware.isLoggedIn,function(req,res){
  //getting data from form and add it to array (for now)
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id:req.user._id,
    username:req.user.username
  }
  var newCampgrounds = {name:name,image:image,description:desc,author:author};

  Campground.create(newCampgrounds,function(err,newlyCreatedCampground){
    if(err)
    console.log(err);
    else{
      console.log(newlyCreatedCampground);
      res.redirect('/campgrounds');
    }
  });
  //redirect to campgrounds page


});
//NEW
router.get('/new',middleware.isLoggedIn,function(req,res){
  res.render('campgrounds/new');
});


//SHOW - more info abt an individual camp
router.get('/:id',function(req,res){
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
     if(err)
     console.log(err);
     else{
      //  console.log(foundCampground);
       res.render('campgrounds/show',{campground:foundCampground});

     }
   });
// console.log(req.params.id);
});
//================================================================================================================================
//EDIT
router.get('/:id/edit',middleware.checkCampgroundOwnership,function(req,res){
      Campground.findById(req.params.id,function(err,foundCampground){
        res.render('campgrounds/edit',{campground:foundCampground});
      });

    });

//===================================================================================================================
//UPDATE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){

  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
    if(err){
      console.log(err);
      res.redirect('/campgrounds');
    }
    else{
      res.redirect('/campgrounds/' + req.params.id);
    }
  })
});

//DESTROY

router.delete('/:id',middleware.checkCampgroundOwnership,function(req,res){
Campground.findByIdAndRemove(req.params.id,function(err){
  if(err)
  res.redirect('/campgrounds');
  else {
    res.redirect('/campgrounds');

  }
})
});







module.exports = router;
