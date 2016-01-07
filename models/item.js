// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model

var itemSchema = mongoose.Schema({

        ID           : {type: String, default: "" },
        Name          : {type: String, default: "" }
});
// create the model for users and expose it to our app
module.exports = mongoose.model('Item', itemSchema);
