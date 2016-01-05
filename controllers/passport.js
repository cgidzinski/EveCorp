// load all the things we need
//var LocalStrategy    = require('passport-local').Strategy;
var EveOnlineStrategy    = require('passport-eve-oauth').Strategy;

// load up the user model
var User       = require('../models/user');





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

     // callbackURL: "http://localhost:8081/auth/eveonline/callback",
     // userAgent: 'http://localhost:8081/'
    },
      function(accessToken, refreshToken, profile, done) {


User.findOne({CharacterID:profile._json.CharacterID}, function(err, user) {
    if (user)
    {
        console.log("found"); 
        user.accessToken = accessToken;
        user.save();
        return done(null, user);
    }
        else
     {
            console.log("Not found"); 
            var user = new User();
        user.CharacterName = profile._json.CharacterName;
        user.CharacterID = profile._json.CharacterID;
        user.accessToken = accessToken;
        user.save();
            return done(null, user);
    }
    
 });


      }
    ));

};
