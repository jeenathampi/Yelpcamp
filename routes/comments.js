var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err || !campground){
            req.flash("error","Campground not found");
            res.redirect("back");
        } else{
            res.render("comments/new",{campground:campground});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err || !campground){
            req.flash("error","Campground not found");
            res.redirect("back");
            console.log(err);
        } else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground.id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit",middleware.commentAuthCheck,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err || !campground){
            req.flash("error","Campground not found");
            res.redirect("back");
            console.log(err);
        } else{
            Comment.findById(req.params.comment_id,function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    res.render("comments/edit",{campground:campground, comment:comment})
                }
            });
        }
    });
});

router.put("/:comment_id",middleware.commentAuthCheck,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err || !campground){
            req.flash("error","Campground not found");
            res.redirect("back");
            console.log(err);
        } else{
            Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
                if(err){
                   console.log(err);
               } else{
                  res.redirect("/campgrounds/"+req.params.id);
               }
           });
        }
    });
});

router.delete("/:comment_id",middleware.commentAuthCheck,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err || !campground){
            req.flash("error","Campground not found");
            res.redirect("back");
            console.log(err);
        } else{
            Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
                if(err){
                       console.log(err);
                  } else{
                       res.redirect("/campgrounds/"+req.params.id);
                  }
              });
        }   
    });
});

module.exports = router;