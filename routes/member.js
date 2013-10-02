/*jshint node:true, laxcomma:true */
"use strict";

/*
 * Members.
 */

var Member = require('../models/member');

//New member
exports.POSTmember = function(req, res){
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
};

//Get a single member by id
exports.GETmember = function(req, res){
  return Member.findById( req.params.id, function( err, member ) {
    if( !err ) {
      return res.render('showMember', { title: '3rdspace', member: member });
    } else {
      return console.log( err );
    }
  });
};

//Get a list of all members
exports.GETmembers = function(req, res){
  return Member.find( function( err, members ) {
    if( !err ) {
      return res.render('showMembers', { title: '3rdspace', members: members });
    } else {
      return console.log( err );
    }
  });
};