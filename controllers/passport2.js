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
var localcallback ="http://localhost:8081/auth/eveonline/callback"
var localagent='http://localhost:8081/'
var localid="a6d649dbe7724629af5900aa20c186f4"
var localsecret="6dutMnDMCGvAAWGGbFacQ7u3pEenBDD1VZjxlI9I"

var remotecallback="http://lan-ce:8081/auth/eveonline/callback"
var remoteagent='http://lan-ce.com:8081/'
var remoteid="507736f9caf04913ba84ac432a350a82"
var remotesecret="eB7u3befgw1nrQGe7GACNvcT9D7aKCDtgExCFZCy"
if (false)
{
ENVid=localid;
ENVsecret=localsecret;
ENVcallback=localcallback;
ENVagent=localagent;
}
else
{
ENVid=remoteid;
ENVsecret=remotesecret;
ENVcallback=remotecallback;
ENVagent=remoteagent;
}
   passport.use('eveonline', new EveOnlineStrategy({
    clientID: ENVid,
    clientSecret: ENVsecret,
      callbackURL: ENVcallback,
      userAgent: ENVagent
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
