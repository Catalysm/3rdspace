var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
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
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
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

// routes
var routes = require('./routes');

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});