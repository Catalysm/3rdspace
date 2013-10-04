/*jshint node:true, laxcomma:true */
"use strict";

var mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;


// Person note
var Note = new mongoose.Schema({
  content: { type: String },
  created_at: { type: Date },
  creator: { type: String }
});


// Member Schema
var PersonSchema = new mongoose.Schema({
  name: {
    first: { type: String },
    last: { type: String }
  },
  email_address: { type: String, unique: true, required: true },
  admin: { type: Boolean },
  created: { type: Date },
  creator: { type: String },
  notes: [ Note ]
});

/*
// Bcrypt middleware
MemberSchema.pre('save', function(next) {
  var member = this;

  if (this.isNew) {
    this.start_date = new Date();
  };

  if(!member.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(member.password, salt, function(err, hash) {
      if(err) return next(err);
      member.password = hash;
      next();
    });
  });
});

// Password verification
MemberSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};

*/

module.exports = mongoose.model('Person', PersonSchema);