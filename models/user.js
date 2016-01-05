// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        name         : {type: String, default: "" },
        key          : {type: String, default: "" },
        characterID      : {type: String, default: "" }
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
