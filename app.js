/*jshint node:true, laxcomma:true */
"use strict";

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , Member = require('./models/member')
  , assets = require('./config/assets');

var app = express();

// environments
app.configure(function(){
  app.set('port', process.env.PORT || 3800);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('assets', assets);
  app.use(express.compress());
  app.use(assets.server.path, assets.server);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use( express.cookieParser() );
  app.use(express.session({ secret: 'today is the tomorrow' }));
  // Remember Me middleware-
  app.use( function (req, res, next) {
    if ( req.method == 'POST' && req.url == '/login' ) {
      if ( req.body.rememberme ) {
        req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
      } else {
        req.session.cookie.expires = false;
      }
    }
    next();
  });
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions.
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// mongoose connect
mongoose.connect( 'mongodb://localhost/3rdspacepre' );

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// authentication

// Passport session setup.
passport.serializeUser(function(member, done) {
  var createAccessToken = function () {
    var token = member.generateRandomToken();
    Member.findOne( { accessToken: token }, function (err, existingMember) {
      if (err) { return done( err ); }
      if (existingMember) {
        createAccessToken();
      } else {
        member.set('accessToken', token);
        member.save( function (err) {
          if (err) return done(err);
          return done(null, member.get('accessToken'));
        });
      }
    });
  };

  if ( member._id ) {
    createAccessToken();
  }
});

passport.deserializeUser(function(token, done) {
  Member.findOne( {accessToken: token } , function (err, member) {
    done(err, member);
  });
});

// routes
var routes = require('./routes')
  , user = require('./routes/user');

// new member
app.post('/members', function(req, res){
  var person = new Member({ 
    name: {
      first: req.body.first_name,
      last: req.body.last_name,
    },
    email: req.body.email,
    password: req.body.password,
  });
  person.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Member: ' + person.email + " created.");
      res.redirect('/login');
    }
  });
});

var Invitee = require('./models/invitee');

// new invite
app.post('/invitees', function(req, res){
  var person = new Invitee({ 
    name: {
      first: req.body.first_name,
      last: req.body.last_name,
    },
    email: req.body.email
  });
  person.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Member: ' + person.email + " created.");
      res.render('home/inviteRequested', { person: person } );
    }
  });
});

app.get('/login', user.login);
app.get('/register', user.register);
app.get('/logout', user.logout);

app.get('/', routes.index);

// login
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, member) {
    if (err) { return next(err); }
    if (!member) {
      return res.redirect('/');
    }
    req.logIn(member, function(err) {
      if (err) { return next(err); }
      return res.redirect('/members/' + req.member.id);
    });
  })(req, res, next);
});

//Get a single member by id
app.get( '/members/:id', function( req, res ) {
  return Member.findById( req.params.id, function( err, member ) {
    if( !err ) {
      return res.render('showMember', { title: '3rdspace', member: member });
    } else {
      return console.log( err );
    }
  });
});

//Get a list of all members
app.get( '/members', function( req, res ) {
  return Member.find( function( err, members ) {
    if( !err ) {
      return res.render('showMembers', { title: '3rdspace', members: members });
    } else {
      return console.log( err );
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Simple route middleware to ensure member is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}