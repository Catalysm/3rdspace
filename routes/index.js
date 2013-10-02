
/*
 * GET home page.
 */

var Member = require('../models/member');

exports.index = function(req, res, next){
  if (req.member) {
    var member = req.member;

    Member.find({ members: { $in: [ member ] } }).populate('members', { id: true, name: true, email: true }).exec(function(err) {
      if (err) {
        return next(err);
      }

      return res.render('index', { title: '3rdspace', member: member });
    });
  } else {
    return res.render('home/index');
  }
};