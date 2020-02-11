var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Deer Tracks",
        image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description:"Proin sit amet nibh lorem. Sed pulvinar non turpis vel maximus. Donec placerat eget dolor eget mattis. Maecenas a ante non est mattis tincidunt. Quisque vitae bibendum mi. Proin bibendum pretium metus ut cursus. Nulla elit lorem, maximus quis risus non, dignissim sagittis nisi. Praesent convallis lorem sed massa dictum vulputate. Etiam ultrices eros at metus porttitor, ut pretium ipsum commodo. Fusce ornare augue ac pellentesque iaculis. Nullam dignissim mauris et sapien tincidunt vehicula. Aliquam ultrices nulla in ante commodo fringilla. Sed at tempus quam. Aliquam ultricies euismod libero eu pretium."
    },

    {
        name:"Cully terrain",
        image:"https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description:"Proin sit amet nibh lorem. Sed pulvinar non turpis vel maximus. Donec placerat eget dolor eget mattis. Maecenas a ante non est mattis tincidunt. Quisque vitae bibendum mi. Proin bibendum pretium metus ut cursus. Nulla elit lorem, maximus quis risus non, dignissim sagittis nisi. Praesent convallis lorem sed massa dictum vulputate. Etiam ultrices eros at metus porttitor, ut pretium ipsum commodo. Fusce ornare augue ac pellentesque iaculis. Nullam dignissim mauris et sapien tincidunt vehicula. Aliquam ultrices nulla in ante commodo fringilla. Sed at tempus quam. Aliquam ultricies euismod libero eu pretium."
    },
    
    {
        name:"Ganache Mountains",
        image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description:"Proin sit amet nibh lorem. Sed pulvinar non turpis vel maximus. Donec placerat eget dolor eget mattis. Maecenas a ante non est mattis tincidunt. Quisque vitae bibendum mi. Proin bibendum pretium metus ut cursus. Nulla elit lorem, maximus quis risus non, dignissim sagittis nisi. Praesent convallis lorem sed massa dictum vulputate. Etiam ultrices eros at metus porttitor, ut pretium ipsum commodo. Fusce ornare augue ac pellentesque iaculis. Nullam dignissim mauris et sapien tincidunt vehicula. Aliquam ultrices nulla in ante commodo fringilla. Sed at tempus quam. Aliquam ultricies euismod libero eu pretium."
    }
];

function seedDB(){
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        // console.log("Removed Campgrounds");
        // data.forEach(function(camp){
        //     Campground.create(camp,function(err,campground){
        //         if(err){
        //             console.log(err);
        //         }
        //         console.log("Added a campground");
        //         Comment.create({
        //             text:"blah blah blah blah",
        //             author:"testRun"
        //         },function(err,comment){
        //             if(err){
        //                 console.log(err);
        //             } else{
        //                 campground.comments.push(comment);
        //                 campground.save();
        //                 console.log("created comment");
        //             }
        //         });
        //     });
        // });
    });
}

module.exports = seedDB;