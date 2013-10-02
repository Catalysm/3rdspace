/*jshint node:true, laxcomma:true */
"use strict";


/**
 * Module dependencies.
 */


var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , passport = require('passport')
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


/**
 * Routes
 */


var routes = require('./routes')
  , invitee = require('./routes/invitee')
  , member = require('./routes/member');


//============ Home:

app.get('/login', routes.login);
app.get('/register', routes.register);


//============ Index:

app.get('/', routes.index);


//============ Invitees:

// new invite
app.post('/invitees', invitee.POSTinvitee);

//Get a single invitee by id
app.get( '/invitees/:id', invitee.GETinvitee);

//Get a list of all invitees
app.get( '/invitees', invitee.GETinvitees);


//============ Members:

//Post a new member
app.post('/members', member.POSTmember);

//Get a single member by id
app.get( '/members/:id', member.GETmember);

//Get a list of all members
app.get( '/members', member.GETmembers);


// * * * //
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});