/*jshint node:true, laxcomma:true */
"use strict";

var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  description: { type: String },
  date: { type: Date, default: Date.now },
  creator: { type: String },
  subject: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('Event', EventSchema);