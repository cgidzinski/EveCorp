// load all the things we need
//var LocalStrategy    = require('passport-local').Strategy;
var EveOnlineStrategy    = require('passport-eveonline').Strategy;

// load up the user model
var User       = require('../models/user');


module.exports = function(passport) {


   

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================


   passport.use('eveonline', new EveOnlineStrategy({
    clientID: "a6d649dbe7724629af5900aa20c186f4",
    clientSecret: "6dutMnDMCGvAAWGGbFacQ7u3pEenBDD1VZjxlI9I",
     callbackURL: "http://localhost:8081/auth/eveonline/callback",
     authorizationURL: 'https://login.eveonline.com/oauth/authorize',
    tokenURL: 'https://login.eveonline.com/oauth/token',
    verifyURL: 'https://login.eveonline.com/oauth/verify'
  },
  function(characterInformation, done) {

    User.findOrCreate(
      { characterID: characterInformation.characterID },
      function (err, user) {
        return done(err, user);
      }
    );

    
  }
));

};
