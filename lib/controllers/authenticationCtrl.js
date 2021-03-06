/**
 * Created by haches on 7/10/14.
 *
 * Controller that handles the authentication,
 * in particualr login and logout.
 *
 */

var passport = require('passport'),
  db = require('../models'),
  logSrv = require('../services/logSrv.js'),
  mailSrv = require('../services/mailSrv.js'),
  coboUtil = require('../util.js');



var login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

    if (err) {
      return next(err);
    }

    if (!user) {
      logSrv.addPageLog(logSrv.events.failedSigninEvent(req));
      return res.status(401).json({message: 'Wrong username or password.', authenticated: false});
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      logSrv.addPageLog(logSrv.events.signinEvent(req, user.username));

      return res.status(200).json({username: user.username, authenticated: true});
    });
  })(req, res, next);
};


var logout = function(req, res) {
  logSrv.addPageLog(logSrv.events.signoutEvent(req));
  req.logout();
  res.sendStatus(200);
};


var isAuthenticated = function(req, res) {
  if(req.isAuthenticated())
    res.status(200).json({username: req.user.username});
  else
    res.status(401).json({message: 'The user is not authenticated.'});
};


var resetPassword = function (req, res) {
  var _email = req.body.email;

  db.User
    .findOne({
      where: {email: _email},
      attributes: ['id', 'username', 'email']
    })
    .then(function(usr) {

      if(usr == null) {
        // no user with the given email found
        res.status(403).json({msg: 'The provided email is not registered.'});
      }

      // get a random password
      var _newPassword = coboUtil.getRandomPassword();

      // password was correct, thus set the new password
      usr.password = _newPassword;
      usr.save()
        .then(function () {
          return mailSrv.sendResetPasswordMail(usr.email, _newPassword);
        })
        .then(function (successValues) {
          // successValues is a complex object with data about the the email send
          // at the moment we don't do anything with it

          res.status(200).json({msg: 'Password has been changed.'});
        })
        .catch(function(err) {
          console.log("Server.AuthCtrl - Error sending email to reset password: " + JSON.stringify(err));
          res.status(500).json({msg: 'Error sending email to reset password'});
        });
    });
};

exports.login = login;
exports.logout = logout;
exports.isAuthenticated = isAuthenticated;
exports.resetPassword = resetPassword;
