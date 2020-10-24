'use strict';

class ErrorWithStatus extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
};

module.exports.ErrorWithStatus = ErrorWithStatus;
