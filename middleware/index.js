var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
       req.flash("error","You have not logged in");
       res.redirect("/login");
}

middlewareObj.authCheck = function(req,res,next){
    if(req.isAuthenticated()){
       Campground.findById(req.params.id,function(err,campground){
           if(err || !campground){
               req.flash("error","Campground not found");
               res.redirect("back");
               console.log(err);
           } else{
             if(campground.author.id.equals(req.user.id)){
                return next();
             }else {
                 req.flash("error","You are not authorized!!!")
                 res.redirect("back");
             }
           }
           
       })  
    } else{
        req.flash("error","You have not logged in");
        res.redirect("back");
    }
}

middlewareObj.commentAuthCheck =function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,comment){
            if(err || !comment){
                req.flash("error","Comment not found");
                res.redirect("back");
                console.log(err);
            } else{
                if(comment.author.id.equals(req.user.id)){
                    return next();
                } else{
                    req.flash("error","You are not authorized!!!")
                    res.redirect("back");
                }
            }
        })
    } else{
        res.redirect("back");
    }
}

module.exports = middlewareObj;