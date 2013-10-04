/*jshint node:true, laxcomma:true */
"use strict";

var Person = require('../models/person')
  , Event = require('../models/event');

/**
 * Home
 */

exports.login = function(req, res) {
  res.render('home/login', { title: '3rdspace', person: req.person });
};

exports.register = function(req, res) {
  return Person.find( function( err, people ) {
    if( !err ) {
      return res.render('home/register', { title: '3rdspace', people: people });
    } else {
      return console.log( err );
    }
  });
};


/*
 * Index.
 */

exports.index = function(req, res){
  return Person.find( function( err, people ) {
    if( !err ) {
      return res.render('index', { title: '3rdspace', people: people });
    } else {
      return console.log( err );
    }
  });
};

exports.timeline = function(req, res){
  return Event.find( function( err, event ) {
    if( !err ) {
      return res.send(event);
    } else {
      return console.log( err );
    }
  });
};