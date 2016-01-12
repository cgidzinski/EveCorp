// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var corporationSchema = mongoose.Schema({

        CorporationName           : String,
        CorporationID             : String,
        Pings           		  : [],
        Announcements             : [],
        Wikis           		  : [],
        Timers           		  : [],
        Forum           		  : [],
        Doctrines          		  : []
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Corporation', corporationSchema);
