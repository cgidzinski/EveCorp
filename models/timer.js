// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model

var timerSchema = mongoose.Schema({

        Location          : {type: String, default: "" },
        EveTime          : {type: Date, default: "" },
        Comment        : {type: String, default: "" },
        Author        : {type: String, default: "" }
});
// create the model for users and expose it to our app
module.exports = mongoose.model('Timer', timerSchema);
