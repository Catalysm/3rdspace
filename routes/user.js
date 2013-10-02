

exports.login = function(req, res) {
  res.render('home/login', { title: '3rdspace', member: req.member });
};

exports.register = function(req, res) {
  res.render('home/register', { title: '3rdspace' });
};


/**
 * Logout user.
 */

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
};