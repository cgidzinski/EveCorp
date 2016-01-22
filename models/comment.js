// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var commentSchema = mongoose.Schema({    
   							        Title           : {type: String, default: "" },
							        Author          : {type: String, default: "" },
							        Body            : {type: String, default: "" },
							        Best            : {type: Boolean, default: false },
});
module.exports = mongoose.model('Comment', commentSchema);
