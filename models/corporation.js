// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var corporationSchema = mongoose.Schema({

        CorporationName           : {type: String, default: "" },
        CorporationID             : {type: String, default: "" },
        Pings           		  : [],
        Announcements             : [],
        Wikis           		  : [],
        Timers           		  : [],
        Doctrines          		  : []
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Corporation', corporationSchema);
