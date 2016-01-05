var User = require('../models/user');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = function(app, passport, io) {

    // =============================================================================
    // ROOT ========================================================================
    // =============================================================================
    app.get('/', function(req, res) {
          res.render('index.ejs');
    });

    app.get('/dashboard',isLoggedIn, function(req, res) {
      res.render('dashboard/dashboard.ejs', {
      user: req.user
    });
    });


    app.get('/login',passport.authenticate('eveonline'));

app.get('/auth/eveonline/callback',passport.authenticate('eveonline', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  })
);

 app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

app.get('*', function(req, res){
   res.send("Jita's that way", 404);
 });          
}