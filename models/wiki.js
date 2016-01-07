// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model

var wikiSchema = mongoose.Schema({

        Title           : {type: String, default: "" },
        Author          : {type: String, default: "" },
        Body            : {type: String, default: "" },
        Time            :{ type: Date, default: Date.now }
});
// create the model for users and expose it to our app
module.exports = mongoose.model('Wiki', wikiSchema);
