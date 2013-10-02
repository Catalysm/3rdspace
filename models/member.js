/*jshint node:true, laxcomma:true */
"use strict";

var mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

// MemberSchema
var MemberSchema = new mongoose.Schema({
  name: {
    first: { type: String },
    last: { type: String }
  },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  admin: { type: Boolean },
  accessToken: { type: String } // Used for Remember Me
});

// Bcrypt middleware
MemberSchema.pre('save', function(next) {
  var member = this;

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

var Member = mongoose.model('Member', MemberSchema);

module.exports = mongoose.model('Member', MemberSchema);