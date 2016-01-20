var async = require('async');
var User = require('../models/user');
var Corporation = require('../models/corporation');
var Announcement = require('../models/announcement');
var Doctrine = require('../models/doctrine');
var Ping = require('../models/ping');
var Wiki = require('../models/wiki');
var Timer = require('../models/timer');
var Forum = require('../models/forum');


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = function(app, passport) {

    // =============================================================================
    // ROOT ========================================================================
    // =============================================================================

 
app.get('*', function(req, res){
   res.send("...Jita's that way", 404);
 });          
}