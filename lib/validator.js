'use strict';

const {body, validationResult} = require('express-validator');

const checkError = function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({msg: errors.array().map(function (e) {return e.msg;}).join(' ')});
  }
  else {
    next();
  }
};

const checkEmail = [
  body('email', 'Email may not be empty.').not().isEmpty(),
  body('email', 'Invalid email. Provide a valid email address.').isEmail(),
  checkError,
];

const checkUser = [
  // Note: because Sequelize DB-Model validation would not work for the "password" because it uses a custom "setter" function in the Model,
  // we've decided to manually validate the payload of the request.
  // See also:  https://github.com/sequelize/sequelize/issues/2367
  body('username', 'Invalid username. A username must have between 2 and 30 characters.').isLength({min:2, max:30}),
  body('username', 'Invalid username. A username must be alphanumeric.').isAlphanumeric(),
  body('password', 'Invalid password. A password must be at least 4 characters long.').isLength({min: 4}),
  body('email', 'Invalid email. Please provide a valid email address.').isEmail(),
  checkError,
];

const checkPassword = [
  body('currentPassword', 'Current password may not be empty.').not().isEmpty(),
  body('newPassword', 'New password must have at least 4 characters.').not().isEmpty().isLength({min: 4}),
  checkError,
];

const checkProject = [
  body('projectname', 'The projectname may not be empty.').not().isEmpty(),
  body('language', 'The project language may not be empty.').not().isEmpty(),
  body('isPrivate', 'The private value must be true or false.').not().isEmpty(),
  body('ownerSet', 'The set of owners may not be empty.').not().isEmpty(),
  checkError,
];

exports.checkEmail = checkEmail;
exports.checkUser = checkUser;
exports.checkPassword = checkPassword;
exports.checkProject = checkProject;
