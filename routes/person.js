/*jshint node:true, laxcomma:true */
"use strict";

/*
 * Members.
 */

var Person = require('../models/person')
var Event = require('../models/event');

//New member
exports.register = function(req, res){
  var person = new Person({ 
    name: {
      first: req.body.first_name,
      last: req.body.last_name,
    },
    email_address: req.body.email,
    admin: req.body.admin,
    created: new Date(),
    creator: req.body.creator
  });
  person.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      var moment = new Event({
        description: req.body.description,
        date: new Date(),
        creator: req.body.creator,
        subject: person.id
      });
      moment.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('An event was added to the timeline.');
          res.redirect('/people/' + person.id);
        }
      });
    }
  });
};

//New member
exports.note = function(req, res){
  return Person.findById( req.params.id, function( err, person ) { 
    person.notes.push({
      content: req.body.content,
      created_at: new Date(),
      creator: req.body.creator
    });
    person.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      var moment = new Event({
        description: " added a note.",
        date: new Date(),
        creator: req.body.creator,
        subject: person.id
      });
      moment.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('An event was added to the timeline.');
          res.redirect('/people/' + person.id);
        }
      });
    }
  });
  });
};

//Get a single member by id
exports.person = function(req, res){
  return Event.find( function( err, timeline ) {
    return Person.find( function( err, people ) {
      return Person.findById( req.params.id, function( err, person ) {
        if( !err ) {
        //  return res.send( person, people );
          return res.render('showPerson', { title: '3rdspace', person: person, notes: person.notes, people: people, timeline: timeline });
        } else {
          return console.log( err );
        }
      });
    });
  });
};

//Get a list of all people
exports.people = function(req, res){
  return Person.find( function( err, people ) {
    if( !err ) {
      return res.render('showPeople', { title: 'People', people: people });
    } else {
      return console.log( err );
    }
  });
};

/*
//Update a member
exports.update = function(req, res){
  console.log( 'Updating "' + req.body.name.first + '"');
  return Person.findById( req.params.id, function( err, person ) {
    // update the person

    return person.save( function( err ) {
      if( !err ) {
        console.log( 'Person checked in!' );
      } else {
        console.log( err );
      }
      return res.redirect('/people/' + person.id);
    });
  });
};

*/