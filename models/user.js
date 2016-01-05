// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

        CharacterName         : {type: String, default: "" },
        CharacterID         : {type: Number, default: "" }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
