/*jshint node:true, laxcomma:true */
"use strict";


/**
 * Home
 */

exports.login = function(req, res) {
  res.render('home/login', { title: '3rdspace', member: req.member });
};

exports.register = function(req, res) {
  res.render('home/register', { title: '3rdspace' });
};


/*
 * Index.
 */

exports.index = function(req, res){
  if (req.member) {
    var member = req.member;
    return res.render('index', { title: '3rdspace', member: member });
  } else {
    return res.render('home/index');
  }
};