
"use strict";

var mincer = require('mincer');

var environment = new mincer.Environment();

// application assets
environment.appendPath('assets/javascripts');
environment.appendPath('assets/stylesheets');
environment.appendPath('assets/images');
environment.appendPath('assets');

// shared assets
environment.appendPath('lib/assets/javascripts');
environment.appendPath('lib/assets/stylesheets');
environment.appendPath('lib/assets/images');
environment.appendPath('lib/assets');

// third party assets
environment.appendPath('vendor/assets/javascripts');
environment.appendPath('vendor/assets/stylesheets');
environment.appendPath('vendor/assets/images');
environment.appendPath('vendor/assets');

var server = mincer.createServer(environment);
server.path = '/assets';

exports.environment = environment;
exports.server = server;