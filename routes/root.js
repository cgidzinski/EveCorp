var User = require('../models/user');

module.exports = function(app, passport, io) {

    // =============================================================================
    // ROOT ========================================================================
    // =============================================================================
    app.get('/', function(req, res) {
          res.render('index.ejs');
    });
    app.get('/login', function(req, res) {
          res.render('login.ejs');
    });
    app.get('/signup', function(req, res) {
          res.render('signup.ejs');
    });
    app.get('/pass', function(req, res) {
          res.render('pass.ejs');
    });
    app.get('/fail', function(req, res) {
          res.render('fail.ejs');
    });

    app.get('/auth/eveonline',passport.authenticate('eveonline'));

app.get('/auth/eveonline/callback',passport.authenticate('eveonline', {
    successRedirect: '/pass',
    failureRedirect: '/fail'
  })
);

app.get('*', function(req, res){
   res.send('ayyy bb, u seem lost', 404);
 });          
}