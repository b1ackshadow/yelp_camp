var mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment');

var data = [{
  name:'camp1',
  image:'/assets/trap.png',
  description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
},
{
  name:'camp2',
  image:'/assets/mountainview.png',
  description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

},
{
  name:'camp3',
  image:'/assets/trap.png',
  description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

}];

function seedDB(){

  //remove all camp
  Campground.remove({},function(err){
    if(err)
    console.log(err);
    console.log('removed');

    data.forEach(function(seed){
      Campground.create(seed,function(err,campground){
        if(err)
        console.log(err);
        console.log('added');

        Comment.create({
          text:'im meseeks look at me ',
          author:'meseeks'
        },function(err,comment){
          if(err)
          console.log(err);
          else{
            campground.comments.push(comment);
            campground.save();
            console.log('comment added');

          }
        })


      })
    })



  });


}




module.exports = seedDB;
