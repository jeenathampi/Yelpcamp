var express = require("express");
var router = express.Router();
var moment = require("moment");
var datetime = require("date-time-string");
var Campground = require("../models/campground");
var middleware = require("../middleware");
var Comment = require("../models/comment");

router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            req.flash("error","Campground not found");
            res.redirect("back");
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});    
        }
    })
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var campname = req.body.campname;
    var campimage = req.body.campimage;
    var campdesc = req.body.campdesc;
    var campprice = req.body.campprice;
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    var newCampground = {name:campname,image:campimage,description:campdesc,price:campprice,author:author};
    Campground.create(newCampground,function(err,newone){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate({path:"comments",options:{sort: {updatedAt: -1}}}).exec(function(err,campground){
        if(err || !campground){
            req.flash("error","Campground not found");
            res.redirect("back");
            console.log(err);
        } else{
            res.render("campgrounds/show",{moreInfo:campground,moment:moment});
        }
    })
    
});

router.get("/:id/edit",middleware.authCheck,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else{
            console.log(campground);
            res.render("campgrounds/edit",{campground:campground});
        }
    });
});

router.put("/:id",middleware.authCheck,function(req,res){
    var campname = req.body.campname;
    var campimage = req.body.campimage;
    var campdesc = req.body.campdesc;
    var newCampground = {name:campname,image:campimage,description:campdesc};
    Campground.findByIdAndUpdate(req.params.id,newCampground,function(err,campground){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:id",middleware.authCheck,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;