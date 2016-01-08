var User = require('../models/user');
var Corporation = require('../models/corporation');
var Announcement = require('../models/announcement');
var Doctrine = require('../models/doctrine');
var Ping = require('../models/ping');
var Wiki = require('../models/wiki');
var Item = require('../models/item');


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = function(app, passport) {

    // =============================================================================
    // ROOT ========================================================================
    // =============================================================================


    app.get('/', function(req, res) {
      if (req.isAuthenticated() == false) {
          res.render('index.ejs');
      } else {
        res.redirect('/dashboard');
      }
    });


                      app.get('/dashboard',isLoggedIn, function(req, res) {
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {

     var done = false;
var array=[];

var csv = require("fast-csv");
 
const fs = require('fs');
if (done == false)
{
 var stream = fs.createReadStream("./public/typeids.csv");
csv
 .fromStream(stream, {ignoreEmpty: true})
 .on("data", function(data){
     array.push(data[1].trim() +" ("+data[0]+")");
 })
 .on("end", function(){
     console.log("Loaded Search");
     done = true;
 })
  .on("error", function(data){
     console.log(data);
 });
}

Item.find({}, function(err, items) {
            res.render('dashboard.ejs', {
                user: req.user,
                items:items,
                corp: corp,
                data: array
            });
          });
        })
    });
                    app.get('/wiki',isLoggedIn, function(req, res) {
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
            res.render('wiki.ejs', {
                user: req.user,
                corp: corp
            });
        })
    });


                app.get('/deletewiki/:id',isLoggedIn, function(req, res) {
                  if (req.user.CharacterRoleLevel < 4) {res.send('Permission Denied');}
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
for (var i = corp.Wikis.length - 1; i >= 0; i--) {
  if (corp.Wikis[i]._id == req.params.id)
  {
corp.Wikis.splice(i, 1);
corp.save();
}
}
      res.redirect('/wiki');
        })
    });

            app.get('/timers',isLoggedIn, function(req, res) {
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
            res.render('timers.ejs', {
                user: req.user,
                corp: corp
            });
        })
    });




                app.get('/deletetimer/:id',isLoggedIn, function(req, res) {
                  if (req.user.CharacterRoleLevel < 4) {res.send('Permission Denied');}
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
for (var i = corp.Timers.length - 1; i >= 0; i--) {
  if (corp.Timers[i]._id == req.params.id)
  {
corp.Timers.splice(i, 1);
corp.save();
}
}
      res.redirect('/timers');
        })
    });


                        app.get('/comms',isLoggedIn, function(req, res) {
      res.render('comms.ejs', {
         user: req.user
       });
    });

                app.get('/pings',isLoggedIn, function(req, res) {
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
            res.render('pings.ejs', {
                user: req.user,
                corp: corp
            });
        })
    });

                app.get('/deleteping/:id',isLoggedIn, function(req, res) {
                  if (req.user.CharacterRoleLevel < 4) {res.send('Permission Denied');}
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
for (var i = corp.Pings.length - 1; i >= 0; i--) {
  if (corp.Pings[i]._id == req.params.id)
  {
corp.Pings.splice(i, 1);
corp.save();
}
}
            res.redirect('/pings');
        })
    });
                    app.get('/announcements',isLoggedIn, function(req, res) {
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
            res.render('announcements.ejs', {
                user: req.user,
                corp: corp
            });
        })
    });

                app.get('/deleteannouncement/:id',isLoggedIn, function(req, res) {
                  if (req.user.CharacterRoleLevel < 4) {res.send('Permission Denied');}
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
for (var i = corp.Announcements.length - 1; i >= 0; i--) {
  if (corp.Announcements[i]._id == req.params.id)
  {
corp.Announcements.splice(i, 1);
corp.save();
}
}
            res.redirect('/announcements');
        })
    });
                        app.get('/doctrines',isLoggedIn, function(req, res) {
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
            res.render('doctrines.ejs', {
                user: req.user,
                corp: corp
            });
        })
    });


                app.get('/deletedoctrine/:id',isLoggedIn, function(req, res) {
                  if (req.user.CharacterRoleLevel < 4) {res.send('Permission Denied');}
   Corporation.findOne({CorporationID:req.user.CharacterCorporationID}, function(err, corp) {
for (var i = corp.Doctrines.length - 1; i >= 0; i--) {
  if (corp.Doctrines[i]._id == req.params.id)
  {
corp.Doctrines.splice(i, 1);
corp.save();
}
}
            res.redirect('/doctrines');
        })
    });



       app.get('/administrative',isLoggedIn, function(req, res) {
        if (req.user.CharacterRoleLevel >= 4)
        {
                res.render('administrative.ejs', {
         user: req.user
       });
        }
        else
        {
        res.redirect('/dashboard');
        }
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









  app.post('/newping', isLoggedIn, function(req, res) {
    if (req.user.CharacterRoleLevel >= 4) {
var pingItem = new Ping();
          pingItem.Title = req.param('title');
          pingItem.Body = req.param('body');
          pingItem.Author = req.param('author');
  Corporation.findOne({CorporationID:req.user.CharacterCorporationID},{'Pings':1}, function(err, corp) {
corp.Pings.push(pingItem);
corp.save();
res.redirect('/pings');
       });
    } else {
      res.redirect('/');
    }
  });


  app.post('/newtimer', isLoggedIn, function(req, res) {
    if (req.user.CharacterRoleLevel >= 4) {
var timerItem = new Timer();
          timerItem.Location = req.param('location');
          timerItem.EveTime = req.param('evetime');
          timerItem.Comment = req.param('comment');
          timerItem.Author = req.param('author');
  Corporation.findOne({CorporationID:req.user.CharacterCorporationID},{'Timers':1}, function(err, corp) {
corp.Timers.push(timerItem);
corp.save();
res.redirect('/timers');
       });
    } else {
      res.redirect('/');
    }
  });

  app.post('/newannouncement', isLoggedIn, function(req, res) {
    if (req.user.CharacterRoleLevel >= 4) {
var announcementItem = new Announcement();
          announcementItem.Title = req.param('title');
          announcementItem.Body = req.param('body');
          announcementItem.Author = req.param('author');
  Corporation.findOne({CorporationID:req.user.CharacterCorporationID},{'Announcements':1}, function(err, corp) {
corp.Announcements.push(announcementItem);
corp.save();
res.redirect('/announcements');
       });
    } else {
      res.redirect('/');
    }
  });


  app.post('/newwiki', isLoggedIn, function(req, res) {
    if (req.user.CharacterRoleLevel >= 4) {
var wikiItem = new Wiki();
          wikiItem.Title = req.param('title');
          wikiItem.Body = req.param('body');
          wikiItem.Author = req.param('author');
  Corporation.findOne({CorporationID:req.user.CharacterCorporationID},{'Wikis':1}, function(err, corp) {
corp.Wikis.push(wikiItem);
corp.save();
res.redirect('/wiki');
       });
    } else {
      res.redirect('/');
    }
  });

  app.post('/newdoctrine', isLoggedIn, function(req, res) {
    if (req.user.CharacterRoleLevel >= 4) {
var doctrineItem = new Doctrine();
          doctrineItem.Title = req.param('title');
          doctrineItem.About = req.param('about');
          doctrineItem.Body = req.param('body');
          doctrineItem.ShipID = req.param('shipid');
  Corporation.findOne({CorporationID:req.user.CharacterCorporationID},{'Doctrines':1}, function(err, corp) {
corp.Doctrines.push(doctrineItem);
corp.save();
res.redirect('/doctrines');
       });
    } else {
      res.redirect('/');
    }
  });


//
app.get('*', function(req, res){
   res.send("...Jita's that way", 404);
 });          
}