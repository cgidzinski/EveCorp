// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

        CharacterName           : {type: String, default: "" },
        CharacterRace           : {type: String, default: "" },
        CharacterRole           : {type: String, default: "Director" },
        CharacterRoleLevel      : {type: Number, default:  5 },
        CharacterCorporationID  : {type: String, default: "" },
        CharacterCorporation    : {type: String, default: "" },
        CharacterAllianceID     : {type: String, default: "" },
        CharacterAlliance       : {type: String, default: "" },
        CharacterID             : {type: Number, default: "" },
        Points                  : {type: Number, default: "" },
        accessToken             : {type: String, default: "" }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
