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
mongoose.connect( 'mongodb://localhost/3rdspace' );

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
  , person = require('./routes/person');


//============ Home:

app.get('/login', routes.login);
app.get('/register', routes.register);


//============ Index:

app.get('/', routes.index);
app.get('/timeline', routes.timeline);


//============ People:

//Post a new person
app.post('/people', person.register);

//Get a single person by id
app.get( '/people/:id', person.person);

app.post( '/people/:id/notes', person.note);

//Get a list of all people
app.get( '/people', person.people);

/*
//Put a new person
app.put('/people/:id', person.person);
*/

// * * * //
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});