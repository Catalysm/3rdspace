/*jshint node:true, laxcomma:true */
"use strict";

var mongoose = require('mongoose')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;


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
  var person = this;

  if(!person.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(person.password, salt, function(err, hash) {
      if(err) return next(err);
      person.password = hash;
      next();
    });
  });
});

// Remember Me implementation helper method
MemberSchema.methods.generateRandomToken = function () {
  var person = this,
      chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      token = new Date().getTime() + '_';
  for ( var x = 0; x < 16; x++ ) {
    var i = Math.floor( Math.random() * 62 );
    token += chars.charAt( i );
  }
  return token;
};

// Password verification
MemberSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};

var Member = mongoose.model('Member', MemberSchema);

// LocalStrategy
passport.use(new LocalStrategy(
  function(email, password, done) {
    Member.findOne({ email: email }, function (err, member) {
      if (err) { return done(err); }
      if (!member) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!member.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, member);
    });
  }
));

module.exports = mongoose.model('Member', MemberSchema);