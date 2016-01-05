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
      if (req.isAuthenticated() == false) {
          res.render('index.ejs')
      } else {
        res.redirect('/dashboard');
      }
    });


    app.get('/dashboard',isLoggedIn, function(req, res) {
      res.render('dashboard.ejs', {
         user: req.user
       });
    });
        app.get('/wiki',isLoggedIn, function(req, res) {
      res.render('wiki.ejs', {
         user: req.user
       });
    });
            app.get('/timers',isLoggedIn, function(req, res) {
      res.render('timers.ejs', {
         user: req.user
       });
    });
                app.get('/pings',isLoggedIn, function(req, res) {
      res.render('pings.ejs', {
         user: req.user
       });
    });
                    app.get('/announcements',isLoggedIn, function(req, res) {
      res.render('announcements.ejs', {
         user: req.user
       });
    });
                        app.get('/doctrines',isLoggedIn, function(req, res) {
      res.render('doctrines.ejs', {
         user: req.user
       });
    });
       app.get('/administrative',isLoggedIn, function(req, res) {
      res.render('administrative.ejs', {
         user: req.user
       });
    });

app.get('/profile',isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
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