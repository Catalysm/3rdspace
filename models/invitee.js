/*jshint node:true, laxcomma:true */
"use strict";

var mongoose = require('mongoose');

var InviteeSchema = new mongoose.Schema({
  name: {
    first: { type: String },
    last: { type: String }
  },
  email: { type: String, unique: true, required: true }
});

var Invitee = mongoose.model('Invitee', InviteeSchema);

module.exports = mongoose.model('Invitee', InviteeSchema);