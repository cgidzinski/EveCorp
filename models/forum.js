// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model

var commentSchema = new mongoose.Schema({
    Title     : {type: String, default: "" },
    Author    : {type: String, default: "" },
    Body      : {type: String, default: "" },
    Catagory  : {type: String, default: "" },
    Time      : { type: Date, default: Date.now }
});

var forumSchema = mongoose.Schema({

        Title           : {type: String, default: "" },
        Author          : {type: String, default: "" },
        Body            : {type: String, default: "" },
        Catagory        : {type: String, default: "" },
        Answers         :[commentSchema],
        Answered        : {type: Boolean, default: false },
        Time            :{ type: Date, default: Date.now }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Forum', forumSchema);
module.exports = mongoose.model('Comment', commentSchema);
