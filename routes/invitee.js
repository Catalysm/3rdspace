/*jshint node:true, laxcomma:true */
"use strict";

/*
 * Invitees.
 */

var Invitee = require('../models/invitee');

//Post new invitee
exports.POSTinvitee = function(req, res){
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
      console.log('Invitee: ' + person.email + " created.");
      res.render('home/inviteRequested', { person: person } );
    }
  });
};

//Get a single invitee by id
exports.GETinvitee = function(req, res){
  return Invitee.findById( req.params.id, function( err, invitee ) {
    if( !err ) {
      return res.render('showInvitee', { title: 'Invitee', invitee: invitee });
    } else {
      return console.log( err );
    }
  });
};

//Get a list of all invitees
exports.GETinvitees = function(req, res){
  return Invitee.find( function( err, invitees ) {
    if( !err ) {
      return res.render('showInvitees', { title: 'Invitees', invitees: invitees });
    } else {
      return console.log( err );
    }
  });
};