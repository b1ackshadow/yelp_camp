var Campground = require("../models/campground"),
  Comment = require("../models/comment");
var middlewareObj = {};
middlewareObj.checkCampgroundOwnership =
function(req,res,next)
{
      if(req.isAuthenticated())
        {
              //does the user own the campground?

              Campground.findById(req.params.id,function(err,foundCampground)
              {
                      if(err)
                            {
                            req.flash("error"," Campground not found ");
                            res.redirect("back");
                            }
                              else{
                                if(foundCampground.author.id.equals(req.user._id))
                                  {
                                    next();
                                  }

                                else {
                                      req.flash("error","You don't have permission to do that");
                                      res.redirect("back");
                                    }
                            }

              });
        }
                  else{
                    req.flash("error","You have to be logged in to perform the operation");
                    res.redirect("back");
                  }


}

middlewareObj.checkCommentOwnership = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //does the user own the campground?

        Comment.findById(req.params.comment_id,function(err,foundComment){
              if(err){
                console.log(err);
                res.redirect("back");
                    }

                else{
                            if(foundComment.author.id.equals(req.user._id))
                            {
                                next();
                              }

                        else {
                          req.flash("error","You don't have permission to do that");
                          res.redirect("back");
                              }
                    }
        });
      }
          else{
            req.flash("error","You have to be logged in to perform the operation");

            res.redirect("back");
              }


}
middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else {
    req.flash("error","You have to be logged in to perform the operation");
    res.redirect('/login');
      }
}

module.exports = middlewareObj
