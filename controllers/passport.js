// load all the things we need
//var LocalStrategy    = require('passport-local').Strategy;
var EveOnlineStrategy    = require('passport-eve-oauth').Strategy;

// load up the user model
var User       = require('../models/user');
var Corporation = require('../models/corporation');
var request = require('request');
var parseString = require('xml2js').parseString;



module.exports = function(passport) {

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
   

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================


   passport.use('eveonline', new EveOnlineStrategy({
    clientID: "a6d649dbe7724629af5900aa20c186f4",
    clientSecret: "6dutMnDMCGvAAWGGbFacQ7u3pEenBDD1VZjxlI9I",
     callbackURL: "http://lan-ce.com/auth/eveonline/callback",
     userAgent: 'http://lan-ce.com/'

      //callbackURL: "http://localhost:8081/auth/eveonline/callback",
      //userAgent: 'http://localhost:8081/'
    },
      function(accessToken, refreshToken, profile, done) {

//https://api.eveonline.com/eve/CharacterInfo.xml.aspx?characterID=91948036
User.findOne({CharacterID:profile._json.CharacterID}, function(err, user) {

if (user == undefined) {
        var user = new User();    
}
        user.CharacterName = profile._json.CharacterName;
        user.CharacterID = profile._json.CharacterID;
        user.accessToken = accessToken;
request('https://api.eveonline.com/eve/CharacterInfo.xml.aspx?characterID=' + profile._json.CharacterID, function (error, response, body) {
    if (!error && response.statusCode == 200) {
parseString(body, function (err, result) {
user.CharacterRace = result.eveapi.result[0].race;
user.CharacterCorporation = result.eveapi.result[0].corporation;
user.CharacterAlliance = result.eveapi.result[0].alliance;
user.CharacterCorporationID = result.eveapi.result[0].corporationID;
user.CharacterAllianceID = result.eveapi.result[0].allianceID;
user.save();


Corporation.findOne({CorporationID:result.eveapi.result[0].corporationID}, function(err, corp) {
if (corp == undefined) {
        var corp = new Corporation();    
        corp.CorporationID=result.eveapi.result[0].corporationID;
        corp.CorporationName=result.eveapi.result[0].corporation;
        corp.save();
}
});




return done(null, user);
});
}});
 });


      }
    ));

};
